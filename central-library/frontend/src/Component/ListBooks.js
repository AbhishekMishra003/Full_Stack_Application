import React, { Component } from 'react';
import UserDetailsService from '../Service/UserDetailsService';
import {FaReact, FaSearch} from 'react-icons/fa';
import Pagination from './Pagination';

class ListBooks extends Component {
    constructor(props){
        super(props);
        this.state = {
            books : [],
            search: '',
            loading: false,
            currentPage: 1,
            postsPerPage: 10
            /*bookId : 0,
            subject : '',
            title : '',
            authorName: '',
            publisherName : '',
            CopyRight : '',
            Edition : 0,
            numberOfPages: 0,
            ISBN: 0,
            numberOfCopies: 0,
            nameOfLibrary: '',
            numberOfShelf: 0 */
        }
        this.addBook = this.addBook.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.userSection = this.userSection.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.viewBook = this.viewBook.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.bestSeller = this.bestSeller.bind(this);
        this.paginate = this.paginate.bind(this);
    }
    paginate(pageNumber){
        this.setState({
            currentPage: pageNumber
        })
    }
    bestSeller(){
        this.props.history.push("/bestSeller");
    }
    applyFilter(){
        var x = document.getElementById("myCheck").checked;
        if(x){
            this.setState({search : '123456789'});
        }
    }
    onChangeSearch = event =>{
        this.setState({ search: event.target.value});
    }
    viewBook(bookId){
        this.props.history.push(`/view-book/${bookId}`);
    }
    deleteBook(bookId){
        UserDetailsService.deleteBook(bookId).then( res =>{
            this.setState({ books : this.state.books.filter( book => book.bookId !== bookId)})
        });
    }
    userSection(){
        this.props.history.push('/');
    }
    addBook(){
        this.props.history.push('/books/add-book')
    }
    updateBook(bookId){
        this.props.history.push(`/books/update-book/${bookId}`);
    }
    componentDidMount(){
        this.setState({
            loading: true,
            loading: false
        });
        UserDetailsService.getBook().then((res)=>{
            this.setState({books : res.data})
        })
    }
    render() {
        const indexOfLastPost = (this.state.currentPage)*(this.state.postsPerPage);
        const indexOfFirstPost = (indexOfLastPost) - this.state.postsPerPage;
        var currentPosts = this.state.books.slice(indexOfFirstPost,indexOfLastPost);
        if(this.state.loading){
            return <h4>Loading...</h4>
        }else{
            const filteredBooks = currentPosts.filter(
                (book) => {
                    return (book.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) || (book.subject.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) || (book.authorName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) || (this.state.search.toString().indexOf(book.numberOfCopies.toString().substring(0,1)) !== -1);
                }
            );
            return (
                <div className = 'text-center'>
                    <h4 className='my-3'>List of Books<input className='float-right rounded border border-primary' label= 'search' placeholder='title,subject or author' onChange={this.onChangeSearch}/><FaSearch className='float-right mx-1 text-primary'/></h4>
                    <div className='row px-2'>
                        <button className='m-2 btn-xm btn-primary' onClick={this.applyFilter}>Filter</button>
                        <h6 className='m-2'>Available<input type="checkbox" className='mx-1' id="myCheck"/></h6>
                    </div>
                    <div className = 'row'>
                        <table className = 'table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>Book Id</th>
                                    <th>Title</th>
                                    <th>Subject</th>
                                    <th>Author</th>
                                    <th>Number of Copies</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredBooks.map(
                                        book =>
                                        <tr key={book.bookId}>
                                            <td>{book.bookId}</td>
                                            <td>{book.title}</td>
                                            <td>{book.subject}</td>
                                            <td>{book.authorName}</td>
                                            <td>{book.numberOfCopies}</td>
                                            <td>
                                                <button onClick ={() => this.updateBook(book.bookId)} className="btn btn-info">Update</button>
                                                <button onClick ={() => this.viewBook(book.bookId)} className="btn btn-info ml-1">View</button>
                                                <button onClick ={() => this.deleteBook(book.bookId)} className="btn btn-danger ml-1">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row float-right mt-3">
                        <button className='btn btn-primary m-1' onClick={this.addBook}>Add Book</button>
                    </div>
                    <div className="row float-right m-3">
                        <button className='btn btn-primary m-1' onClick={this.userSection}>User Section</button>
                    </div>
                    <div className="row float-left m-3">
                        <button className='btn btn-success m-1' onClick={this.bestSeller}>Best Seller Books</button>
                    </div>
                    <div className='row m-3'>
                        <Pagination postsPerPage ={this.state.postsPerPage} totalPosts = {this.state.books.length} paginate={this.paginate}/>
                    </div>
                </div>
            );
        }
    }
}

export default ListBooks;