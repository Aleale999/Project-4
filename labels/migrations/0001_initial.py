# Generated by Django 4.2.6 on 2023-10-13 13:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cards', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Label',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('colour', models.CharField(max_length=255)),
                ('card', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='labels', to='cards.card')),
            ],
        ),
    ]
