from django.db import models

# Create your models here.

class BoardList(models.Model):
  name = models.CharField()
  list = models.ForeignKey(
        'board.Board',
        related_name='boardlist',
        on_delete=models.CASCADE
    )

  def __str__(self):
    return self.name