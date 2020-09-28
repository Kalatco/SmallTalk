from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from messanger.models import Group, Chat, Message
from messanger.serializers import GroupSerializer, ChatSerializer, MessageSerializer

@api_view(['GET'])
def api_detail_group(request):
    try:
        groups = Group.objects.all()
    except Group.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    return_list = []
    for group in groups:
        serializer = GroupSerializer(group)
        return_list.append(serializer.data)
    return Response(return_list)

@api_view(['GET'])
def api_detail_chat(request, group_id):
    try:
        chats = Chat.objects.filter(group_id=group_id)
    except Chat.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    return_list = []
    for chat in chats:
        serializer = ChatSerializer(chat)
        return_list.append(serializer.data)
    return Response(return_list)

@api_view(['GET'])
def api_detail_message(request, chat_id):
    try:
        messages = Message.objects.filter(chat_id=chat_id)
    except Message.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    return_list = []
    for message in messages:
        serializer = MessageSerializer(message)
        return_list.append(serializer.data)
    return Response(return_list)
