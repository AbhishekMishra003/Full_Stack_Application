import React, { Component } from 'react';
import UserDetailsService from '../Service/UserDetailsService';

class Createuser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 0,
            name: '',
            password: '',
            rpassword: '',
            email: '',
            major: '',
            status: '',
            date: new Date(),
            bookList: []
        }
        this.changeUserId = this.changeUserId.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeRePassword = this.changeRePassword.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeMajor = this.changeMajor.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeSave = this.changeSave.bind(this);
        this.cancel =this.cancel.bind(this);
    }
    changeSave = (e) =>{
        e.preventDefault();
        let user = {userId: this.state.userId,name: this.state.name, password: this.state.password, rpassword: this.state.rpassword,email: this.state.email, major:this.state.major,status:this.state.status,date:this.state.date};
        //console.log("UserDetails=>" + JSON.stringify(user));
        UserDetailsService.createUser(user).then( res =>{
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
        if(this.state.password === ''){
            document.getElementById("mypass2").style.display = "inline";
        }
        else{
            if(this.state.password === event.target.value){
                document.getElementById("mypass").style.display = "none";
                document.getElementById("mypass2").style.display = "none";
                document.getElementById("mypass1").style.display = "inline";
            }else{
                document.getElementById("mypass").style.display = "inline";
                document.getElementById("mypass2").style.display = "none";
                document.getElementById("mypass1").style.display = "none";
            }
        }
    }
    changeName = (event) =>{
        this.setState({name : event.target.value});
        if(this.state.password === this.state.rpassword){
            document.getElementById("mypass1").style.display = "inline";
        }
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

    render() {
        return (
            <div className="m-2">
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">Add User</h3>
                            <div className="card-body">
                                <form>
                                    
                                    <div className="form-body">
                                        <label>Password: </label>
                                        <input type="password" placeholder="Password" name="password" className="form-control"
                                        value={this.state.password} onChange={this.changePassword}/>
                                    </div>
                                    <div className="form-body">
                                        <label>Rewrite the Password: </label>
                                        <input type="password" placeholder="Retype password" name="Re-password" className="form-control"
                                        value={this.state.rpassword} onChange={this.changeRePassword}/>
                                        <span className='bg-danger text-white rounded class1' id="mypass">Password is different </span>
                                        <span className='bg-success text-white class1' id="mypass1">Password Matched</span>
                                        <span className='bg-danger text-white rounded class1' id="mypass2">Please Type password first</span>
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

export default Createuser;