import React, { PureComponent } from 'react';
import UserDetailsService from '../Service/UserDetailsService';
import jsPDF from 'jspdf';

class View extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.userId,
            user: {},
            userBookList: [],
            newDate : new Date(),
            bill: 0,
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
            soldCopies: 0
        }
        this.back = this.back.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.getPdf = this.getPdf.bind(this);
        this.getBill = this.getBill.bind(this);
    }
    getBill(date1){
        const date2 = new Date();
        const num = (date2.getTime() - date1.getTime())/(1000*60*60*24);
        const numm = Math.floor(num);
        var num2;
        
        if( numm > 0){
            if(numm < 2){
                num2 = 5;
                //alert(`Book with bookId ${bookId} is just removed from your account and bill is ${num2}`);
            }
            else if(numm < 6){
                num2 = 5 + (numm -1)*10;
                //alert(`Book with bookId ${bookId} is just removed from your account and bill is ${num3}`);
            }
            else if( 5 < numm){
                num2 = 45 + (numm-5)*15;
                //alert(`Book with bookId ${bookId} is just removed from your account and bill is ${num4} no of late days are ${numm}`);
            }
        }else{
            num2 = 0;
            //alert(`Book with bookId ${bookId} is just removed from your account and bill is 0`);
        }
        this.setState({ bill: num2});
    }
    getPdf(registeredId, bookId, date1){
        var doc = new jsPDF('p','pt');
        doc.text(20,20,`RegistrationId: ${registeredId}`);
        doc.text(20,40,`UserId: ${this.state.id}`);
        doc.text(20,60,`BookId: ${bookId}`);
        doc.text(20,80,`Expiry Date(book): ${date1}`);
        doc.text(20,100,`ReturnDate(book):${this.state.newDate}`);
        doc.text(20,120,`Total Bill: ${this.state.bill}`);
        doc.save("Bill.pdf");
        this.props.history.push('/');
    }
    updateUser(registeredId, bookId, date1){
        var bookk = {};
        UserDetailsService.getBookById(bookId).then((res) =>{
            bookk = res.data;
            var x = res.data.numberOfCopies + 1;
            this.setState({
                sbook: res.data,
                title: bookk.title,
                subject: bookk.subject,
                authorName: bookk.authorName,
                publisherName: bookk.publisherName,
                isbn: bookk.isbn,
                numberOfCopies: bookk.numberOfCopies +1,
                numberOfPages: bookk.numberOfPages,
                numberOfShelf: bookk.numberOfShelf,
                nameOfLibrary: bookk.nameOfLibrary,
                edition: bookk.edition,
                copyRight: bookk.copyRight,
                soldCopies: bookk.soldCopies
            });
            var book1 = {title: this.state.title, subject: this.state.subject, authorName: this.state.authorName,publisherName: this.state.publisherName, copyRight:this.state.copyRight,edition:this.state.edition,numberOfPages:this.state.numberOfPages,numberOfCopies: x,numberOfShelf:this.state.numberOfShelf,nameOfLibrary:this.state.nameOfLibrary,isbn:this.state.isbn,soldCopies:this.state.soldCopies};
            UserDetailsService.updateBook(book1,bookId).then( res =>{
                this.props.history.push(`/view-user/${this.state.id}`);
            });
        });
        UserDetailsService.removeBookFromUser(this.state.user, this.state.id, registeredId).then((res) =>{
            this.props.history.push(`/view-user/${this.state.id}`);
        });
        UserDetailsService.deleteRegisteredBook(registeredId).then( (res) =>{
            this.props.history.push(`/view-user/${this.state.id}`);
        });
        const date2 = new Date();
        const num = (date2.getTime() - date1.getTime())/(1000*60*60*24);
        const numm = Math.floor(num);
        var num2;
        var time ='onTime';
        
        if( numm > 0){
            if(numm < 2){
                num2 = 5;
                time = 'late';
                //alert(`Book with bookId ${bookId} is just removed from your account and bill is ${num2}`);
            }
            else if(numm < 6){
                num2 = 5 + (numm -1)*10;
                time = 'late';
                //alert(`Book with bookId ${bookId} is just removed from your account and bill is ${num3}`);
            }
            else if( 5 < numm){
                num2 = 45 + (numm-5)*15;
                time = 'late';
                //alert(`Book with bookId ${bookId} is just removed from your account and bill is ${num4} no of late days are ${numm}`);
            }
        }else{
            num2 = 0;
            time = 'onTime'
            alert(`Book with bookId ${bookId} is just removed from your account and bill is 0`);
        }
        this.setState({ bill: num2});
        let history = {registeredId: registeredId,userId: this.state.id, bookId: bookId,bill: num2,time: time, expiryDateOfBook: date1,returnedDateOfBook: new Date(), returnDay: (new Date()).getDay()};
        UserDetailsService.createHistory(history).then((res) =>{
            this.props.history.push(`/view-user/${this.state.id}`)
        });
    }
    back(){
        console.log(this.state.userBookList)
        this.props.history.push("/");
    }
    componentDidMount(){
        UserDetailsService.getUserById(this.state.id).then((res)=>{
            this.setState({
                user: res.data,
                userBookList: res.data.registeredBookList
            });
        });
        console.log(this.state.user);
    }
    render() {
        return (
            <div classNmae='card col-md-6 offset-md-3'>
                <h3 classname='text-center'>View User Details</h3>
                <div className = 'card-body'>
                    <div className='row'>
                        <h6>UserId: </h6>
                        <p className='mx-3'><i>{ this.state.user.userId }</i></p>
                    </div>
                    <div className='row'>
                        <h6>UserName: </h6>
                        <p className='mx-3'><i>{ this.state.user.name }</i></p>
                    </div>
                    <div className='row'>
                        <h6>E-MAIL: </h6>
                        <p className='mx-3'><i>{ this.state.user.email }</i></p>
                    </div>
                    <div className='row'>
                        <h6>Major: </h6>
                        <p className='mx-3'><i>{ this.state.user.major }</i></p>
                    </div>
                    <div className='row'>
                        <h6>Status: </h6>
                        <p className='mx-3'><i>{ this.state.user.status }</i></p>
                    </div>
                    <div className='row'>
                        <h6>Password: </h6>
                        <p className='mx-3'><i>{ this.state.user.password }</i></p>
                    </div>
                    <div className='row'>
                        <h6>Expiry Date: </h6>
                        <p className='mx-3'><i>{ this.state.user.date }</i></p>
                    </div>
                    <div className='row text-center'>
                        <h6>Issued Books :</h6>
                        <table className= 'table table-bordered table-striped'>
                            <thead>
                                <tr>
                                    <th>BookId</th>
                                    <th>Expiry Date of book</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.userBookList.map(
                                        book => 
                                            <tr key = {book.bookId}>
                                                <td>{book.bookId}</td>
                                                <td>{book.expiryDateOfBook}</td>
                                                <td>
                                                    <div class="container">
                                                        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" onClick ={() => this.updateUser(book.registeredId,book.bookId,new Date(book.expiryDateOfBook))}>
                                                            Return Book
                                                        </button>
                                                        <button type="button" class="btn btn-info mx-1" data-toggle="modal" data-target="#myNewModal" onClick ={() => this.getBill(new Date(book.expiryDateOfBook))}>
                                                            View Bill
                                                        </button>
                                                        <div class="modal" id="myModal">
                                                            <div class="modal-dialog">
                                                                <div class="modal-content m-4">
                                                                    <div class="modal-header">
                                                                    <h4 class="modal-title">Payable Bill</h4>
                                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                                    </div>
                                                                    <div class="modal-body ">
                                                                        <div className='row px-3'>
                                                                            <h6>UserId: </h6>
                                                                            <p className='mx-3'><i>{ this.state.user.userId }</i></p>
                                                                        </div>
                                                                        <div className='row px-3'>
                                                                            <h6>BookId: </h6>
                                                                            <p className='mx-3'><i>{ book.bookId }</i></p>
                                                                        </div>
                                                                        <div className='row px-3'>
                                                                            <h6>UserName: </h6>
                                                                            <p className='mx-3'><i>{ this.state.user.name }</i></p>
                                                                        </div>
                                                                        <div className='row px-3'>
                                                                            <h6>E-MAIL: </h6>
                                                                            <p className='mx-3'><i>{ this.state.user.email }</i></p>
                                                                        </div>
                                                                        <div className='row px-3'>
                                                                            <h6>Expiry Date of Book: </h6>
                                                                            <p className='mx-3'><i>{book.expiryDateOfBook} </i></p>
                                                                        </div>
                                                                        <div className='row p-3'>
                                                                            <h6>Total Payable Amount: </h6>
                                                                            <p className='mx-3'><i> {this.state.bill} </i></p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-info" data-dismiss="modal" onClick ={() => this.getPdf(book.registeredId,book.bookId,new Date(book.expiryDateOfBook))}>Get Pdf</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="modal" id="myNewModal">
                                                            <div class="modal-dialog">
                                                                <div class="modal-content m-4">
                                                                    <div class="modal-header">
                                                                    <h4 class="modal-title">Payable Bill</h4>
                                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                                    </div>
                                                                    <div class="modal-body ">
                                                                        <div className='row px-3'>
                                                                            <h6>UserId: </h6>
                                                                            <p className='mx-3'><i>{ this.state.user.userId }</i></p>
                                                                        </div>
                                                                        <div className='row px-3'>
                                                                            <h6>BookId: </h6>
                                                                            <p className='mx-3'><i>{ book.bookId }</i></p>
                                                                        </div>
                                                                        <div className='row px-3'>
                                                                            <h6>UserName: </h6>
                                                                            <p className='mx-3'><i>{ this.state.user.name }</i></p>
                                                                        </div>
                                                                        <div className='row px-3'>
                                                                            <h6>E-MAIL: </h6>
                                                                            <p className='mx-3'><i>{ this.state.user.email }</i></p>
                                                                        </div>
                                                                        <div className='row px-3'>
                                                                            <h6>Expiry Date of Book: </h6>
                                                                            <p className='mx-3'><i>{book.expiryDateOfBook} </i></p>
                                                                        </div>
                                                                        <div className='row p-3'>
                                                                            <h6>Total Payable Amount: </h6>
                                                                            <p className='mx-3'><i> {this.state.bill} </i></p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*<button onClick ={() => this.updateUser(book.registeredId,book.bookId,new Date(book.expiryDateOfBook))} className="btn btn-info mx-1">Return Book</button>*/}
                                                    </div>
                                                    
                                                    
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div> 
                <button className='btn btn-info' onClick ={this.back}>Back</button>
            </div>
        );
    }
}

export default View;