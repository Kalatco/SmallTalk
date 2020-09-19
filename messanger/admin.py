from django.contrib import admin
from .models import User, Group, Chat, Message

admin.site.register(User)
admin.site.register(Group)
admin.site.register(Chat)
admin.site.register(Message)