from django.shortcuts import render
from django.urls import reverse_lazy
from account.form import CreateAccountForm

from django.views.generic import ListView,CreateView,UpdateView,DeleteView
from account.models import Account

class AccountListView(ListView):
    model = Account

class AccountCreateView(CreateView):
    model = Account
    #fields=["first_name", "last_name","user_name","description","role"]
    form_class = CreateAccountForm
    success_url = reverse_lazy('user-list')

class AccountUpdateView(UpdateView):
    model = Account
    fields = ["first_name", "last_name","user_name","description","role"]
    success_url = reverse_lazy('user-list')

class AccountDeleteView(DeleteView):
    model = Account
    success_url = reverse_lazy('user-list')


    
# Create your views here.
