from django.shortcuts import render

# Create your views here.
def hello(request):
    return render({'message': 'Hello from Django backend'})