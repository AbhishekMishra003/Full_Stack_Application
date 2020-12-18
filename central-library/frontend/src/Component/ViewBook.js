import React, { Component } from 'react';
import UserDetailsService from '../Service/UserDetailsService';

class ViewBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            book : {},
            id : this.props.match.params.bookId
        }
        this.back = this.back.bind(this);
    }
    back(){
        this.props.history.push("/books");
    }
    componentDidMount(){
        UserDetailsService.getBookById(this.state.id).then( res =>{
            this.setState({ book : res.data})
        });
    }
    render() {
        return (
            <div classNmae='card col-md-6 offset-md-3'>
                <h3 classname='text-center'>View Book Details</h3>
                <div className = 'card-body'>
                    <div className='row'>
                        <h6>BookId: </h6>
                        <p className='mx-3'><i>{ this.state.book.bookId }</i></p>
                    </div>
                    <div className='row'>
                        <h6>Title: </h6>
                        <p className='mx-3'><i>{ this.state.book.title}</i></p>
                    </div>
                    <div className='row'>
                        <h6>Subject: </h6>
                        <p className='mx-3'><i>{ this.state.book.subject}</i></p>
                    </div>
                    <div className='row'>
                        <h6>Author Name: </h6>
                        <p className='mx-3'><i>{ this.state.book.authorName }</i></p>
                    </div>
                    <div className='row'>
                        <h6>Publisher Name: </h6>
                        <p className='mx-3'><i>{ this.state.book.publisherName}</i></p>
                    </div>
                    <div className='row'>
                        <h6>Edition: </h6>
                        <p className='mx-3'><i>{ this.state.book.edition}</i></p>
                    </div>
                    <div className='row'>
                        <h6>ISBN: </h6>
                        <p className='mx-3'><i>{ this.state.book.isbn}</i></p>
                    </div>
                    <div className='row'>
                        <h6>Number of Copies: </h6>
                        <p className='mx-3'><i>{ this.state.book.numberOfCopies}</i></p>
                    </div>
                    <div className='row'>
                        <h6>Sold Copies: </h6>
                        <p className='mx-3'><i>{ this.state.book.soldCopies}</i></p>
                    </div>
                    <div className='row'>
                        <h6>Number of Pages: </h6>
                        <p className='mx-3'><i>{ this.state.book.numberOfPages}</i></p>
                    </div>
                    <div className='row'>
                        <h6>Shelf Number: </h6>
                        <p className='mx-3'><i>{ this.state.book.numberOfShelf}</i></p>
                    </div>
                    <div className='row'>
                        <h6>Name of Library: </h6>
                        <p className='mx-3'><i>{ this.state.book.nameOfLibrary}</i></p>
                    </div>
                </div>
                <button className='btn btn-info' onClick ={this.back}>Back</button>
            </div>
        );
    }
}

export default ViewBook;