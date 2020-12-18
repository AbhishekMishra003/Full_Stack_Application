import React, { PureComponent } from 'react';
import UserDetailsService from '../Service/UserDetailsService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReactDOMServer from "react-dom/server";

class BestSeller extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            books : []
        }
        this.back = this.back.bind(this);
        this.getPdf = this.getPdf.bind(this);
    }
    getPdf(){
        var source = document.getElementById("pdfFile");
        var doc = new jsPDF('p','pt');
        let y = 20;
        this.state.books.map( book =>{
            doc.text(20, y, `BookId: ${book.bookId}`);
            doc.text(20, y+20, `Book Category: ${book.subject}`);
            doc.text(20, y+40, `Book Title: ${book.title}`);
            y += 100;
        })
        doc.save("download.pdf");
    }
    back(){
        this.props.history.push("/");
    }
    componentDidMount(){
        UserDetailsService.getBestSellerBooks().then((res)=>{
            this.setState({books : res.data})
        })
    }
    render() {
        const filteredBooks = this.state.books;
        return (
            <div className = 'text-center' id = 'pdfFile'>
                <h4 className='my-3'>Best Seller Books</h4>
                <div className = 'row'>
                    <table className = 'table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Book Id</th>
                                <th>Title</th>
                                <th>Subject</th>
                                <th>Author</th>
                                <th>Sold Copies</th>
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
                                        <td>{book.soldCopies}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row float-right m-2">
                    <button className='btn btn-danger ' onClick={this.back}>Back</button>
                </div>
                <div className="row float-right m-2">
                    <button className='btn btn-primary' onClick={() => this.getPdf()}>Print</button>
                </div>
            </div>
        );
    }
}

export default BestSeller;