from django.urls import path

from staffroom.views import(
    TaberuCreateView, TaberuDeleteView, TaberuUpdateView
)

app_name = "Taberu"

urlpatterns = [
    path('create', TaberuCreateView.as_view(), name="create"),
    path('<int:pk>/update', TaberuUpdateView.as_view(), name="update"),
    path('<int:pk>/delete', TaberuDeleteView.as_view(), name="delete"),     
]

