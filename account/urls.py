from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('registerUser', views.registerUser, name='registerUser'),
    path('loginUser', views.loginUser, name='loginUser'),
    path('logoutUser', views.logoutUser, name='logoutUser'),
]