from django.db import models

# Create your models here.

class Card(models.Model):
  name = models.CharField()
  owner = models.ForeignKey(
    'users.User',
    related_name='card',
    on_delete=models.DO_NOTHING,
    null=True
  )
  boardlist = models.ForeignKey(
    'board_list.BoardList',
    related_name='card',
    on_delete=models.CASCADE
  )
  colours = models.CharField(max_length=50)
  status = models.BooleanField(default=False)