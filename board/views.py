
from rest_framework.generics import GenericAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView, ListCreateAPIView

from .models import Board

from lib.views import UserBoardCreateAPIView

from rest_framework.response import Response

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

class BoardCollaboratorView(UpdateAPIView):
  serializer_class=BoardSerializer
  queryset = Board.objects.all()
  permission_classes=[IsCollaboratorOrOwner]
  def patch(self, request, *args, **kwargs):
    collaborator = self.request.data.get('collaborators')
    board = self.get_object()
    print(self.request.data)
    print(type(collaborator))
    board.collaborators.add(collaborator)
    return Response(status=201)
  