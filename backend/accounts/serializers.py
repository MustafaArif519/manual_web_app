# serializers.py in the users Django app
from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import CustomUser



class CustomRegisterSerializer(RegisterSerializer):
    security_question = serializers.CharField(max_length=30)
    security_answer = serializers.CharField(max_length=30)


    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.security_question = self.data.get('security_question')
        user.security_answer = self.data.get('security_answer')

        user.save()
        return user

class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = (
            'pk',
            'email',
            "security_answer",
            "security_question",

            "username",
            "is_staff",
        )
        read_only_fields = ('pk', 'email', "username", "is_staff",)