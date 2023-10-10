
from rest_framework.generics import GenericAPIView, RetrieveUpdateDestroyAPIView

from .models import Board

from lib.views import UserBoardCreateAPIView

from lib.permissions import IsOwner,IsCollaborator

from .serializers.common import BoardSerializer



# Create your views here.

class BoardView(GenericAPIView):
  serializer_class=BoardSerializer
  permission_classes= [IsCollaborator]
  
class BoardViewList(BoardView, UserBoardCreateAPIView):
  def get_queryset(self):
    queryset1 = Board.objects.filter(owner = self.request.user)
    queryset2 = Board.objects.filter(collaborators = self.request.user)
    model_combination = queryset1.union(queryset2)
    return model_combination

class BoardDetailView(BoardView, RetrieveUpdateDestroyAPIView):
  pass
