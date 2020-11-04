import json
import base64
import os, random, string
from django.core.files.base import ContentFile
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from asgiref.sync import sync_to_async, async_to_sync
from datetime import datetime
from messenger.models import Message, Chat


class ChatConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        self.user_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = self.user_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    @sync_to_async
    def receive(self, text_data):
        data = json.loads(text_data)
        chat_obj = Chat.objects.get(pk=data['chat'])
        sender = chat_obj.group.users.all().filter(username=self.user_name)

        print(f"message recieved by {self.user_name}, msg: {data['message']}")


        if chat_obj and sender:
            sender = sender[0]
            datetimeObj = datetime.now()
            created_time = datetimeObj.strftime("%b %d %Y %I:%M%p")

            # Save message to database
            message_obj = Message()
            # sender is in list format, get first sender
            message_obj.sender = sender
            message_obj.chat = chat_obj 
            message_obj.text = data['message']
            if 'image' in data:

                # Generate a unique file name
                chars = string.ascii_letters + string.digits + '!@#$%^&*()'
                random.seed = (os.urandom(1024))
                filename = ''.join(random.choice(chars) for i in range(23))

                # Save to message object
                message_obj.image = base64_file(data=data['image'], name=filename)
            message_obj.save()

            # Emit message to online users
            for user in chat_obj.group.users.all():
                async_to_sync(self.send_user_message)(user.username, message_obj, created_time)


    async def send_user_message(self, username, message_obj, created_time):

        print(f"sending message to: {username}")
        await self.channel_layer.group_send(
            f"{username}",
            {
                'type': 'user_message',
                'message': message_obj.text,
                'created': created_time,
                'username': message_obj.sender.username,
                'sender_id': message_obj.sender.id,
                'chat_room': message_obj.chat.name,
                'chat_id': message_obj.chat.id,
                'image': message_obj.image.url if message_obj.image else None,
            }
        )

    async def user_message(self, event):
        message = event['message']
        created = event['created']
        username = event['username']
        chat_room = event['chat_room']
        chat_id = event['chat_id']
        sender_id = event['sender_id']
        image = event['image']

        await self.send(text_data=json.dumps({
            'text': message,
            'created': created,
            'sender': {
                'username': username,
                'id': sender_id,
            },
            'chat': {
                'name': chat_room,
                'id': chat_id
            },
            'image': image
        }))


# Convert the user inputted base64 text to object
def base64_file(data, name=None):
    _format, _img_str = data.split(';base64,')
    _name, ext = _format.split('/')
    if not name:
        name = _name.split(":")[-1]
    return ContentFile(base64.b64decode(_img_str), name='{}.{}'.format(name, ext))
