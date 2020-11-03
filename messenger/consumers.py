import json
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

            # Emit message to online users
            for user in chat_obj.group.users.all():
                async_to_sync(self.send_user_message)(user.username, sender.id, data['message'], created_time, chat_obj.name, chat_obj.pk)

            # Save message to database
            message_obj = Message()
            # sender is in list format, get first sender
            message_obj.sender = sender
            message_obj.chat = chat_obj 
            message_obj.text = data['message']
            message_obj.save()


    async def send_user_message(self, username, sender_id, message, created_time, chat_room, chat_id):

        print(f"sending message to: {username}")
        await self.channel_layer.group_send(
            f"{username}",
            {
                'type': 'user_message',
                'message': message,
                'created': created_time,
                'username': self.user_name,
                'sender_id': sender_id,
                'chat_room': chat_room,
                'chat_id': chat_id,
            }
        )

    async def user_message(self, event):
        message = event['message']
        created = event['created']
        username = event['username']
        chat_room = event['chat_room']
        chat_id = event['chat_id']
        sender_id = event['sender_id']

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
            }
        }))
