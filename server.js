const express = require('express'); //Line 1
const cors = require('cors');
const twilio = require('twilio');

const ASSEMBLYAI_TOKEN='eb277c7378e8460dbcdb70e68bb7b989';
const TWILIO_ACCOUNT_SID='ACe42a47d602608adc21c04767b25fffe4'; //ACaf86dd1358a36f7504a95cf86b1e0c4b
const TWILIO_AUTH_TOKEN='589840ee10f2a829e578ae2f8d11506f'; //94720af290f8797ab69a1e0c6ee1bf8b
const PHONE_VER_ACCOUNT_ID='VAf80d6b5eadf50b777e9f9f778167141f'; //VA85390e62457dca2b0682d525230ad219

const TOKEN_PRIVATE_KEY='freeShirt.exe';

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const app = express(); //Line 2

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000; //Line 3

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.post('/send_code', (req, res) => {
  const number = req.body.number;

  client.verify.services(PHONE_VER_ACCOUNT_ID)
    .verifications
    .create({to: number, channel: 'sms'})
    .then((verification) => {
      res.status(200);
      res.json({msg: "Verification code sent."});
    })
    .catch((e)=>{
      res.status(400);
      res.json({error: "Could not send verification code."});
    });
});

app.post('/verify_otp', (req, res) => {
  const {number, code} = req.body;
  client.verify.services(PHONE_VER_ACCOUNT_ID)
    .verificationChecks
    .create({to: number, code: code})
    .then(verification_check => {
      if (verification_check.status === "approved"){
        res.status(200);
        res.json({status: "Verification successful."});
      }
      res.status(400);
      res.json({error: "Invalid otp code."});
    })
    .catch((e)=>{
      res.status(400);
      res.json({error: "Could not verify otp code."});
    });
});


