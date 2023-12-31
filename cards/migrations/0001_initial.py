# Generated by Django 4.2.6 on 2023-10-13 13:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('board_list', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('colours', models.CharField(max_length=50, null=True)),
                ('status', models.BooleanField(default=False)),
                ('boardlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cards', to='board_list.boardlist')),
            ],
        ),
    ]
