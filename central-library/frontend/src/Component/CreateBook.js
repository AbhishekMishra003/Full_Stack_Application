import React, { Component } from 'react';
import UserDetailsService from '../Service/UserDetailsService';
class CreateBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookId : 0,
            subject : '',
            title : '',
            authorName: '',
            publisherName : '',
            copyRight : '',
            edition : 0,
            numberOfPages: 0,
            isbn: 0,
            numberOfCopies: 0,
            nameOfLibrary: '',
            numberOfShelf: 0 
        }
        this.changeSubject = this.changeSubject.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeAuthorName = this.changeAuthorName.bind(this);
        this.changePublisherName = this.changePublisherName.bind(this);
        this.changeCopyRight = this.changeCopyRight.bind(this);
        this.changeEdition = this.changeEdition.bind(this);
        this.changeNumberOfCopies = this.changeNumberOfCopies.bind(this);
        this.changeNumberOfPages = this.changeNumberOfPages.bind(this);
        this.changeNumberOfShelf = this.changeNumberOfShelf.bind(this);
        this.changeISBN = this.changeISBN.bind(this);
        this.changeNameOfLibrary = this.changeNameOfLibrary.bind(this);
        this.changeSave = this.changeSave.bind(this);
        this.cancel =this.cancel.bind(this);
    }
    changeSave = (e) =>{
        e.preventDefault();
        let book = {title: this.state.title, subject: this.state.subject, authorName: this.state.authorName,publisherName: this.state.publisherName, copyRight:this.state.copyRight,edition:this.state.edition,numberOfPages:this.state.numberOfPages,numberOfCopies:this.state.numberOfCopies,numberOfShelf:this.state.numberOfShelf,nameOfLibrary:this.state.nameOfLibrary,isbn:this.state.isbn};
        //console.log("NewBook=>" + JSON.stringify(book));
        UserDetailsService.createBook(book).then( res =>{
            this.props.history.push('/books');
        })
    }
    cancel(){
        this.props.history.push('/books');
    }
    changeSubject(event){
        this.setState({ subject : event.target.value});
    }
    changeTitle(event){
        this.setState({ title : event.target.value});
    }
    changeAuthorName(event){
        this.setState({ authorName : event.target.value});
    }
    changePublisherName(event){
        this.setState({ publisherName : event.target.value});
    }
    changeCopyRight(event){
        this.setState({ copyRight : event.target.value});
    }
    changeEdition(event){
        this.setState({ edition : event.target.value});
    }
    changeNumberOfCopies(event){
        this.setState({ numberOfCopies : event.target.value});
    }
    changeNameOfLibrary(event){
        this.setState({ nameOfLibrary : event.target.value});
    }
    changeNumberOfPages(event){
        this.setState({ numberOfPages : event.target.value});
    }
    changeNumberOfShelf(event){
        this.setState({ numberOfShelf : event.target.value});
    }
    changeISBN(event){
        this.setState({ isbn : event.target.value});
    }
    render() {
        return (
            <div className="m-2">
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">Add Book</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-body">
                                        <label>Title: </label>
                                        <input type="text" placeholder="Title" name="Title" className="form-control"
                                        value={this.state.title} onChange={this.changeTitle}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Subject: </label>
                                        <input type="text" placeholder="Subject" name="Subject" className="form-control"
                                        value={this.state.subject} onChange={this.changeSubject}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Author Name: </label>
                                        <input type="text" placeholder="Author Name" name="name" className="form-control"
                                        value={this.state.authorName} onChange={this.changeAuthorName}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Publisher Name :</label>
                                        <input type="text" placeholder="Publisher Name" name="publisherName" className="form-control"
                                        value={this.state.publisherName} onChange={this.changePublisherName}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Copy Right :</label>
                                        <input type="text" placeholder="Copy Right" name="copyRight" className="form-control"
                                        value={this.state.copyRight} onChange={this.changeCopyRight}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Edition :</label>
                                        <input type="number" placeholder="Edition" name="Edition" className="form-control"
                                        value={this.state.edition} onChange={this.changeEdition}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Number of Pages :</label>
                                        <input type="number" placeholder="Number of Pages" name="Number_of_Pages" className="form-control"
                                        value={this.state.numberOfPages} onChange={this.changeNumberOfPages}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Number of Copies :</label>
                                        <input type="number" placeholder="Number of Copies" name="Number_of_Copies" className="form-control"
                                        value={this.state.numberOfCopies} onChange={this.changeNumberOfCopies}/>
                                    </div>
                                    <div className="form-body">
                                        <label>ISBN :</label>
                                        <input type="number" placeholder="ISBN" name="ISBN" className="form-control"
                                        value={this.state.isbn} onChange={this.changeISBN}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Shelf Number :</label>
                                        <input type="number" placeholder="Shelf Number" name="Shelf_Number" className="form-control"
                                        value={this.state.numberOfShelf} onChange={this.changeNumberOfShelf}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Name Of Library :</label>
                                        <input type="text" placeholder="Name Of Library" name="Name_Of_Library" className="form-control"
                                        value={this.state.nameOfLibrary} onChange={this.changeNameOfLibrary}/>
                                    </div>
                                    <button className="btn btn-primary m-2" onClick={this.changeSave}>Save</button>
                                    <button className="btn btn-danger m-2" onClick={this.cancel}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateBook;