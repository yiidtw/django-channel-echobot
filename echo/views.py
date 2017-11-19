from django.views import generic
from django.shortcuts import render

def index(request):
    return render(request, 'echo/index.html')

def chat(request):
    return render(request, 'echo/chat.html')
