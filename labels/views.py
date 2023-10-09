from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Label

from lib.views import UserBoardCreateAPIView

from rest_framework.permissions import IsAuthenticated

from lib.permissions import IsOwner

from .serializers.common import LabelSerializer

# Create your views here.

class LabelView(GenericAPIView):
    queryset = Label.objects.all()
    serializer_class=LabelSerializer

class LabelListView(LabelView, UserBoardCreateAPIView):
  permission_classes=[IsOwner]

class LabelListDetailView(LabelView, RetrieveUpdateDestroyAPIView):
  permission_classes=[IsOwner]