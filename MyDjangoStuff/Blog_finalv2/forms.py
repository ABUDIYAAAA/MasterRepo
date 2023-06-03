from django.contrib.auth.forms import UserCreationForm
from django import form_class


class UserRegisterForm(UserCreationForm):
    class Meta:
        fields = ("username", "email", "password1", "password2",)
