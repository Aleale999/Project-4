from rest_framework.generics import CreateAPIView, ListAPIView
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