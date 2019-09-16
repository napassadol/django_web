from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=20)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    password = models.CharField(max_length=20)
    userType = models.IntegerField(default=0)