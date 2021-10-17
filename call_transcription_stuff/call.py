import os
from dotenv import load_dotenv
import dotenv
from twilio.rest import Client
import requests
from requests.auth import HTTPBasicAuth


def make_phone_call(client_,from_phone_number_,to_phone_number_):
    '''
    Parameter:
    client: A twillio client instance
    Return:
    call.sid: The sid of the outgoing call
    '''
    phone_call = '''<Response>
    <Say>What are you working on?</Say>
    <Pause length="5"/>
    </Response>'''
    call = client_.calls.create(
    record = True,
    twiml=phone_call,
    from_=from_phone_number_,
    to = to_phone_number_
    )   
    return call.sid

if __name__ == '__main__':

    load_dotenv()
    account_sid = os.getenv('account_sid')
    auth_token = os.getenv('auth_token')
    from_phone_number = os.getenv('from_phone_number')
    to_phone_number = os.getenv('to_phone_number')
    client = Client(account_sid, auth_token)
    call_sid = make_phone_call(client, from_phone_number, to_phone_number)
    print(f'Call sid is {call_sid}')
    
    dotenv_file = dotenv.find_dotenv()
    dotenv.set_key(dotenv_file, "call_sid", call_sid)
