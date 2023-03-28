from django.shortcuts import render, redirect
from django.http import HttpResponse

# Create your views here.
def registerRestaurant(request):
    return render(request, 'registerRestaurant.html')