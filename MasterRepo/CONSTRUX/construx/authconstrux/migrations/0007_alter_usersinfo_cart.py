# Generated by Django 3.2 on 2023-05-25 19:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
        ('authconstrux', '0006_alter_usersinfo_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersinfo',
            name='cart',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='products.cart'),
        ),
    ]