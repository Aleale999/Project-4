# Generated by Django 4.2.6 on 2023-10-11 15:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0015_remove_board_boardlist'),
        ('board_list', '0009_alter_boardlist_board'),
    ]

    operations = [
        migrations.AlterField(
            model_name='boardlist',
            name='board',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lists', to='board.board'),
        ),
    ]