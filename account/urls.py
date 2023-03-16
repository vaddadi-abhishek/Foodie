from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('registerUser', views.registerUser, name='registerUser'),
    path('loginUser', views.loginUser, name='loginUser'),
    path('userProfile', views.userProfile, name='userProfile'),
    path('addAdress', views.addAdress, name='addAdress'),
    path('addressBook/<int:address_id>', views.addressBook, name='addressBook'),
    path('removeAdress/<int:address_id>', views.removeAdress, name='removeAdress'),
    path('get_cities/<int:state_id>/', views.get_cities, name='get_cities'),
    path('user_location', views.user_location, name='user_location'),
    path('logoutUser', views.logoutUser, name='logoutUser'),
]