import subprocess
import os
from dotenv import load_dotenv
import dotenv
from twilio.rest import Client
import requests
from requests.auth import HTTPBasicAuth
import time
import sys

def get_transcribe_id(token,url):
    '''
    Parameter:
    token: The AssemblyAI API key
    url  : Url to uploaded file
    Return Value:
    id   : The transcribe id of the file
    '''
    endpoint = "https://api.assemblyai.com/v2/transcript"
    json = {
    "audio_url": url
    }
    headers = {
    "authorization": token,
    "content-type": "application/json"
    }
    response = requests.post(endpoint, json=json, headers=headers)
    id_ = response.json()['id']
    print("Made request and file is currently queued")
    return id_

def get_text(token,transcribe_id):
    '''
    Parameter:
    token: The AssemblyAI API key
    transcribe_id: The ID of the file which is being
    Return Value:
    result : The response object
    '''
    endpoint = f"https://api.assemblyai.com/v2/transcript/{transcribe_id}"
    headers = {
    "authorization": token
    }
    result = requests.get(endpoint, headers=headers).json()
    return result

if __name__ == "__main__":
    time.sleep(5)
    load_dotenv()
    account_sid = os.environ.get('account_sid')
    auth_token = os.environ.get('auth_token')
    call_sid = os.environ.get('call_sid')
    assemblyai_token = os.environ.get('assemblyai_token')
    recording_sid = sys.argv[1]

    print(f"Recording Sid: {recording_sid}")
    recording_endpoint = 'https://api.twilio.com/2010-04-01/Accounts/' + f'{account_sid}/Recordings/{recording_sid}.mp3'
    print(recording_endpoint)
    result = {}
    print("AssemblyAI is processing the file")
    transcribe_id = get_transcribe_id(assemblyai_token,recording_endpoint)
    print(f"Transcription ID is {transcribe_id}")
    while result.get("status") != 'completed' and result.get("status") != 'error':
        time.sleep(2)
        result = get_text(assemblyai_token,transcribe_id)
        print("Transcription Complete - The result is below")
        print(result['text'])

