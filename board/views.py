
from rest_framework.generics import GenericAPIView, RetrieveUpdateDestroyAPIView

from .models import Board

from lib.views import UserBoardCreateAPIView

from lib.permissions import IsCollaboratorOrOwner

from .serializers.common import BoardSerializer
from .serializers.populated import PopulatedWithBoardList



# Create your views here.

  
class BoardViewList(UserBoardCreateAPIView):
  serializer_class=BoardSerializer
  def get_queryset(self):
    queryset1 = Board.objects.filter(owner = self.request.user)
    queryset2 = Board.objects.filter(collaborators = self.request.user)
    model_combination = queryset1.union(queryset2)
    return model_combination

class BoardDetailView(RetrieveUpdateDestroyAPIView):
  serializer_class=PopulatedWithBoardList
  queryset = Board.objects.all()
  permission_classes=[IsCollaboratorOrOwner]

# class BoardCollaboratorView()