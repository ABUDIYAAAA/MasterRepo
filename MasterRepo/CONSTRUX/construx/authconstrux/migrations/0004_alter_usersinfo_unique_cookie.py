# Generated by Django 3.2 on 2023-05-23 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authconstrux', '0003_alter_usersinfo_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersinfo',
            name='unique_cookie',
            field=models.BigIntegerField(default=None),
        ),
    ]