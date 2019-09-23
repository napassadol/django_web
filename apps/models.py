from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=20)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    password = models.CharField(max_length=20)
    userType = models.IntegerField(default=0)

class Company(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    info = JSONField(default={})

class Product(models.Model):
    serial = models.CharField(max_length=20)
    name = models.CharField(max_length=50)
    price = models.FloatField(default=0)
    amount = models.IntegerField(default=0)
    detail = models.CharField(max_length=100)
    info = JSONField(default={})
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    status = models.CharField(max_length=50)
    amount = models.IntegerField(default=0)
    price = models.FloatField(default=0)
    info = JSONField(default={})