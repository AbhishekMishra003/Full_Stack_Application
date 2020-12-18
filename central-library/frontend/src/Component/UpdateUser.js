import React, { Component } from 'react';
import UserDetailsService from '../Service/UserDetailsService';

class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            newBook: {},
            newBookId: 0,
            id : this.props.match.params.userId,
            userId: 0,
            name: '',
            password: '',
            rpassword: '',
            email: '',
            major: '',
            status: '',
            date: new Date(),
            expiryDateOfBook: '"2020-11-29T00:00:00.000+00:00"',
            registeredBookList: [],
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
            numberOfShelf: 0 ,
            soldCopies: 0,
            bookIdd: 0

        }
        this.addBook = this.addBook.bind(this);
        this.changeUserId = this.changeUserId.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeRePassword = this.changeRePassword.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeMajor = this.changeMajor.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeUpdate = this.changeUpdate.bind(this);
        this.cancel = this.cancel.bind(this);
        this.changeExpiryDateOfBook = this.changeExpiryDateOfBook.bind(this);
        this.changeBookIdd= this.changeBookIdd.bind(this);
        
    }
    addBook(bookId){
        var bookk = {};
        UserDetailsService.getBookById(bookId).then((res) =>{
            bookk = res.data;
            var x = res.data.numberOfCopies - 1;
            this.setState({
                sbook: res.data,
                title: bookk.title,
                subject: bookk.subject,
                authorName: bookk.authorName,
                publisherName: bookk.publisherName,
                isbn: bookk.isbn,
                numberOfCopies: bookk.numberOfCopies -1,
                numberOfPages: bookk.numberOfPages,
                numberOfShelf: bookk.numberOfShelf,
                nameOfLibrary: bookk.nameOfLibrary,
                edition: bookk.edition,
                copyRight: bookk.copyRight,
                soldCopies: bookk.soldCopies + 1
            });
            var book1 = {title: this.state.title, subject: this.state.subject, authorName: this.state.authorName,publisherName: this.state.publisherName, copyRight:this.state.copyRight,edition:this.state.edition,numberOfPages:this.state.numberOfPages,numberOfCopies:x,numberOfShelf:this.state.numberOfShelf,nameOfLibrary:this.state.nameOfLibrary,isbn:this.state.isbn,soldCopies:this.state.soldCopies};
            UserDetailsService.updateBook(book1,bookId).then( res =>{
                this.props.history.push(`/update-user/${this.state.id}`);
            });
        });
        let userA = {userId: this.state.userId,name: this.state.name, password: this.state.password,rpassword: this.state.rpassword,email: this.state.email , major:this.state.major,status:this.state.status,date:this.state.date,expiryDateOfBook: this.state.expiryDateOfBook,registeredBookList: this.state.registeredBookList};
        UserDetailsService.updateUserWithBook(userA, this.state.id,bookId).then( res =>{
            this.props.history.push(`/update-user/${this.state.id}`);
        });
        alert(`Book with bookId ${bookId} is just added to your account`);
    }
    componentDidMount(){
        UserDetailsService.getUserById(this.state.id).then((res) =>{
            let user = res.data;
            this.setState({
                userId: user.userId,
                password: user.password,
                rpassword: user.rpassword,
                name: user.name,
                email: user.email,
                major: user.major,
                status: user.status,
                date: user.date,
                registeredBookList: user.registeredBookList,
                expiryDateOfBook: user.expiryDateOfBook
            })
        });
        UserDetailsService.getBook().then((res)=>{
            this.setState({books: res.data})
        });
    }
    changeUpdate = (e) =>{
        e.preventDefault();
        let userA = {userId: this.state.userId,name: this.state.name, password: this.state.password,rpassword: this.state.rpassword,email: this.state.email , major:this.state.major,status:this.state.status,date:this.state.date,expiryDateOfBook:this.state.expiryDateOfBook,registeredBookList:this.state.registeredBookList};
        console.log("UserDetails=>" + JSON.stringify(userA));
        UserDetailsService.updateUser(userA, this.state.id).then( res =>{
            this.props.history.push('/');
        })
    }
    cancel(){
        this.props.history.push('/');
    }
    changeUserId = (event) =>{
        this.setState({
            userId: event.target.value
        });
    }
    changePassword = (event) =>{
        this.setState({password: event.target.value});
    }
    changeRePassword = (event) =>{
        this.setState({rpassword : event.target.value});
    }
    changeName = (event) =>{
        this.setState({name : event.target.value});
    }
    changeEmail = (event) =>{
        this.setState({email : event.target.value});
    }
    changeMajor = (event) =>{
        this.setState({major : event.target.value});
    }
    changeStatus = (event) =>{
        this.setState({status : event.target.value}); 
    }
    changeDate = (event) =>{
        this.setState({date : event.target.value});
    }
    changeExpiryDateOfBook = (event) =>{
        this.setState({expiryDateOfBook : event.target.value});
    }
    changeBookIdd = (event) =>{
        this.setState({bookIdd : event.target.value});
    }

    render() {
        return (
            <div className="m-2">
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">Update User</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-body">
                                        <label>UserId: </label>
                                        <input type="number" placeholder="UserId" name="userId" className="form-control"
                                        value={this.state.userId} onChange={this.changeUserId}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Password: </label>
                                        <input type="password" placeholder="Password" name="password" className="form-control"
                                        value={this.state.password} onChange={this.changePassword}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Rewrite the Password: </label>
                                        <input type="password" placeholder="Retype password" name="Re-password" className="form-control"
                                        value={this.state.rpassword} onChange={this.changeRePassword}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Name: </label>
                                        <input type="text" placeholder="UserName" name="name" className="form-control"
                                        value={this.state.name} onChange={this.changeName}/>
                                    </div>
                                    <div className="form-body">
                                        <label>E-Mail :</label>
                                        <input type="text" placeholder="E-MAIL" name="email" className="form-control"
                                        value={this.state.email} onChange={this.changeEmail}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Major :</label>
                                        <input type="text" placeholder="Major" name="major" className="form-control"
                                        value={this.state.major} onChange={this.changeMajor}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Status :</label>
                                        <input type="text" placeholder="Status" name="status" className="form-control"
                                        value={this.state.status} onChange={this.changeStatus}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Expired :</label>
                                        <input type="date" placeholder="Date" name="date" className="form-control"
                                        value={this.state.date} onChange={this.changeDate}/>
                                    </div>
                                    <div className="form-body m-2">
                                        <h5>Add Book :</h5>
                                        <div className="form-body m-2">
                                            <label>Expiry Date for Book :</label>
                                            <input type="date" placeholder="Expiry Date" name="expiryDate" className="form-control"
                                            value={this.state.expiryDateOfBook} onChange={this.changeExpiryDateOfBook}/>
                                            <label>Enter BookId :</label>
                                            <input type="number" placeholder="Book Id" name="bookId" className="form-control"
                                            value={this.state.bookIdd} onChange={this.changeBookIdd}/>
                                            <button className='btn-sm btn-primary m-2' onClick={() => this.addBook(this.state.bookIdd)}>Add</button>
                                        </div>
                                        {/*<div className="m-2">
                                        {
                                            this.state.books.map(
                                                book =>
                                                    <div key= {book.bookId}>
                                                        <p><b>BookId :</b> {book.bookId} <b>Title:</b> {book.title} <b>Author:</b> {book.authorName} <button className='btn-sm btn-primary ml-2' onClick={() => this.addBook(book.bookId)}>Add</button></p>
                                                    </div>
                                            )
                                        }
                                        </div>*/}
                                    </div>
                                    <button className="btn btn-primary m-2" onClick={this.changeUpdate}>Update</button>
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

export default UpdateUser;