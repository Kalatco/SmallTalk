from rest_framework.authtoken.models import Token
from urllib.parse import parse_qs
from channels.db import database_sync_to_async


@database_sync_to_async
def get_token(token_key):
    try:
        return Token.objects.get(key=token_key).user
    except Token.DoesNotExist:
        return None


class TokenAuthMiddleware:

    def __init__(self, inner):
        # Store the ASGI application we were passed
        self.inner = inner

    def __call__(self, scope):
        return TokenAuthMiddlewareInstance(scope, self)


class TokenAuthMiddlewareInstance:

    def __init__(self, scope, middleware):
        self.middleware = middleware
        self.scope = dict(scope)
        self.inner = self.middleware.inner

    async def __call__(self, receive, send):
        params = parse_qs(self.scope['query_string'].decode('utf8'))
        token_key = params.get('token')[0]

        if token_key:
            self.scope['user'] = await get_token(token_key)

        # Instantiate our inner application
        inner = self.inner(self.scope)

        return await inner(receive, send)
