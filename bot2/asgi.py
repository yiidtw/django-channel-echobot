import os
import channels.asgi

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "bot2.settings")
channel_layer = channels.asgi.get_channel_layer()
