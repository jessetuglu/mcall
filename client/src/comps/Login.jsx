import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {UserService} from "../utils/UserService";
import "./Login.css";


export class Login extends React.Component{
  state = {
    hasSubmitted: false,
    tempNumber: "",
    tempCode: "",
    name: "",
  };

  handleVerification = () => {
    this.setState({ hasSubmitted: true });
    axios.post("http://localhost:5000/send_code", {number: this.state.tempNumber})
      .then((resp) => {
        console.log("verification sent.");
      }).catch(e => console.log(e));
  };

  handleCodeCheck = () => {
    axios.post("http://localhost:5000/verify_otp", {number: this.state.tempNumber, code: this.state.tempCode})
      .then((resp) => {
        if (resp.data.status){
          const user = { number: this.state.tempNumber, name: this.state.name };
          UserService.setUser(user);
          this.props.setAuth(true);
        }
        else{
          this.setState({ hasSubmitted: false });
        }
      })
      .catch((e)=>{
        console.log(e);
      });
  };


  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  render(){
    return(
      <div >
        {this.state.hasSubmitted ?
          <div className = "login">
            <label>Please enter the code that was sent your phone</label>
            <input type={"text"} onChange={this.handleChange} name={"tempCode"} value={this.state.tempCode} className="form"/>
            <button onClick={this.handleCodeCheck} className="button">Verify Code</button>
          </div>
          :
          <div className = "login">
              <label>Please enter your name: </label>
              <input className="form" type={"text"} onChange={this.handleChange} name={"name"} value={this.state.name}/>
              <label>Please enter your phone number: </label>
              <input className="form" type={"text"} onChange={this.handleChange} name={"tempNumber"} value={this.state.tempNumber}/>
              <button onClick={this.handleVerification} className="button">Verify me</button>
          </div>
        }
      </div>
    );
  }
}

Login.propTyps = {
  setAuth: PropTypes.func
}

