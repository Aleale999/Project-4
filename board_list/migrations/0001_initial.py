# Generated by Django 4.2.6 on 2023-10-07 13:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('board', '0003_board_collaborators'),
    ]

    operations = [
        migrations.CreateModel(
            name='BoardList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField()),
                ('board', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='board', to='board.board')),
            ],
        ),
    ]
