from rest_framework import serializers
from account.models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class LessInfoAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['username']
