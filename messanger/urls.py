from django.urls import path
from . import views

urlpatterns = [
    #path('users', views.users, name='users'),
    #path('groups', views.groups, name='groups'),
    path('chats/<int:group_id>', views.chats, name='chats'),
    path('messages/<int:chat_id>', views.messages, name='messages'),
]