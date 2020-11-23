from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path
from .channelsMiddleware import TokenAuthMiddleware
from messenger import consumers


application = ProtocolTypeRouter({
    'websocket': TokenAuthMiddleware(
        URLRouter([
            re_path(r'ws/client', consumers.ChatConsumer),
        ])
    ),
})
