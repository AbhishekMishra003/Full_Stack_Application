import React, { Component } from 'react';
import UserDetailsService from '../Service/UserDetailsService';
import {FaReact, FaSearch} from 'react-icons/fa';
import Pagination from './Pagination';

class ListUsers extends Component {
    constructor(props){
        super(props)
        this.state ={
            users: [],
            search: '',
            loading: false,
            currentPage: 1,
            postsPerPage: 10
        }
        this.addUser = this.addUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
        this.bookSection = this.bookSection.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.historyPage = this.historyPage.bind(this);
        this.paginate = this.paginate.bind(this);
    }
    paginate(pageNumber){
        this.setState({
            currentPage: pageNumber
        })
    }
    historyPage(){
        this.props.history.push('/history');
    }
    onChangeSearch = event =>{
        this.setState({ search: event.target.value});
    }
    bookSection(){
        this.props.history.push('/books');
    }
    viewUser(userId){
        this.props.history.push(`/view-user/${userId}`);
    }
    deleteUser(userId){
        UserDetailsService.deleteUser(userId).then( res =>{
            this.setState({users : this.state.users.filter( user => user.userId !== userId)});
        })
        console.log(this.state.users);
    }
    updateUser(userId){
        this.props.history.push(`/update-user/${userId}`);
    }
    addUser(){
        this.props.history.push('/add-user');
    }
    componentDidMount(){
        this.setState({
            loading: true
        })
        UserDetailsService.getUser().then((res)=>{
            this.setState({
                users: res.data,
                loading: false
            });
        });
        console.log(this.state.users);
    }
    render() {
        const indexOfLastPost = (this.state.currentPage)*(this.state.postsPerPage);
        const indexOfFirstPost = (indexOfLastPost) - this.state.postsPerPage;
        var currentPosts = this.state.users.slice(indexOfFirstPost,indexOfLastPost);
        if(this.state.loading){
            return <h4>Loading...</h4>
        }else{
            const filteredUsers = currentPosts.filter(
                (user) => {
                    return (user.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) || (user.major.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
                }
            );
            return (
                <div className="text-center">
                    <h4 className='my-3'>UserList<input className='float-right rounded border border-primary' label= 'search' placeholder='name,major' onChange={this.onChangeSearch}/><FaSearch className='float-right mx-1 text-primary'/></h4>
                    <div className='row my-1'>
                        <button className='btn btn-primary float-left' onClick={this.historyPage}>History</button>
                    </div>
                    <div className="row">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>UserId</th>
                                    <th>UserName</th>
                                    <th>User EmailId</th>
                                    <th>User Major</th>
                                    <th>User Status</th>
                                    
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        filteredUsers.map(
                                            user => 
                                                <tr key = {user.userId}>
                                                    <td>{user.userId}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.major}</td>
                                                    <td>{user.status}</td>
                                                    
                                                    <td>
                                                        <button onClick ={() => this.updateUser(user.userId)} className="btn btn-info">Update/Add Book</button>
                                                        <button onClick ={() => this.viewUser(user.userId)} className="btn btn-info ml-1">View</button>
                                                        <button onClick ={() => this.deleteUser(user.userId)} className="btn btn-danger ml-1">Delete</button>
                                                        
                                                    </td>
                                                </tr>
                                        )
                                    }
                            </tbody>
                        </table>
                    </div>
                    <div className="row float-right mt-3">
                        <button className='btn btn-primary m-1' onClick={this.addUser}>Add User</button>
                    </div>
                    <div className="row float-right m-3">
                        <button className='btn btn-primary m-1' onClick={this.bookSection}>Book Section</button>
                    </div>
                    <div className='row'>
                        <Pagination postsPerPage ={this.state.postsPerPage} totalPosts = {this.state.users.length} paginate={this.paginate}/>
                    </div>
                </div>
            );
        }
    }
}

export default ListUsers;