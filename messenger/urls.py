from django.urls import path
from messenger.views import (
    api_all_groups,
    api_detail_chat,
    api_detail_message,
    api_detail_profile,
    api_update_settings,
    api_test_connection,
    api_group_modify
)

app_name = 'message'

urlpatterns = [
    path('ping', api_test_connection),
    path('user', api_detail_profile, name="user"),
    path('user/update', api_update_settings, name="update_user"),
    path('groups/update', api_group_modify, name="group_modify"),
    path('groups', api_all_groups, name="groups"),
    path('chats/<int:group_id>', api_detail_chat, name="chats"),
    path('messages/<int:chat_id>', api_detail_message, name="messages"),
]
