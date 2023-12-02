from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    name = models.CharField(null=True, blank =True, max_length=100)
    security_question = models.CharField(null = True, blank = True, max_length=200)
    security_answer = models.CharField(null=True, blank = True, max_length = 100)