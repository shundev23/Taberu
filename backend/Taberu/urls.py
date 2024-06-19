from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import get_csrf_token, RestaurantViewSet
from Taberu.views import (TaberuListView, TaberuDetailView)

app_name = "Taberu"

router = DefaultRouter()
router.register(r'restaurants', RestaurantViewSet)

urlpatterns = [
    path(' ', include(router.urls)),
    path('', TaberuListView.as_view(), name="index"),
    path('<int:pk>', TaberuDetailView.as_view(), name="detail"),
    path('get-csrf-token/', get_csrf_token, name='get-csrf-token'),
]