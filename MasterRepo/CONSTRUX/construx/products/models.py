from django.db import models
from authconstrux.models import UsersInfo
# Create your models here.
class Project(models.Model):
    item = models.TextField()
    price = models.IntegerField()
    deadline = models.TextField()
    specifics = models.TextField()
    status = models.TextField()
    completed = models.BooleanField(default=False)
    client = models.ForeignKey(UsersInfo, on_delete= models.CASCADE)

class Items(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

class Cart(models.Model):
    items = models.ManyToManyField(Items)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
