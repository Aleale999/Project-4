from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from lib.views import UserBoardCreateAPIView

from rest_framework.permissions import IsAuthenticated

from lib.permissions import IsCollaborator, IsOwner


# Create your views here.

class BoardListView():
  pass
  
class BoardListDetailView():
  pass