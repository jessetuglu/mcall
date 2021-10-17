import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {AuthService} from "../utils/useTokenStore";


export class Login extends React.Component{
  constructor(props) {
    super(props);
  }

  state = {
    hasSubmitted: false,
    tempNumber: "",
    tempCode: "",
  };

  handleVerification = () => {
    this.setState({ hasSubmitted: true });
    axios.post("http://localhost:5000/send_code", {number: this.state.tempNumber})
      .then((resp) => {
        console.log("verification sent.");
      });
  };

  handleCodeCheck = () => {
    axios.post("http://localhost:5000/verify_otp", {number: this.state.tempNumber, code: this.state.tempCode})
      .then((resp) => {
        if (resp.data.token){
          AuthService.setAuth(resp.data.token);
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
      <div>
        {this.state.hasSubmitted ?
          <div>
            <label>Please enter the code that was sent your phone</label>
            <input type={"text"} onChange={this.handleChange} name={"tempCode"} value={this.state.tempCode}/>
            <button onClick={this.handleCodeCheck}>Verify Code</button>
          </div>
          :
          <div>
            <label>Please enter your phone number</label>
            <input type={"text"} onChange={this.handleChange} name={"tempNumber"} value={this.state.tempNumber}/>
            <button onClick={this.handleVerification}>Verify me</button>
          </div>
        }
      </div>
    );
  }
}

Login.propTyps = {
  setAuth: PropTypes.func
}

