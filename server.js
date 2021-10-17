/* eslint-disable no-multi-str */
const express = require('express'); //Line 1
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express(); //Line 2

app.use(cors());
app.use(express.json())
const port = process.env.PORT; //Line 3
console.log(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.post('/verify_phone', (req, res) => {
  console.log(req.body);
});

async function fetchRecording(callSid, req) {
  let res = await client.recordings.list({callSid: callSid, limit: 1});
  if (res.length <= 0) {
    setTimeout(fetchRecording, 10000);
  } else {
    let out = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Recordings/${res[0].sid}.mp3'`;
    req.send(out);
  }
}

app.post('/make_call', (req, res) => {
  const phone_call = `<Response>\
  <Say>Hey ${req.body.name}, how are you feeling today?</Say>\
  <Pause length='5'/>\
  <Say>I hear you ${req.body.name}. Could you tell me more?</Say>\
  <Pause length='10'/>\
  <Say></Say>\
  </Response>`
  // setTimeout(()=>{
  // fetchRecording('CAb05a7aa53396d996662c078a704f8df1',res)}, 1000);

  client.calls.create({
    record: true,
    twiml: phone_call,
    to: req.body.number,
    from: '+13187053381'
  }).then(call => {
    setTimeout(() => {
      fetchRecording(call.sid, res)
    }, 60000);
  })
    .catch(err => console.log(err));
})
// app.listen(process.env.PORT, () => console.log(`Running on Port ${process.env.PORT}`))
process.on('uncaughtException', err => {
  console.log(err)
})
process.on('SIGTERM', err => {
  console.log(err)
})
app.post('/send_code', (req, res) => {
  const number = req.body.number;

  client.verify.services(process.env.PHONE_VER_ACCOUNT_ID)
    .verifications
    .create({to: number, channel: 'sms'})
    .then((verification) => {
      res.status(200);
      res.json({msg: "Verification code sent."});
    })
    .catch((e) => {
      console.log("error: ", e);
      res.status(400);
      res.json({error: "Could not send verification code."});
    });
});

app.post('/verify_otp', (req, res) => {
  const {number, code} = req.body;
  client.verify.services(process.env.PHONE_VER_ACCOUNT_ID)
    .verificationChecks
    .create({to: number, code: code})
    .then(verification_check => {
      if (verification_check.status === "approved") {
        res.status(200);
        res.json({status: "Verification successful."});
      }
      res.status(400);
      res.json({error: "Invalid otp code."});
    })
    .catch((e) => {
      res.status(400);
      res.json({error: "Could not verify otp code."});
    });
});


