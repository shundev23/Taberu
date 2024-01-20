from django.contrib import admin
from django.urls import path, include

from Taberu.views import (TestAPIView, TaberuListView, TaberuDetailView)

app_name = "Taberu"

urlpatterns = [
    path('', TaberuListView.as_view(), name="index"),
    path('<int:pk>', TaberuDetailView.as_view(), name="detail"),
    path('test/', TestAPIView.as_view(), name="test"),
]