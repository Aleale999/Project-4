
from rest_framework.generics import GenericAPIView, ListCreateAPIView

from .models import Board

from .serializers.common import BoardSerializer


# Create your views here.

class BoardView(GenericAPIView):
  queryset = Board.objects.all()
  serializer_class=BoardSerializer

class BoardViewList(BoardView, ListCreateAPIView):
  pass
  
