from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.authtoken.views import obtain_auth_token

from messenger.views import registration_view

urlpatterns = [
    path('api/', include('messenger.urls', 'messenger_api')),
    path('admin/', admin.site.urls),
    path('register', registration_view, name="register"),
    path('login', obtain_auth_token, name="login"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
