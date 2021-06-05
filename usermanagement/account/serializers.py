from rest_framework import serializers
from account.models import Account,AccountRole,Role
#from drf_writable_nested.serializers import WritableNestedModelSerializer



class RoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Role
        fields = ('id', 'name')

class AccountRoleSerializer(serializers.ModelSerializer):
    #role = RoleSerializer(many=True)

    class Meta:
        model = AccountRole
        fields = ('id', 'role_name', 'description','role')

    def to_representation(self, instance):
        res= super().to_representation(instance)
        roles=instance.role.all()
        res['role']=[RoleSerializer(r).data for r in roles]
        return res
        


class AccountSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Account
        fields = ['id', 'user_name', 'first_name', 'last_name', 'description', 'role']
    def to_representation(self, instance):
        res= super().to_representation(instance)
        res['role']=[AccountRoleSerializer(r).data for r in instance.role.all()]
        res['all_roles']=[AccountRoleSerializer(r).data for r in AccountRole.objects.all()]
        return res
