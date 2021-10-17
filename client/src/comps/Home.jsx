import {React, Component} from 'react';
import Proptypes from 'prop-types';
import {UserService} from "../utils/UserService";
import axios from 'axios';

const ASSEMBLYAI_TOKEN = 'eb277c7378e8460dbcdb70e68bb7b989';
const SERVER_URL = `http://localhost:4000/`

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      user: UserService.getUser(),

    };
    this.call = this.call.bind(this);
    this.getTranscript = this.getTranscript.bind(this);
  }
  testingLogout = () => {
    UserService.logoutUser();
    this.props.setIsAuth(false);
  };

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
    axios.post(uri,{'name' : this.user.naem, 'number' : this.user.number}).then(async res => {
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
      <div>
        <div>Welcome, {this.state.user.name}</div>
        <p className="App-intro">{this.state.data}</p>
        <button onClick={this.call}>Call</button>
        <button onClick={this.testingLogout}>Logout</button>
      </div>
      )
  }
};

Home.propTypes = {
  setIsAuth: Proptypes.func
}
export default Home;