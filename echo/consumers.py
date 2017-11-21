import json
from channels import Channel
from channels.sessions import enforce_ordering

@enforce_ordering
def ws_connect(message):
    message.reply_channel.send({"accept": True})

@enforce_ordering
def ws_receive(message):

    # message.content example
    # {'text': '{"text":"hi"}', 'reply_channel': 'daphne.response.HArgXfoOKA!xDgRlCkvaB', 
    # 'path': '/chat', 'order': 2}
    
    # message.content['text'] is str type
    # payload is dict type object
    # payload should be the input of NLP
    payload = json.loads(message['text'])

    ## first send back what USER says
    incoming_msg = {
        'text': payload['text'],
        'type': 'text',
        'source': 'USER'
    }
    
    message.reply_channel.send({
        'text': json.dumps(incoming_msg)
    })

    ## then send back response of BOT
    response_msg = {
        'text': payload['text'],
        'type': 'text',
        'source': 'BOT'
    }

    message.reply_channel.send({
        'text': json.dumps(response_msg)
    })


@enforce_ordering
def ws_disconnect(message):
    pass
