# Generated by Django 4.2.6 on 2023-10-13 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='name',
            field=models.CharField(max_length=255),
        ),
    ]
