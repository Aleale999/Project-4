from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Comment

from lib.views import UserBoardCreateAPIView

from rest_framework.permissions import IsAuthenticated

from lib.permissions import IsCollaboratorOrOwner

from .serializers.common import CommentSerializer

# Create your views here.

class CommentView(GenericAPIView):
    queryset = Comment.objects.all()
    serializer_class=CommentSerializer

class CommentListView(CommentView, UserBoardCreateAPIView):
  permission_classes=[IsCollaboratorOrOwner]

class CommentListDetailView(CommentView, RetrieveUpdateDestroyAPIView):
  permission_classes=[IsCollaboratorOrOwner]