from django.db import models

# Create your models here.

class BoardList(models.Model):
  name = models.CharField()
  owner = models.ForeignKey(
    'users.User',
    related_name='boardlist',
    on_delete=models.DO_NOTHING,
    null=True
  )
  board = models.ForeignKey(
    'board.Board',
    related_name='boardlist',
    on_delete=models.CASCADE
  )
