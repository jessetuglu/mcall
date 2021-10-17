import subprocess
import os
from dotenv import load_dotenv
import dotenv
from twilio.rest import Client
import requests
from requests.auth import HTTPBasicAuth
import time

def get_recording_sid(account_sid_,auth_token_,call_sid_):
    '''
    Parameter:
    account_sid: Twilio Account SID,
    auth_token: Twilio API Key/Auth Token
    call_sid_: Call Sid
    Return:
    recording.sid: The sid of the recording
    '''
    url = f"https://api.twilio.com/2010-04-01/Accounts/{account_sid_}"\
    + f'/Calls/{call_sid_}/Recordings.json'
    result = requests.get(url , auth = HTTPBasicAuth(account_sid_,     auth_token_))
    recordings  = result.json()
    # Since our call has a single recording, we just need to access the first               
    # element in the list of recordings. If a call has multiple recordings     
    #  associated with it, this list will contain the SIDs of all the      
    #  recordings.
    while(len(recordings['recordings']) < 1):
        print("Waiting on call to finish...")
        time.sleep(5)
        result = requests.get(url , auth = HTTPBasicAuth(account_sid_,     auth_token_))
        recordings  = result.json()

    recording_sid = recordings['recordings'][0]['sid']
    return recording_sid


if __name__ == "__main__":
    os.system("python3 call.py")

    dotenv_file = dotenv.find_dotenv()
    load_dotenv()
    account_sid = os.getenv('account_sid')
    auth_token = os.getenv('auth_token')
    call_sid = os.getenv('call_sid')

    recording_sid1 = get_recording_sid(account_sid, auth_token, call_sid)
    print(f"Call Sid: {call_sid}")
    print(f"Recording Sid: {recording_sid1}")
    dotenv.set_key(dotenv_file, "recording_sid", recording_sid1)

    os.system("python3 transcribe.py " + recording_sid1)
