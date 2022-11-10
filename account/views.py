from django.shortcuts import render, redirect
from django.contrib import messages
# from django.http import HttpResponse
from django.contrib.auth import get_user_model
from django.contrib.auth.models import auth
# Create your views here.

def index(request):
    return render(request, 'index.html')

def registerUser(request):
    if(request.user.is_authenticated):
        return redirect('index')
    elif(request.method=='POST'):
        full_name = request.POST.get('full_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if(full_name.isspace()):
            messages.info(request, 'Full Name should not be empty')
            return redirect('registerUser')
        elif(len(full_name) < 6):
            messages.info(request, 'Full Name should not be less than 6 character long')
            return redirect('registerUser')
        elif(password.isspace() or (' ' in password) == True):
            messages.info(request, 'password should not contain any spaces')
            return redirect('registerUser')
        elif(len(password) < 8):
            messages.info(request, 'Password should be min 8 characters long')
            return redirect('registerUser')
        elif(password != confirm_password):
            messages.info(request, 'Password and Confirm password must be same')
            return redirect('registerUser')
        else:
            User = get_user_model()
            user = User.objects.create_user(full_name=full_name, email=email, password=password)
            user.save()
            print('User Created')
            auth.login(request, user)
            return redirect('index')
    else:
        return render(request, 'register.html')

        
def loginUser(request):
    if(request.user.is_authenticated):
        return redirect('index')

    elif(request.method == 'POST'):
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


def logoutUser(request):
    auth.logout(request)
    return redirect('index')