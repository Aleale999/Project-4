from django.db import models

# Create your models here.

class Board(models.Model):
  name = models.CharField(max_length=50)
  owner = models.ForeignKey(
      'users.User',
      related_name='board',
      on_delete=models.SET_NULL,
      null=True
  )
  collaborators = models.ManyToManyField(
      'users.User',
      related_name='Collaborators_board',
      blank=True
  )

  def __str__(self):
    return f"{self.name}"