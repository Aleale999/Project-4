from rest_framework import serializers
from ..models import BoardList

class BoardListSerializer(serializers.ModelSerializer):
  class Meta:
    model = BoardList
    fields='__all__'