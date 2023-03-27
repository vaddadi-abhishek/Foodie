from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.models import auth
from account.models import State, City, Address
from django.http import JsonResponse
from django.http import HttpResponse
from django.urls import reverse
import requests


# Create your views here.
# Getting User Location
def user_location():
    try:
        response = requests.get('https://ipinfo.io/json')
        location_data = response.json()
        return location_data
    except Exception as e:
        print(e)
        return None

def location_details():
    location = user_location()
    states = State.objects.all()
    cities = City.objects.all()

    stateId = State.objects.filter(name=location['region']).values('id')[0]['id']
    city = City.objects.filter(state_id=stateId).values('name')
    city_list = list(city)

    context = {'states': states, 'cities': cities, 'city_list': city_list, 'location': location}

    return context

# Home Page
def index(request):
    context = location_details()
    if not context['location']['city']:
        return render(request, 'index.html', context)
    else:
        return redirect(reverse('home', args=[context['location']['region'],context['location']['city']]))

# home
def home(request, state, city):
    context = location_details()
    return render(request, 'index.html', context)

# Register User
def registerUser(request):
    if (request.user.is_authenticated):
        return redirect('index')
    elif (request.method == 'POST'):
        full_name = request.POST.get('full_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if (full_name.isspace()):
            messages.info(request, 'Full Name should not be empty')
            return redirect('registerUser')
        elif (len(full_name) < 6):
            messages.info(request, 'Full Name should not be less than 6 character long')
            return redirect('registerUser')
        elif (password.isspace() or (' ' in password) == True):
            messages.info(request, 'password should not contain any spaces')
            return redirect('registerUser')
        elif (len(password) < 8):
            messages.info(request, 'Password should be min 8 characters long')
            return redirect('registerUser')
        elif (password != confirm_password):
            messages.info(request, 'Password and Confirm password must be same')
            return redirect('registerUser')
        else:
            User = get_user_model()
            user = User.objects.create_user(full_name=full_name, gender='None', email=email, password=password)
            user.save()
            print('User Created')
            auth.login(request, user)
            return redirect('index')
    else:
        return render(request, 'register.html')


# Login User
def loginUser(request):
    if (request.user.is_authenticated):
        return redirect('index')

    elif (request.method == 'POST'):
        email = request.POST.get('email')
        password = request.POST.get('password')
        # data = [email, password]
        # return HttpResponse(data)

        # User = get_user_model()
        user = auth.authenticate(email=email, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('index')
        else:
            messages.info(request, 'Invalid Username or Password')
            return redirect('loginUser')
    else:
        return render(request, 'login.html')


# Logout User
def logoutUser(request):
    auth.logout(request)
    return redirect('index')


# User Profile
def userProfile(request):
    if (request.user.is_authenticated == False):
        return redirect('index')
    elif (request.method == 'POST'):
        full_name = request.POST.get('full_name')
        gender = request.POST.get('gender')

        if (full_name != request.user.full_name and gender != request.user.gender):
            if (len(full_name) < 6):
                messages.info(request, 'Full Name should be more than 6 characters')
                return redirect(userProfile)
            else:
                User = get_user_model()
                user = User.objects.get(pk=request.user.id)
                user.full_name = full_name
                user.gender = gender
                user.save()
                messages.success(request, 'Fullname and Gender are updated')
                return redirect(userProfile)

        elif (full_name != request.user.full_name and gender == request.user.gender):
            if (len(full_name) < 6):
                messages.info(request, 'Full Name should be more than 6 characters')
                return redirect(userProfile)
            else:
                User = get_user_model()
                user = User.objects.get(pk=request.user.id)
                user.full_name = full_name
                user.save()
                messages.success(request, 'Full Name updated')
                return redirect(userProfile)
        elif (gender != request.user.gender and full_name == request.user.full_name):
            User = get_user_model()
            user = User.objects.get(pk=request.user.id)
            user.gender = gender
            user.save()
            messages.success(request, 'Gender is updated')
            return redirect(userProfile)
        else:
            messages.info(request, 'No changes are made')
            return redirect(userProfile)
    else:
        state_obj = State.objects.all()
        cities_obj = City.objects.all()
        adress_obj = Address.objects.filter(user_id=request.user.id)

        states = {'states': state_obj}
        cities = {'cities': cities_obj}
        address = {'address': adress_obj}

        context = {'state_context': states, 'city_context': cities, 'address_context': address}

        return render(request, 'profile.html', context)

# addAdress
def addAdress(request):
    if (request.user.is_authenticated == False):
        return redirect('index')
    elif (request.method == 'POST'):
        full_name = request.POST.get('add_full_name')
        mobile = request.POST.get('add_mob_num')
        address = request.POST.get('add_address')
        state = request.POST.get('add_state')
        city = request.POST.get('add_city')
        country = request.POST.get('add_country')
        pincode = request.POST.get('add_pincode')

        states = State.objects.filter(id=state).values('state_code')[0]['state_code']
        cities = City.objects.filter(id=city).values('name')[0]['name']

        # data = [request.user.id, full_name, mobile, add_address, states, cities, country, pincode]
        address_obj = Address.objects.create(name=full_name, mobile=mobile, address=address, state=states, city=cities,
                                             pincode=pincode, user_id=request.user.id)
        address_obj.save()
        return redirect(userProfile)
    else:
        return render(request, 'profile.html')

# adressBook
def addressBook(request, address_id):
    if (request.user.is_authenticated == False):
        return redirect('index')
    elif (request.method == 'POST'):
        full_name = request.POST.get('add_full_name')
        mobile = request.POST.get('add_mob_num')
        address = request.POST.get('add_address')
        state = request.POST.get('add_state')
        city = request.POST.get('add_city')
        country = request.POST.get('add_country')
        pincode = request.POST.get('add_pincode')

        states = State.objects.filter(id=state).values('state_code')[0]['state_code']
        cities = City.objects.filter(id=city).values('name')[0]['name']

        address_obj = Address.objects.filter(id=address_id).update(name=full_name, mobile=mobile, address=address,
                                                                   state=states, city=cities, pincode=pincode,
                                                                   user_id=request.user.id)
        return redirect(userProfile)

# removeAdress
def removeAdress(request, address_id):
    address_obj = Address.objects.filter(id=address_id)
    address_obj.delete()
    return redirect(userProfile)

# getCities
def get_cities(request, state_id):
    cities = City.objects.filter(state_id=state_id).values('id', 'name')
    city_data = list(cities)
    return JsonResponse(city_data, safe=False)