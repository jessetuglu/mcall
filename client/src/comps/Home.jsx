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
      setTimeout(()=>{this.getTranscript(transcribe_id)}, 5000);
    }else{
      const standardText = "You have a trial account. You can remove this message at any time by upgrading to a full account. Press any key to execute your code. ";
      this.setState({data: result.data.text.split(standardText)[1]});
    }
  }

  async call (){
    const uri = `${SERVER_URL}make_call`;
    console.log(uri);
    console.log(this.state.user);
    const ref = this;
    axios.post(uri,{'name' : this.state.user.name, 'number' : this.state.user.number}).then(async res => {
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
<div className = "login">
      <h1>  <div className = "welcomeMessage">Welcome, {this.state.user.name}</div> </h1>


     <h2> You deserve happiness, we are here to help :)</h2>

      <div className="article">
        <div className="col1">
        Everyone has some risk of developing a mental health disorder, no matter their age, sex, income, or ethnicity.

In the U.S. and much of the developed world, mental disorders are one of the leading causesTrusted Source of disability.

Social and financial circumstances, biological factors, and lifestyle choices can all shape a person’s mental health.

A large proportion of people with a mental health disorder have more than one condition at a time.

It is important to note that good mental health depends on a delicate balance of factors and that several elements of life and the world at large can work together to contribute to disorders.

The following factors may contribute to mental health disruptions.


        </div>
        <div className="col2">
        Having limited financial means or belonging to a marginalized or persecuted ethnic group can increase the risk of mental health disorders.

A 2015 studyTrusted Source of 903 families in Iran identified several socioeconomic causes of mental health conditions, including poverty and living on the outskirts of a large city.

The researchers also explained the difference in the availability and quality of mental health treatment for certain groups in terms of modifiable factors, which can change over time, and nonmodifiable factors, which are permanent.


        </div>
        <div className="col3">
        The NIMH suggest that genetic family history can increase the likelihoodTrusted Source of mental health conditions, as certain genes and gene variants put a person at higher risk.

However, many other factors contribute to the development of these disorders.

Having a gene with links to a mental health disorder, such as depression or schizophrenia, does not guarantee that a condition will develop. Likewise, people without related genes or a family history of mental illness can still have mental health issues.

Mental health conditions such as stress, depression, and anxiety may develop due to underlying, life-changing physical health problems, such as cancer, diabetes, and chronic pain.
        </div>
      </div>


     <p className = "line"> Suicide prevention hotline: <a href="https://suicidepreventionlifeline.org/">800-273-8255</a></p>
     <p className = "line"><a href="https://www.helpguide.org/articles/suicide-prevention/are-you-feeling-suicidal.htm">Suicide prevention guide</a></p>
      <button onClick={this.call}>Call</button>
      <p>{this.state.data}</p>
      <button onClick={this.testingLogout} className = "button">Logout</button>
    </div>
      )
  }
};

Home.propTypes = {
  setIsAuth: Proptypes.func
}
export default Home;
