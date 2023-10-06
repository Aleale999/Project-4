
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Board

from lib.views import UserBoardCreateAPIView

from lib.permissions import IsCollaborator, IsOwner

from .serializers.common import BoardSerializer


# Create your views here.

class BoardView(GenericAPIView):
  queryset = Board.objects.all()
  serializer_class=BoardSerializer

class BoardViewList(BoardView, UserBoardCreateAPIView):
  permission_classes=[IsCollaborator]

class BoardDetailView(BoardView, RetrieveUpdateDestroyAPIView):
  pass

