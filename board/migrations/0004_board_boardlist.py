# Generated by Django 4.2.6 on 2023-10-07 14:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('board_list', '0001_initial'),
        ('board', '0003_board_collaborators'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='boardlist',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='boardList', to='board_list.boardlist'),
        ),
    ]