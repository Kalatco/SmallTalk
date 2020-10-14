from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
#import messenger.routing
from django.urls import re_path

from messenger import consumers

websocket_urlpatterns = [
    re_path(r'ws/message/(?P<room_name>\w+)/$', consumers.ChatConsumer),
]

application = ProtocolTypeRouter({
    #'websocket': AuthMiddlewareStack(
    #    URLRouter(
    #        messenger.routing.websocket_urlpatterns
    #    )
    #)
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                websocket_urlpatterns
            )
        )
    )
})
