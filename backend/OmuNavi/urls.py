# backend/your_app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, RestaurantViewSet, ReviewViewSet, FavoriteViewSet, MenuViewSet, LocationViewSet

app_name = 'OmuNavi'  # 名前空間を一意にする

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'restaurants', RestaurantViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'favorites', FavoriteViewSet)
router.register(r'menus', MenuViewSet)
router.register(r'locations', LocationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]