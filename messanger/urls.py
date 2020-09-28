from django.urls import path
from messanger.views import api_detail_group, api_detail_chat, api_detail_message

app_name = 'message'

urlpatterns = [
    path('groups', api_detail_group, name="groups"),
    path('chats/<int:group_id>', api_detail_chat, name="chats"),
    path('messages/<int:chat_id>', api_detail_message, name="messages"),
]
