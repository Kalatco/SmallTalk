from django.urls import path
from messenger.views import (
    api_all_groups,
    api_detail_chat,
    api_detail_message,
    api_detail_profile,
    api_test_connection,
)

app_name = 'message'

urlpatterns = [
    path('ping', api_test_connection),
    path('user', api_detail_profile, name="user"),
    path('groups', api_all_groups, name="groups"),
    path('chats/<int:group_id>', api_detail_chat, name="chats"),
    path('messages/<int:chat_id>', api_detail_message, name="messages"),
]
