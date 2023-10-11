from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Card

from lib.views import UserBoardCreateAPIView

from rest_framework.permissions import IsAuthenticated

from lib.permissions import IsOwner

from .serializers.common import CardSerializer

# Create your views here.

class CardView(GenericAPIView):
    serializer_class=CardSerializer
    def get_queryset(self):
      id = self.get_exception_handler_context().get('kwargs').get('pk')
      queryset = Card.objects.filter(boardlist_id__exact=id)
      return queryset

class CardListView(CardView, UserBoardCreateAPIView):
  permission_classes=[IsOwner]

class CardListDetailView(CardView, RetrieveUpdateDestroyAPIView):
  permission_classes=[IsOwner]