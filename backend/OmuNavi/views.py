import os
import requests

from decouple import config

from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_GET
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.urls import reverse
from django.http import JsonResponse

from .models import User, Restaurant, Review, Favorite, Menu, Location

from .serializers import UserSerializer, RestaurantSerializer, ReviewSerializer, FavoriteSerializer, MenuSerializer, LocationSerializer, UserRegisterSerializer,PasswordResetSerializer

@require_GET
def search_restaurants(request):
    location = request.GET.get('location', '')
    rating = request.GET.get('rating', '')
    price = request.GET.get('price', '')

    # ここにレストランをフィルタリングするロジックを追加します
    # 仮のデータを使用します
    restaurants = [
        {'name': 'Restaurant 1', 'location': location, 'rating': rating, 'price': price},
        {'name': 'Restaurant 2', 'location': location, 'rating': rating, 'price': price},
    ]
    return JsonResponse({'status': 'OK', 'results': restaurants})

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class FavoriteViewSet(viewsets.ModelViewSet):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer

class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

@method_decorator(ensure_csrf_cookie, name='dispatch')
class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

def register_user(request):
    if request.method == 'POST':
        data = request.data
        user = User.objects.create_user(username=data['username'], password=data['password'], email=data['email'])
        user.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    return Response({'error': 'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class PasswordResetView(generics.GenericAPIView):
    serializer_class = PasswordResetSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = default_token_generator.make_token(user)
        reset_url = request.build_absolute_uri(reverse('password-reset-confirm', kwargs={'uidb64': user.pk, 'token': token}))
        send_mail(
            'Password Reset Request',
            f'Use the following link to reset your password: {reset_url}',
            'noreply@example.com',
            [user.email],
            fail_silently=False,
        )
        return Response({'message': 'Password reset link sent'}, status=status.HTTP_200_OK)

@api_view(['GET','PUT'])
def profile(request):
    if request.method == 'GET':
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)