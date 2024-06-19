from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from .models import Restaurant

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'

class CustomerSerializer(RegisterSerializer):
    username = None #usernameフィールドを削除する
    
    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['username'] = data['email']
        return data