# accounts/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = [
        "email",
        "username",
        "name", "security_question", "security_answer",
        "is_staff",
    ]
    fieldsets = UserAdmin.fieldsets + ((None, {"fields": ("name", "security_question", "security_answer",)}),)
    add_fieldsets = UserAdmin.add_fieldsets + ((None, {"fields": ("name", "security_question", "security_answer",)}),)


admin.site.register(CustomUser, CustomUserAdmin)

