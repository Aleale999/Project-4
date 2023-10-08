from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Card

from lib.views import UserBoardCreateAPIView

from rest_framework.permissions import IsAuthenticated

from lib.permissions import IsCollaborator, IsOwner

from .serializers.common import CardSerializer

# Create your views here.

class CardView(GenericAPIView):
    queryset = Card.objects.all()
    serializer_class=CardSerializer

class CardListView(CardView, UserBoardCreateAPIView):
  permission_classes=[IsCollaborator]

class CardListDetailView(CardView, RetrieveUpdateDestroyAPIView):
  permission_classes=[IsCollaborator]