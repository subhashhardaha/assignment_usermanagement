from account.models import Account,AccountRole,Role
from account.serializers import AccountSerializer,RoleSerializer,AccountRoleSerializer
#from rest_framework import generics
from rest_framework import viewsets



# class AccountList(generics.ListCreateAPIView):
#     queryset = Account.objects.all()
#     serializer_class = AccountSerializer
       


# class AccountDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Account.objects.all()
#     serializer_class = AccountSerializer


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class AccountRoleViewSet(viewsets.ModelViewSet):
    queryset = AccountRole.objects.all()
    serializer_class = AccountRoleSerializer