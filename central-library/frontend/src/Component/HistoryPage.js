import React, { Component } from 'react';
import UserDetailsService from '../Service/UserDetailsService';
import {FaReact, FaSearch} from 'react-icons/fa';
import Pagination from './Pagination';

class HistoryPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            historyList: [],
            search: '',
            loading: false,
            currentPage: 1,
            postsPerPage: 10
        }
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.back = this.back.bind(this);
        this.paginate = this.paginate.bind(this);
        this.lateHistoryPage = this.lateHistoryPage.bind(this);
    }
    lateHistoryPage(){
        this.props.history.push('/lateHistory')
    }
    paginate(pageNumber){
        this.setState({
            currentPage: pageNumber
        })
    }
    back(){
        this.props.history.push("/");
    }
    onChangeSearch = event =>{
        this.setState({ search: event.target.value});
    }
    componentDidMount(){
        this.setState({
            loading: true
        })
        UserDetailsService.getHistory().then((res)=>{
            this.setState({
                historyList : res.data,
                loading: false
            })
        });
    }

    render() {
        const indexOfLastPost = (this.state.currentPage)*(this.state.postsPerPage);
        const indexOfFirstPost = (indexOfLastPost) - this.state.postsPerPage;
        var currentPosts = this.state.historyList.slice(indexOfFirstPost,indexOfLastPost);
        if(this.state.loading){
            return <h4>Loading...</h4>
        }else{
            const filteredHistory = currentPosts.filter(
                (historyy) => {
                    return (historyy.time.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) || (historyy.userId.toString().indexOf(this.state.search.toString()) !== -1);
                }
            );
            return (
                <div className = 'text-center'>
                    <h4 className='my-3'>History<input className='float-right rounded border border-primary' label= 'search' placeholder='onTime or late / userId' onChange={this.onChangeSearch}/><FaSearch className='float-right mx-1 text-primary'/></h4>
                    <div className='row my-1'>
                        <button className='btn btn-primary float-left' onClick={this.lateHistoryPage}>Late Submissions</button>
                    </div>
                    <div className = 'row'>
                        <table className = 'table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>History Id</th>
                                    <th>Registered Id</th>
                                    <th>Book Id</th>
                                    <th>User Id</th>
                                    <th>Expiry Date(Book)</th>
                                    <th>Returned Date(Book)</th>
                                    <th>Bill</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredHistory.map(
                                        historyy =>
                                        <tr key={historyy.historyId}>
                                            <td>{historyy.historyId}</td>
                                            <td>{historyy.registeredId}</td>
                                            <td>{historyy.bookId}</td>
                                            <td>{historyy.userId}</td>
                                            <td>{historyy.expiryDateOfBook}</td>
                                            <td>{historyy.returnedDateOfBook}</td>
                                            <td>{historyy.bill}</td>
                                            <td>{historyy.time}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row float-right mt-3">
                        <button className='btn btn-primary m-1' onClick={this.back}>Back</button>
                    </div>
                    <div className='row'>
                        <Pagination postsPerPage ={this.state.postsPerPage} totalPosts = {this.state.historyList.length} paginate={this.paginate}/>
                    </div>
                </div>
            );
        }
    }
}

export default HistoryPage;