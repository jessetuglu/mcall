import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


export class Login extends React.Component{
  constructor(props) {
    super(props);
  }

  state = {
    hasSubmitted: false,
    tempNumber: undefined,
    tempCode: undefined,
  };

  handleVerification = () => {
    this.setState({ hasSubmitted: true });
    axios.post("http://localhost:5000/send_code", {number: this.state.tempNumber})
      .then((resp) => {
        console.log(resp);
      });
  };

  handleCodeCheck = () => {
    axios.post("http://localhost:5000/verify_otp", {number: this.state.tempNumber, code: this.state.tempCode})
      .then((resp) => {
        if (resp.msg === "SUCCESS"){
          this.props.setNumber(this.state.tempNumber);
        }
        else{
          this.setState({ hasSubmitted: false });
        }
      });
  };


  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
    console.log(this.state);
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
  setNumber: PropTypes.func
}

