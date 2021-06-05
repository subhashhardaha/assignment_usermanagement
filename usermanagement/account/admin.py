from django.contrib import admin
from .models import Account,AccountRole,Role


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ("user_name", "last_name","get_role")

    def get_role(self, obj):
        return "\n".join([p.role_name for p in obj.role.all()])

@admin.register(AccountRole)
class AccountRoleAdmin(admin.ModelAdmin):
    list_display = ("role_name", "description")

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("name",)

# Register your models here.
# admin.site.register(Account)
# admin.site.register(AccountRole)
# admin.site.register(Role)

