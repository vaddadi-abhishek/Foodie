from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import EmailTokenObtainPairSerializer
from .views import register_user, profile_view, logout_user

class EmailLoginView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


urlpatterns = [
    path("register/", register_user, name="register"),
    path("login/", EmailLoginView.as_view(), name="login"),
    path("logout/", logout_user, name="logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("profile/", profile_view, name="profile"),
]
