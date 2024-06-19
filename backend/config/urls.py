from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from Taberu.views import TaberuListView, RestaurantViewSet
from Taberu.views import get_csrf_token
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter


from lib.views import IndexTemplateView,IndexAPIView

router = DefaultRouter()
router.register(r'restaurants', RestaurantViewSet)

urlpatterns = [
    path('/backend/Taberu/', include("Taberu.urls", namespace="Taberu")),
    path('/backend/comment/', include("comment.urls", namespace="comment")),
    path('/backend/staffroom/', include("staffroom.urls", namespace="staffroom")),

    path('admin/', admin.site.urls),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/', include('Taberu.urls')),
    path('accounts/', include('allauth.urls')),
    
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
    path('login', LoginView.as_view(template_name="login.html"), name="login"),
    path('logout', LogoutView.as_view(template_name="logout.html"), name="logout"),
    
    path('',IndexAPIView.as_view(), name="index"),
    path(' ', include(router.urls)),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)