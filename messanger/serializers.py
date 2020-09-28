from rest_framework import serializers
from messanger.models import Group, Chat, Message
from account.serializers import LessInfoAccountSerializer

class GroupSerializer(serializers.ModelSerializer):
    participants = LessInfoAccountSerializer(read_only=True, many=True)

    class Meta:
        model = Group
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(GroupSerializer, self).to_representation(instance)
        rep['admin'] = LessInfoAccountSerializer(instance.admin).data
        return rep

class LessInfoGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = ['id','name']

class ChatSerializer(serializers.ModelSerializer):
    group = LessInfoGroupSerializer(read_only=True)

    class Meta:
        model = Chat
        fields = '__all__'

class LessInfoChatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        fields = ['id', 'name']

class MessageSerializer(serializers.ModelSerializer):
    chat = LessInfoChatSerializer(read_only=True)
    sender = LessInfoAccountSerializer(read_only=True)

    class Meta:
        model = Message
        fields = '__all__'
