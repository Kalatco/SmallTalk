from django.urls import path
from messenger.views import (
    api_all_groups,
    api_detail_chat,
    api_detail_message,
    api_detail_profile,
    api_update_settings,
    api_test_connection,
    api_add_user,
    api_leave_group,
    api_admin_remove_user,
    api_create_group
)

app_name = 'message'

urlpatterns = [
    path('ping', api_test_connection),
    path('user', api_detail_profile, name="user"),
    path('user/update', api_update_settings, name="update_user"),
    path('groups', api_all_groups, name="groups"),
    path('groups/create', api_create_group, name="groups"),
    path('groups/<int:group_id>/add', api_add_user, name="group_add"),
    path('groups/<int:group_id>/leave', api_leave_group, name="group_leave"),
    path('groups/<int:group_id>/remove/<int:user_id>', api_admin_remove_user, name="group_admin_remove"),
    path('chats/<int:group_id>', api_detail_chat, name="chats"),
    path('messages/<int:chat_id>', api_detail_message, name="messages"),
]
