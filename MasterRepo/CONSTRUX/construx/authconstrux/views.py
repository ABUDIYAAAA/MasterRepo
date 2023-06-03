from .models import UsersInfo
from django.http import JsonResponse
import random
# Create your views here.


def login(request):
    name = request.GET['name']
    email = request.GET['email']
    password = request.GET['password']
    try:
        user = UsersInfo.objects.get(name=name, email=email)
        print(user.password)
        if user.password == password:
            new_cookie = generate_random_number()
            user.unique_cookie = new_cookie
            user.save()
            return JsonResponse({'status': 200, 'user': user.name, 'unique_cookie': new_cookie})
        else:
            return JsonResponse({'status': 403})
    except UsersInfo.DoesNotExist:
        user = UsersInfo.objects.create(
            name=name, email=email, password=password, unique_cookie=generate_random_number())
        print(user.name, user.unique_cookie)
        return JsonResponse({'status': 200, 'user': user.name, 'unique_cookie': str(user.unique_cookie)})

        # if unique_number == user.unique_cookie:
        #     unique_number = generate_random_number()
        #     user.unique_cookie = unique_number
        #     return JsonResponse({'status': 200, 'user': user, "unique_number": unique_number})
        # else:
        #     return JsonResponse({'status': 403})


def generate_random_number():
    num_digits = 16
    min_value = 10 ** (num_digits - 1)
    max_value = (10 ** num_digits) - 1
    return random.randint(min_value, max_value)
