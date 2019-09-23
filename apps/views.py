from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from apps.models import User, Product, Company, Order

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

@api_view(['GET'])
def getProductList(request):
    product = Product.objects.all().values('id', 'serial', 'name', 'amount', 'price', 'company__name')
    return Response(product)

@api_view(['GET'])
def getCompanyList(request):
    company = Company.objects.all().values()
    return Response(company)

@api_view(['POST'])
def editCompany(request):
    data = request.data
    company = Company.objects.get(id=data['id'])
    company.id = data['id']
    company.name = data['name']
    company.address = data['address']
    company.info = data['info']
    company.save()
    return Response('OK')

@api_view(['POST'])
def deleteCompany(request):
    data = request.data
    company = Company.objects.get(id=data['id'])
    company.delete()
    return Response('OK')

@api_view(['POST'])
def addCompany(request):
    data = request.data
    Company(
        name=data['name'],
        address=data['address'],
        info=data['info']
    ).save()
    return Response('OK')