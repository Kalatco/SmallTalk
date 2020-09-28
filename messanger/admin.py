from django.contrib import admin
from messanger.models import Group, Chat, Message

admin.site.register(Group)
admin.site.register(Chat)
admin.site.register(Message)