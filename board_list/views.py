from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import BoardList

from lib.views import UserBoardCreateAPIView

from rest_framework.permissions import IsAuthenticated

from lib.permissions import IsCollaborator, IsOwner

from .serializers.common import BoardListSerializer




# Create your views here.

class BoardListView(GenericAPIView):
    queryset = BoardList.objects.all()
    serializer_class=BoardListSerializer

class BoardViewList(BoardListView, UserBoardCreateAPIView):
  permission_classes=[IsCollaborator]

class BoardListDetailView(RetrieveUpdateDestroyAPIView):
  permission_classes=[IsCollaborator]