from django.db import models
# Create your models here.


class UsersInfo(models.Model):
    name = models.TextField()
    email = models.TextField()
    address = models.TextField()
    phone_number = models.IntegerField(null=True)
    unique_cookie = models.BigIntegerField(blank=True)
    password = models.TextField()
    cart = models.ForeignKey(
        "products.Cart", on_delete=models.CASCADE, null=True)
