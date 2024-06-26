# backend/your_app/urls.py
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserViewSet, RestaurantViewSet, ReviewViewSet, FavoriteViewSet, MenuViewSet, LocationViewSet, UserRegisterView, LogoutView, UserProfileView, PasswordResetView, profile, search_restaurants

app_name = 'OmuNavi'
api_base = 'omunavi/'

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'restaurants', RestaurantViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'favorites', FavoriteViewSet)
router.register(r'menus', MenuViewSet)
router.register(r'locations', LocationViewSet)

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', profile, name='profile'),
    path('restaurants', search_restaurants, name='search_restaurants'),

    path('', include(router.urls)),
    path(f'{api_base}logout/', LogoutView.as_view(), name='logout'),
    path(f'{api_base}profile/', UserProfileView.as_view(), name='profile'),
    path(f'{api_base}password-reset/', PasswordResetView.as_view(), name='password-reset'),
]