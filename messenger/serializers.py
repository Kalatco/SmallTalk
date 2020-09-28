from rest_framework import serializers
from messenger.models import Group, Chat, Message, Account

# --- ACCOUNT SERIALIZERS --- #

class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Account
        fields = ['email', 'username', 'password', 'password2', 'first_name', 'last_name']
        extra_kwargs = {
            'password': { 'write_only': True }
        }
    
    def save(self):
        account = Account(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({ 'password': 'Passwords must match' })
        account.set_password(password)
        account.save()
        return account

class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = '__all__'

class LessInfoAccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ['username']


# --- MESSAGING SERIALIZERS --- #


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
