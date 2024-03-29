import json

from django.db import IntegrityError
from django.utils import timezone
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

def convert_to_localtime(utctime):
    localtz = timezone.localtime(utctime)
    return localtz.strftime("%b %d %Y %I:%M%p")

@api_view(['GET', ])
@permission_classes([IsAuthenticated, ])
def api_detail_message(request, chat_id):
    try:
        messages = Message.objects.filter(chat_id=chat_id)
    except Message.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    return_list = []
    for message in messages:
        created_str = convert_to_localtime(message.created)
        serializer = MessageSerializer(message)
        data = serializer.data
        data['created'] = created_str
        return_list.append(data)
    return Response(return_list)

@api_view(['PUT',])
@permission_classes([IsAuthenticated,])
def api_update_settings(request):
    # Verify user has access to this content
    user = request.user
    if not user:
        return Response({"response": "Invalid access permissions for this content"}, status=status.HTTP_400_BAD_REQUEST)

    data = request.data
    if "old_password" in data and user.check_password(data["old_password"]):
        if "new_password" in data and "new_password2" in data and data["new_password"]==data["new_password2"]:
            user.set_password(data["new_password"])
        elif "new_password" in data and "new_password2" in data:
            return Response({"message":"new passwords don't match"}, status=status.HTTP_400_BAD_REQUEST)
        if "username" in data and data["username"] != user.username:
            user.username = data["username"]
        if "first_name" in data:
            user.first_name = data["first_name"]
        if "last_name" in data:
            user.last_name = data["last_name"]
        try:
            user.save()
        except IntegrityError:
            return Response({"response":"User with this username already exists. No Account changes made."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = AccountSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response({"response":"No password or incorrect password entered."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT',])
@permission_classes([IsAuthenticated,])
def api_add_user(request, group_id):
    # Verify user has access to this content
    user = request.user
    if not user:
        return Response({"response": "Invalid access permissions for this content"}, status=status.HTTP_400_BAD_REQUEST)
    
    data = request.data
    try:
        if("new_user") in data:
            new_user = Account.objects.get(username=data["new_user"])
        group = Group.objects.get(pk=group_id)
    except Group.DoesNotExist:
        return Response({"response": "Group does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    except Account.DoesNotExist:
        return Response({"response": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    group.users.add(new_user)

    serializer = AccountSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT',])
@permission_classes([IsAuthenticated,])
def api_leave_group(request, group_id):
    # Verify user has access to this content
    user = request.user
    if not user:
        return Response({"response": "Invalid access permissions for this content"}, status=status.HTTP_400_BAD_REQUEST)

    old_group = Group.objects.get(pk=group_id)
    old_group.users.remove(user)
    
    serializer = AccountSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT',])
@permission_classes([IsAuthenticated,])
def api_admin_remove_user(request, group_id, user_id):
    # Verify user has access to this content
    user = request.user
    if not user:
        return Response({"response": "Invalid access permissions for this content"}, status=status.HTTP_400_BAD_REQUEST)
        
    edit_group = Group.objects.get(pk=group_id)
    if (edit_group.admin==user):
        all_users = edit_group.users.all()
        found_user = False
        for curr_user in all_users:
            if(curr_user.pk == user_id):
                edit_group.users.remove(curr_user)
                found_user = True
        if found_user == False:
            return Response({"response": "User is not in the group"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"response": "User is not admin in this group"}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = AccountSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT',])
@permission_classes([IsAuthenticated,])
def api_create_group(request):
    # Verify user has access to this content
    user = request.user
    if not user:
        return Response({"response": "Invalid access permissions for this content"}, status=status.HTTP_400_BAD_REQUEST)

    data = request.data

    if "group_name" in data and len(data["group_name"]) > 0:
        new_group = Group(name=data["group_name"], admin=user)
        new_group.save()
        new_group.users.add(user)
    else:
        return Response({"response": "No group name entered"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = GroupSerializer(new_group)
    return Response(serializer.data, status=status.HTTP_200_OK)
        
@api_view(['PUT',])
@permission_classes([IsAuthenticated,])
def api_add_chat(request, group_id):
    # Verify user has access to this content
    user = request.user
    if not user:
        return Response({"response": "Invalid access permissions for this content"}, status=status.HTTP_400_BAD_REQUEST)

    data = request.data

    edit_group = Group.objects.get(pk=group_id)

    if "chat_name" in data and len(data["chat_name"]) > 0:
        new_chat = Chat(name=data["chat_name"], group=edit_group)
        new_chat.save()
    else:
        return Response({"response": "No chat name entered"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = GroupSerializer(edit_group)
    return Response(serializer.data, status=status.HTTP_200_OK)

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


# --- TEST CONNECTION --- #

@api_view(['GET',])
def api_test_connection(request):
    return Response(status=status.HTTP_200_OK)
