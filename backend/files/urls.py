from django.urls import path
from .views import FileList, FileDetail

urlpatterns = [
    path("<int:pk>/", FileDetail.as_view(), name="file_detail"),
    path("", FileList.as_view(), name="file_list"),
]
