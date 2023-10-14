from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response
from .serializers.common import RegistrationSerializer, UserSerializer
from django.contrib.auth import get_user_model
from lib.permissions import IsCollaboratorOrOwner

User = get_user_model()

# Create your views here.

class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegistrationSerializer

class UsersView(ListAPIView):
  queryset= User.objects.all()
  serializer_class = UserSerializer

class UsersDetailView(ListAPIView):
  serializer_class = UserSerializer
  def get_queryset(self):
    return User.objects.filter(id = self.request.user.id)
    
    