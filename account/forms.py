from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate
from account.models import Account

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(max_length=60, help_text="Required. Add a valid email address")
    
    class Meta:
        model = Account
        fields = ("email", "username", "first_name", "last_name", "password1", "password2")


class AccountAuthenticationForm(forms.ModelForm):
    password = forms.CharField(label='password', widget=forms.PasswordInput)

    class Meta:
        model = Account
        fields = ('email', 'password')
    
    def clean(self):
        if self.is_valid():
            email = self.cleaned_data['email']
            password = self.cleaned_data['password']

            if not authenticate(email=email, password=password):
                raise forms.ValidationError("Invalid login")