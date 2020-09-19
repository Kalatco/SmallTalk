from django.db import models

class User(models.Model):
    username = models.TextField(max_length=15)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)

class Group(models.Model):
    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    participants = models.ManyToManyField(User, related_name='chats')
    name = models.TextField(max_length=25)
    created = models.DateTimeField(auto_now_add=True)

class Chat(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    name = models.TextField(max_length=25)
    created = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    created = models.DateTimeField(auto_now_add=True)
    text = models.TextField(max_length=500)
