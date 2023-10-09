# Generated by Django 4.2.6 on 2023-10-08 13:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cards', '0003_alter_card_boardlist'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField()),
                ('card', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comment', to='cards.card')),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='comment', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]