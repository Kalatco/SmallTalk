from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from messenger.models import Group, Chat, Message, Account

admin.site.register(Group)
admin.site.register(Chat)
admin.site.register(Message)


class AccountAdmin(UserAdmin):
    list_display = ('email', 'username', 'date_joined', 'last_login', 'is_admin', 'first_name', 'last_name')
    search_fields = ('email', 'username')
    readonly_fields = ('date_joined', 'last_login')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


admin.site.register(Account, AccountAdmin)
