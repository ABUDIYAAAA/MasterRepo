from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.addProduct),
    path('cart/', views.getCart)
]
