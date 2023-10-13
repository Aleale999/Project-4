from django.db import models

# Create your models here.

class Label(models.Model):
  name = models.CharField(max_length=50)
  colour = models.CharField(max_length=255)
  card = models.ForeignKey(
    'cards.Card',
    related_name='labels',
    on_delete=models.CASCADE
  )