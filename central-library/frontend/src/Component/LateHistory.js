import React, { Component } from 'react';
import UserDetailsService from '../Service/UserDetailsService';
import {FaReact, FaSearch} from 'react-icons/fa';
import Pagination from './Pagination';
import jsPDF from 'jspdf';

class LateHistory extends Component {
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
        this.applyFilter = this.applyFilter.bind(this);
        this.getPdf = this.getPdf.bind(this);
        
    }
    getPdf(){
        var doc = new jsPDF('p','pt');
        let y = 20;
        this.state.historyList.map( historyy =>{
            doc.text(20, y, `HistoryId: ${historyy.historyId}`);
            doc.text(20, y+20, `UserId : ${historyy.userId}`);
            doc.text(20, y+40, `Book Id: ${historyy.bookId}`);
            doc.text(20, y+60, `Registered Id: ${historyy.registeredId}`);
            doc.text(20, y+80, `Returned Date: ${historyy.returnedDateOfBook}`);
            doc.text(20, y+100, `Bill: ${historyy.bill}`);
            y += 140;
        })
        doc.save("download.pdf");
    }
    applyFilter(){
        var x = (document.getElementById("mon").checked);
        var y = (document.getElementById("tue").checked);
        var z = (document.getElementById("wed").checked);
        var p = (document.getElementById("thr").checked);
        var q = (document.getElementById("fri").checked);
        var r = (document.getElementById("sat").checked);
        var s = (document.getElementById("sun").checked);
        var newHistory = [];
        if(x){
            newHistory = this.state.historyList.filter(
                (historyy) => {
                    let date = historyy.returnedDateOfBook;
                    return (historyy.returnDay.toString().indexOf('1') !== -1);
                }
            );
        }
        else if(y){
            newHistory = this.state.historyList.filter(
                (historyy) => {
                    let date = historyy.returnedDateOfBook;
                    return (historyy.returnDay.toString().indexOf('2') !== -1);
                }
            );
        }
        else if(z){
            newHistory = this.state.historyList.filter(
                (historyy) => {
                    let date = historyy.returnedDateOfBook;
                    return (historyy.returnDay.toString().indexOf('3') !== -1);
                }
            );
        }
        else if(p){
            newHistory = this.state.historyList.filter(
                (historyy) => {
                    let date = historyy.returnedDateOfBook;
                    return (historyy.returnDay.toString().indexOf('4') !== -1);
                }
            );
        }
        else if(q){
            newHistory = this.state.historyList.filter(
                (historyy) => {
                    let date = historyy.returnedDateOfBook;
                    return (historyy.returnDay.toString().indexOf('5') !== -1);
                }
            );
        }
        else if(r){
            newHistory = this.state.historyList.filter(
                (historyy) => {
                    let date = historyy.returnedDateOfBook;
                    return (historyy.returnDay.toString().indexOf('6') !== -1);
                }
            );
        }
        else if(s){
            newHistory = this.state.historyList.filter(
                (historyy) => {
                    let date = historyy.returnedDateOfBook;
                    return (historyy.returnDay.toString().indexOf('0') !== -1);
                }
            );
        }else{
            UserDetailsService.getLateHistory().then((res)=>{
                this.setState({
                    historyList : res.data,
                    loading: false
                })
            });
        }
        this.setState({
            historyList : newHistory
        })
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
        UserDetailsService.getLateHistory().then((res)=>{
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
                    return (historyy.userId.toString().indexOf(this.state.search.toString()) !== -1);
                }
            );
            return (
                <div className = 'text-center'>
                    <h4 className='my-3'>Late History<input className='float-right rounded border border-primary' label= 'search' placeholder='userId' onChange={this.onChangeSearch}/><FaSearch className='float-right mx-1 text-primary'/></h4>
                    <div className='row px-2'>
                        <button className='m-2 btn-xm btn-primary' onClick={this.applyFilter}>Filter</button>
                        <h6 className='m-2'>Monday<input type="checkbox" className='mx-1' id="mon" value = {1}/></h6>
                        <h6 className='m-2'>Tuesday<input type="checkbox" className='mx-1' id="tue" value = {2}/></h6>
                        <h6 className='m-2'>Wednesday<input type="checkbox" className='mx-1' id="wed" value = {3}/></h6>
                        <h6 className='m-2'>Thursday<input type="checkbox" className='mx-1' id="thr" value = {4}/></h6>
                        <h6 className='m-2'>Friday<input type="checkbox" className='mx-1' id="fri" value = {5}/></h6>
                        <h6 className='m-2'>Saturday<input type="checkbox" className='mx-1' id="sat" value = {6}/></h6>
                        <h6 className='m-2'>Sunday<input type="checkbox" className='mx-1' id="sun" value = {0}/></h6>
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
                    <div className="row float-right m-3">
                        <button className='btn btn-primary m-1' onClick={() => this.getPdf()}>Print</button>
                    </div>
                    <div className='row'>
                        <Pagination postsPerPage ={this.state.postsPerPage} totalPosts = {this.state.historyList.length} paginate={this.paginate}/>
                    </div>
                </div>
            );
        }
    }
}

export default LateHistory;