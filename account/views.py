from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from account.forms import RegistrationForm, AccountAuthenticationForm
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from jose import jws
import datetime
import json

def registration_view(request):
    if request.POST:
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()

            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            account = authenticate(email=email, password=raw_password)
            login(request, account)
            return JsonResponse({ 'message': 'account created!' })
        return JsonResponse({ 'message': 'Invalid input' })
    return JsonResponse({ 'message', 'request type not supported, must be POST'})


def login_view(request):
    user = request.user
    next = request.GET.get('next')

    if user.is_authenticated:
        if next:
            return redirect(next)
        return JsonResponse({ 'message': 'logged in already' })
    
    elif request.POST:
        form = AccountAuthenticationForm(request.POST)

        if form.is_valid():
            email = request.POST['email']
            password = request.POST['password']
            user = authenticate(email=email, password=password)

            if user:
                login(request, user)

                if next:
                    return redirect(next)
                    return JsonResponse({ 'message': 'logged in!' })
        return JsonResponse({ 'message': 'Invalid input' })
    else:
        return JsonResponse({ 'message': 'not logged in' })


@login_required
def logout_view(request):
    logout(request)
    return JsonResponse({ 'message': 'logged out' })


def create_jwt(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data['email']
        password = data['password']
        user = authenticate(username=email, password=password)
        expiry = datetime.date.today() + datetime.timedelta(days=50)
        token = jws.sign({'username': user.username, 'expiry': expiry}, 'seKre8',  algorithm='HS256')
        return HttpResponse(token)
