import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


const ASSEMBLYAI_TOKEN = 'eb277c7378e8460dbcdb70e68bb7b989';
const SERVER_URL = `http://localhost:4000/`

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null
    };
    this.call = this.call.bind(this);
    this.getTranscript = this.getTranscript.bind(this);
  }

  componentDidMount() {
  }


  async getTranscript(transcribe_id){
    const result = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcribe_id}`,
      {headers: {'authorization': ASSEMBLYAI_TOKEN}});
    
    if (result.data.status !== 'completed'){
      setTimeout(()=>{this.getTranscript(transcribe_id)}, 10000);
    }else{
      this.setState({data: result.data.text});
    }
  }

  async call (){
    const uri = `${SERVER_URL}make_call`;
    console.log(uri);
    console.log(this);
    const ref = this;
    axios.post(uri,{'name' : 'Eric', 'number' : "+19084721034"}).then(async res => {
      const stt_uri = 'https://api.assemblyai.com/v2/transcript';
      
      let resp = await axios.post(stt_uri, {'audio_url': res.data}, 
      {headers: {'authorization': ASSEMBLYAI_TOKEN,"content-type": "application/json" }});
      console.log(resp);
      let transcribeID = resp.data.id;
      ref.getTranscript(transcribeID);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <p className="App-intro">{this.state.data}</p>
          <button onClick={this.call}>Call</button>
        </header>
      </div>
    );
  }
}

export default App;