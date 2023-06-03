from django.shortcuts import render
from authconstrux.models import UsersInfo
from .models import Cart, Items, Project
from django.http import JsonResponse
from django.core.mail import send_mail
# Create your views here.


def addProduct(request):
    user = request.GET['user']
    unique_cookie = request.GET['unique_cookie']
    user = UsersInfo.objects.get(name=user, unique_cookie=unique_cookie)

    if user:
        if user.cart.pk:
            item = Items.objects.get(name=request.GET["item"])
            if item:
                user.cart.items.add(item)
                return JsonResponse({'status': 200})
        else:
            item = Items.objects.get(name=request.GET["item"])
            if item:
                cart = Cart.objects.create(items=item)
                user.cart = cart
                return JsonResponse({'status': 200})

    else:
        return JsonResponse({'status': 403})


def removeProduct(request):
    user = request.GET['user']
    unique_cookie = request.GET['unique_cookie']
    user = UsersInfo.objects.get(name=user, unique_cookie=unique_cookie)

    if user & user.cart:
        item = Items.objects.get(name=request.GET["item"])
        if item:
            user.cart.items.remove(item)
            return JsonResponse({'status': 200})
    else:
        return JsonResponse({'status': 403})


def getCart(request):
    pk = request.GET.get('pk')
    user = UsersInfo.objects.get(unique_cookie=pk)

    if user:
        if user.cart:
            items = []
            for item in user.cart.items:
                items.append([item.name, item.price])
            return JsonResponse({'status': 200, "items": items})
        else:
            cart = Cart.objects.create()
            user.cart = cart
            return JsonResponse({'status': 200, 'items': 'no items'})
    else:
        return JsonResponse({'status': 403})


def createOrder(request):
    name = request.GET['name']
    email = request.GET['email']
    phoneno = request.GET['phoneno']
    address = request.GET['adsress']
    unique_cookie = request.GET['unique_cookie']
    item = request.GET["item"]
    user = UsersInfo.objects.get(name=name, unique_cookie=unique_cookie)
    if user:
        user.phone_number = phoneno
        user.address = address
        Project.objects.create(item=item)

        try:
            send_mail(
                "New Order",
                "NEW ORDER",
                "nimit4school@gmail.com",
                ["nimitsharma@construx.online"],
                fail_silently=False,
            )
        except smtplib.SMTPException:
            pass
    else:
        JsonResponse({'status': 403})
