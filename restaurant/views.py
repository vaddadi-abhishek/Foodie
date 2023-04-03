from django.shortcuts import render, redirect
from django.http import HttpResponse
from account.views import location_details, registerUser
from django.contrib import messages
from .models import registerRestaurant, UploadedFile


# Create your views here.
def regRestaurant(request):
    if (request.user.is_authenticated):
        if (request.method == 'POST'):
            mobile_num = request.POST.get('mobile_num')

            restaurant_name = request.POST.get('restaurant_name')
            restaurant_address = request.POST.get('restaurant_address')
            restaurant_state = request.POST.get('add_state')
            restaurant_city = request.POST.get('add_city')

            fssai = request.FILES.get('fssai')
            eat_house = request.FILES.get('eat_house')
            gst = request.FILES.get('gst')
            noc_fire = request.FILES.get('noc_fire')

            restaurant_images = request.FILES.getlist('restaurant_images')

            restaurant = registerRestaurant.objects.create(Mobile_Num=mobile_num, Restaurant_Name=restaurant_name,
                                                           Address=restaurant_address, Located_State=restaurant_state,
                                                           Located_City=restaurant_city, FSSAI_doc=fssai,
                                                           Eat_House=eat_house, GST=gst, NOC=noc_fire)

            # Saving Restaurant Images
            for img in restaurant_images:
                uploaded_file = UploadedFile.objects.create(file=img)
                restaurant.Restaurant_Imgs.add(uploaded_file)

            return render(request, 'index.html')


        else:
            context = location_details()
            return render(request, 'registerRestaurant.html', context)
    else:
        messages.error(request, 'Please Create an Account to register your Restaurant')
        return redirect(registerUser)
