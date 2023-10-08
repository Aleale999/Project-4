from django.db import models

# Create your models here.

class Comment(models.Model):
  name = models.CharField()
  owner = models.ForeignKey(
    'users.User',
    related_name='comment',
    on_delete=models.DO_NOTHING,
    null=True
  )
  card = models.ForeignKey(
    'cards.Card',
    related_name='comment',
    on_delete=models.CASCADE
  )