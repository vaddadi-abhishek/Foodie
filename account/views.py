from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.models import auth
from account.models import State, City, Address
from django.http import JsonResponse
from django.http import HttpResponse
from django.urls import reverse
from .forms import LoginForm, RegisterForm, userProfileForm

# Create your views here.
# Home Page
def index(request):
    return render(request, 'index.html')

# home
def home(request, state, city):
    return render(request, 'index.html')

# Register User
def registerUser(request):
    if (request.user.is_authenticated):
        return redirect('index')
    elif (request.method == 'POST'):
        regForm = RegisterForm(request.POST)

        if(regForm.is_valid()):
            try:
                full_name = regForm.cleaned_data['full_name']
                email = regForm.cleaned_data['email']
                password = regForm.cleaned_data['password']

                User = get_user_model()
                user = User.objects.create_user(full_name=full_name, gender='None', email=email, mobile='',
                                                password=password)
                user.save()
                auth.login(request, user)
                return redirect('index')
            except Exception as e:
                # Add a custom error to the form
                regForm.add_error('email', 'Email already exists.')
                return render(request, 'register.html', {'regForm': regForm})

        else:
            return render(request, 'register.html', {'regForm': regForm})
    else:
        regForm = RegisterForm()
        return render(request, 'register.html', {'regForm':regForm})

def loginUser(request):
    if request.user.is_authenticated:
        return redirect('index')
    elif request.method == 'POST':
        loginForm = LoginForm(request.POST)
        if loginForm.is_valid():
            email = loginForm.cleaned_data['email']
            password = loginForm.cleaned_data['password']
            user = auth.authenticate(email=email, password=password)
            if user is not None:
                auth.login(request, user)
                return redirect('index')
            else:
                loginForm.add_error(None, 'Invalid Credentials, Try again')
                return render(request, 'login.html', {'loginForm': loginForm})
        else:
            return render(request, 'login.html', {'loginForm': loginForm})
    else:
        loginForm = LoginForm()
        return render(request, 'login.html', {'loginForm': loginForm})

# Logout User
def logoutUser(request):
    auth.logout(request)
    return redirect('index')

# User Profile
def userProfile(request):
    if (request.user.is_authenticated == False):
        return redirect('index')
    elif (request.method == 'POST'):
        pass
    else:
        userProfile = userProfileForm
        return render(request, 'profile.html', {'userProfile':userProfile})

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