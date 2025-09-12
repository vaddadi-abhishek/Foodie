from django.urls import path
from .views import register_user
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import EmailTokenObtainPairSerializer


class EmailLoginView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer



urlpatterns = [
    path("register/", register_user, name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
