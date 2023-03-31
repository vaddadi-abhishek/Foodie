from django.shortcuts import render, redirect
from django.http import HttpResponse
from account.views import location_details, get_cities

# Create your views here.
def registerRestaurant(request):
    if(request.method=='POST'):
        print('data')
        email = request.POST.get('email')
        full_name = request.POST.get('full_name')
        mobile_num = request.POST.get('mobile_num')

        restaurant_name = request.POST.get('restaurant_name')
        restaurant_address = request.POST.get('restaurant_address')
        restaurant_state = request.POST.get('add_state')
        restaurant_city = request.POST.get('add_city')

        fssai = request.POST.get('fssai')
        eat_house = request.POST.get('eat_house')
        gst = request.POST.get('gst')
        noc_fire = request.POST.get('noc_fire')

        restaurant_images = request.POST.get('restaurant_images')

        data = [email, full_name, mobile_num, restaurant_name, restaurant_address, restaurant_state, restaurant_city, fssai, eat_house, gst, noc_fire, restaurant_images]

        return HttpResponse(data)
    else:
        print('page')
        context = location_details()
        return render(request, 'registerRestaurant.html', context)