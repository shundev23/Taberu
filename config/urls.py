from django.contrib import admin
from django.urls import path, include

from lib.views import IndexTemplateView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('taberu/', include("Taberu.urls")),
    
    path('', IndexTemplateView.as_view(), name="index"),
]
