from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

from account.views import (
    registration_view,
)

urlpatterns = [
    path('messanger/', include('messanger.urls', 'messanger_api')),
    path('admin/', admin.site.urls),
    path('register', registration_view, name="register"),
    path('login', obtain_auth_token, name="login"),
]
