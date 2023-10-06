from rest_framework import serializers
from ..models import BoardList

class BoardSerializer(serializers.ModelSerializer):
  class Meta:
    model=BoardList
    fields='__all__'