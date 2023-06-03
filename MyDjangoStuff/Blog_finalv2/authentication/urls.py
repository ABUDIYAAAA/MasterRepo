from django.contrib import admin
from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

app_name = 'authentication'

urlpatterns = [
    path('', views.signup, name='signup'),
    path('/signin', views.signin, name='signin'),
    path('/signout', views.signout, name='signout'),
]
