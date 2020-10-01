from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

from messenger.views import registration_view

urlpatterns = [
    path('messenger/', include('messenger.urls', 'messenger_api')),
    path('admin/', admin.site.urls),
    path('register', registration_view, name="register"),
    path('login', obtain_auth_token, name="login"),
]
