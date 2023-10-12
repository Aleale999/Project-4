from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView

from .models import BoardList

from lib.views import UserBoardCreateAPIView

from rest_framework.permissions import IsAuthenticated

from lib.permissions import IsCollaboratorOrOwner

from .serializers.common import BoardListSerializer
from .serializers.populated import PopulatedWithCards

from rest_framework.response import Response




# Create your views here.

class BoardListView(GenericAPIView):
  serializer_class=BoardListSerializer
  # permission_classes=[IsCollaboratorOrOwner]
  

class BoardListViewList(BoardListView, UserBoardCreateAPIView):
  queryset = BoardList.objects.all()

class BoardListDetailView(BoardListView, RetrieveUpdateDestroyAPIView):
  def get_queryset(self):
    id = self.get_exception_handler_context().get('kwargs').get('pk')
    print(id)
    queryset = BoardList.objects.filter(id__exact=id)
    return queryset