from rest_framework import serializers
from .models import File


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
        "id",
        "author",
        "title",
        "is_file",
        "directory",
        "file",
        "created_at",
        )
        model = File