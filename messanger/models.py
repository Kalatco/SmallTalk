from django.db import models


class Group(models.Model):
    admin = models.ForeignKey('account.Account', on_delete=models.CASCADE)
    participants = models.ManyToManyField('account.Account', related_name='chats')
    name = models.TextField(max_length=25)
    created = models.DateTimeField(auto_now_add=True)

class Chat(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    name = models.TextField(max_length=25)
    created = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    sender = models.ForeignKey('account.Account', on_delete=models.CASCADE)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField(max_length=500)
