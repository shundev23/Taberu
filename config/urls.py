from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from Taberu.views import TestAPIView

from lib.views import IndexTemplateView

urlpatterns = [
    # アプリケーションレベルのエントリーポイント
    path('Taberu/', include("Taberu.urls", namespace="Taberu")),
    path('comment/', include("comment.urls", namespace="comment")),
    path('staffroom/', include("staffroom.urls", namespace="staffroom")),

    # プロジェクトレベルのエントリーポイント
    path('admin/', admin.site.urls),
    path('login', LoginView.as_view(template_name="login.html"), name="login"),
    path('logout', LogoutView.as_view(template_name="logout.html"), name="logout"),

    path('', IndexTemplateView.as_view(), name="index"),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)