from django import forms
from account.models import Account,AccountRole

class CreateAccountForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ["first_name", "last_name","user_name","description","role"]
    role = forms.ModelMultipleChoiceField(
        queryset=AccountRole.objects.all(),
        widget=forms.CheckboxSelectMultiple
    )