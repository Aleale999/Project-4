from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView

from .models import BoardList

from lib.views import UserBoardCreateAPIView

from rest_framework.permissions import IsAuthenticated

from lib.permissions import IsCollaborator, IsOwner

from .serializers.common import BoardListSerializer




# Create your views here.

class BoardListView(RetrieveUpdateAPIView):
    # allboardlists = BoardList.objects.all()
    # queryset = allboardlists.filter(board_id__exact = 2)
    serializer_class=BoardListSerializer
    def get_queryset(self):
      id = self.get_exception_handler_context().get('kwargs').get('pk')
      queryset = BoardList.objects.filter(board_id__exact=id)
      return queryset

class BoardListViewList(BoardListView, UserBoardCreateAPIView):
  permission_classes=[IsCollaborator, IsOwner]
  def patch(self, request, *args, **kwargs):
     name = self.get_object(request)
     name.save()

class BoardListDetailView(RetrieveUpdateDestroyAPIView):
  permission_classes=[IsOwner]