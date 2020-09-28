from django.http import HttpResponse
from .models import Group, Chat, Message
from django.core import serializers
from django.contrib.auth.decorators import login_required

#def users(request):
#    users = User.objects.all()
#    user_list = serializers.serialize('json', users)
#    return HttpResponse(user_list, content_type="text/json-comment-filtered")

#def groups(request):
#    groups = User.objects.all()
#    groups_list = serializers.serialize('json', groups)
#    return HttpResponse(groups_list, content_type="text/json-comment-filtered")

@login_required
def chats(request, group_id):
    chats = Chat.objects.filter(group_id=group_id)
    chats_list = serializers.serialize('json', chats)
    return HttpResponse(chats_list, content_type="text/json-comment-filtered")

@login_required
def messages(request, chat_id):
    messages = Message.objects.filter(chat_id=chat_id)
    messages_list = serializers.serialize('json', messages)
    return HttpResponse(messages_list, content_type="text/json-comment-filtered")
