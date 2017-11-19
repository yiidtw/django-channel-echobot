import json
from channels import Channel
from channels.sessions import enforce_ordering

@enforce_ordering
def ws_connect(message):
    message.reply_channel.send({"accept": True})

@enforce_ordering
def ws_receive(message):
    message.reply_channel.send({"text": message.content["text"]})

@enforce_ordering
def ws_disconnect(message):
    pass

def ws_message(message):
    message.reply_channel.send({"text": message.content["text"]})
