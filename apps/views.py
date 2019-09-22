from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from apps.models import User

def index(request):
    return render(request, 'index.html')

@api_view(['GET'])
def check_session(request):
    response_data = {}
    if 'USER' in request.session:
        response_data = request.session['USER']
    return Response(response_data)

@api_view(['POST'])
def login(request):
    response_data = {}
    username = request.data.get('username', '')
    password = request.data.get('password', '')
    user = User.objects.filter(username=username, password=password).values()
    if len(user):
        request.session['USER'] = {}
        request.session['USER'] = user[0]
        response_data = user[0]
    return redirect('/#/app/dashboard') 