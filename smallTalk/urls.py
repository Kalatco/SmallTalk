from django.contrib import admin
from django.urls import path, include

from account.views import (
    registration_view,
    login_view,
    logout_view,
    create_jwt,
)

urlpatterns = [
    path('messanger/', include('messanger.urls')),
    path('admin/', admin.site.urls),
    path('register', registration_view),
    path('login', login_view),
    path('logout', logout_view),
    path('jwt', create_jwt),
]
