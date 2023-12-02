from django.db import models
from django.conf import settings

class File(models.Model):
    title = models.CharField(max_length=50)
    is_file = models.BooleanField(default=False)  # Change to BooleanField
    directory = models.CharField(max_length=50)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    file = models.FileField(upload_to="files/")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
