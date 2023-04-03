from django.urls import path
from restaurant import views

urlpatterns = [
    path('registerRestaurant', views.regRestaurant, name='regRestaurant'),
]