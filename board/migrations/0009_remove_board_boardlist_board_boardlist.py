# Generated by Django 4.2.6 on 2023-10-07 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board_list', '0001_initial'),
        ('board', '0008_alter_board_boardlist'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='board',
            name='boardlist',
        ),
        migrations.AddField(
            model_name='board',
            name='boardlist',
            field=models.ManyToManyField(blank=True, related_name='boardList', to='board_list.boardlist'),
        ),
    ]
