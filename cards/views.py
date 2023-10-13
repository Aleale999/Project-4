from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Card

from lib.views import UserBoardCreateAPIView

from rest_framework.permissions import IsAuthenticated

from lib.permissions import IsCollaboratorOrOwner

from .serializers.common import CardSerializer
from .serializers.populated import PopulatedWithComments

# Create your views here.

class CardListView(GenericAPIView):
  serializer_class=CardSerializer
  # permission_classes=[IsCollaboratorOrOwner]
  

class CardListViewList(CardListView, UserBoardCreateAPIView):
  queryset = Card.objects.all()

class CardListDetailView(CardListView, RetrieveUpdateDestroyAPIView):
  serializer_class = PopulatedWithComments
  def get_queryset(self):
    id = self.get_exception_handler_context().get('kwargs').get('pk')
    print(id)
    queryset = Card.objects.filter(id__exact=id)
    return queryset