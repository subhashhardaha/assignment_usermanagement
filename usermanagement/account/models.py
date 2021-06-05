from django.db import models
from django.urls import reverse

# Create your models here.


class Role(models.Model):
    name = models.CharField(max_length=30,unique=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class AccountRole(models.Model):
    role_name = models.CharField(max_length=30,blank=True)
    description=models.CharField(max_length=100)
    role = models.ManyToManyField(Role)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.role_name

class Account(models.Model):
    first_name = models.CharField(max_length=30,blank=True)
    last_name = models.CharField(max_length=30,blank=False,null=False)
    user_name = models.CharField(max_length=30,unique=True)
    description = models.CharField(max_length=100,blank=True)
    role=models.ManyToManyField(AccountRole,blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    

    def __str__(self) -> str:
        return self.user_name

    
