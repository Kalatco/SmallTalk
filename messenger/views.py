import json

from django.db import IntegrityError
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

@api_view(['PUT',])
@permission_classes([IsAuthenticated,])
def api_update_settings(request):
    # Verify user has access to this content
    user = request.user
    if not user:
        return Response({'response': 'Invalid access permissions for this content'})

    data = request.data
    if "old_password" in data and user.check_password(data["old_password"]):
        if "new_password" in data and "new_password2" in data and data["new_password"]==data["new_password2"]:
            user.set_password(data["new_password"])
            # print("Password was changed")
        elif "new_password" in data and "new_password2" in data:
            # print(data["new_password"] + " and " + data["new_password2"] + " do not match")
            return Response({"message":"new passwords don't match"}, status=status.HTTP_400_BAD_REQUEST)
        if "username" in data and data["username"] != user.username:
            user.username = data["username"]
            # print("Username Changed to " + user.username)
        if "first_name" in data:
            user.first_name = data["first_name"]
            # print("First name Changed to " + user.first_name)
        if "last_name" in data:
            user.last_name = data["last_name"]
            # print("Last name Changed to " + user.last_name)
        try:
            user.save()
        except IntegrityError:
            # print("User with this username already exists: " + data["username"])
            return Response({"User with this username already exists. No Account changes made."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = AccountSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT',])
@permission_classes([IsAuthenticated,])
def api_add_user(request, group_id, user_id):
    # Verify user has access to this content
    user = request.user
    if not user:
        return Response({'response': 'Invalid access permissions for this content'})
    
    try:
        new_user = Account.objects.get(id=user_id)
        group = Group.objects.get(pk=group_id)
        #c print("Added user " + new_user.username  + " to the group: " + group.name)
    except Group.DoesNotExist:
        # print("Group does not exist")
        return Response({"Group does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    except Account.DoesNotExist:
        # print ("User does not exist")
        return Response({"User does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    group.users.add(new_user)

    serializer = AccountSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT',])
@permission_classes([IsAuthenticated,])
def api_leave_group(request, group_id):
    # Verify user has access to this content
    user = request.user
    if not user:
        return Response({'response': 'Invalid access permissions for this content'})

    old_group = Group.objects.get(pk=group_id)
    old_group.users.remove(user)
    # print("Removed from group: " + old_group.name)
    
    serializer = AccountSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT',])
@permission_classes([IsAuthenticated,])
def api_admin_remove_user(request, group_id, user_id):
    # Verify user has access to this content
    user = request.user
    if not user:
        return Response({'response': 'Invalid access permissions for this content'})
        
    edit_group = Group.objects.get(pk=group_id)
    if (edit_group.admin==user):
        all_users = edit_group.users.all()
        # print(all_users)
        found_user = False
        for curr_user in all_users:
            # print(str(curr_user.pk) + " : " + curr_user.username)
            if(curr_user.pk == user_id):
                edit_group.users.remove(curr_user)
                print("User removed: " + curr_user.username)
                found_user = True
        if found_user == False:
            print("Could not find user")
    else:
        # print("User is not admin in this group")
        return Response({"User is not admin in this group"}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = AccountSerializer(user)
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
