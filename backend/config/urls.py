from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from Taberu.views import TaberuListView
from django.views.generic import TemplateView

from lib.views import IndexTemplateView,IndexAPIView

urlpatterns = [
    path('/backend/Taberu/', include("Taberu.urls", namespace="Taberu")),
    path('/backend/comment/', include("comment.urls", namespace="comment")),
    path('/backend/staffroom/', include("staffroom.urls", namespace="staffroom")),

    path('admin/', admin.site.urls),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
    path('login', LoginView.as_view(template_name="login.html"), name="login"),
    path('logout', LogoutView.as_view(template_name="logout.html"), name="logout"),

    # path('', IndexTemplateView.as_view(), name="index"),
    path('',IndexAPIView.as_view(), name="index"),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)