from django.urls import path
from Taberu.views import (TaberuListView, TaberuCreateView, 
                          TaberuDetailView, TaberuUpdateView, TaberuDeleteView)

app_name = "taberu"

urlpatterns = [
    path('', TaberuListView.as_view(), name="index"),
    path('create', TaberuCreateView.as_view(), name="create"),

    path('<int:pk>/update', 
         TaberuUpdateView.as_view(), name="update"),
    
    path('<int:pk>/delete', 
         TaberuDeleteView.as_view(), name="delete"),
    

    path('<int:pk>', TaberuDetailView.as_view(), name="detail"),
]
