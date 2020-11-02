from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from messenger.models import Group, Chat, Message, Account
from messenger.serializers import (
    AccountSerializer,
    GroupSerializer,
    ChatSerializer,
    MessageSerializer,
    RegistrationSerializer
)


# ---- MESSAGING ROUTES --- #

@api_view(['GET', ])
@permission_classes([IsAuthenticated, ])
def api_detail_profile(request):
    account = Account.objects.filter(email=request.user).first()
    serializer = AccountSerializer(account)
    return Response(serializer.data)


@api_view(['GET', ])
@permission_classes([IsAuthenticated, ])
def api_all_groups(request):
    try:
        groups = Group.objects.all()
    except Group.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    return_list = []
    for group in groups:
        serializer = GroupSerializer(group)
        return_list.append(serializer.data)
    return Response(return_list)


@api_view(['GET', ])
@permission_classes([IsAuthenticated, ])
def api_detail_chat(request, group_id):

    try:
        chats = Chat.objects.filter(group_id=group_id)
        group = Group.objects.get(pk=group_id)
    except Chat.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Verify user has access to this content
    user = request.user
    if not group.users.all().filter(email=user):
        return Response({'response': 'Invalid access permissions for this content'})

    return_list = []
    for chat in chats:
        serializer = ChatSerializer(chat)
        return_list.append(serializer.data)
    return Response(return_list)


@api_view(['GET', ])
@permission_classes([IsAuthenticated, ])
def api_detail_message(request, chat_id):
    try:
        messages = Message.objects.filter(chat_id=chat_id)
    except Message.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    return_list = []
    for message in messages:

        created_str = message.created.strftime("%b %d %Y %I:%M%p")
        serializer = MessageSerializer(message)
        data = serializer.data
        data['created'] = created_str
        return_list.append(data)
    return Response(return_list)


# --- ACCOUNT ROUTES --- #


@api_view(['POST', ])
@permission_classes([])
def registration_view(request):
    serializer = RegistrationSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        account = serializer.save()
        data['response'] = "new account created"
        data['email'] = account.email
        data['username'] = account.username
        token = Token.objects.get(user=account).key
        data['token'] = token
    else:
        data = serializer.errors
    return Response(data)
