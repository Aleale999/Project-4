from .views import BoardViewList, BoardDetailView, BoardCollaboratorView
from django.urls import path

urlpatterns = [
  path('', BoardViewList.as_view()),
  path('<int:pk>/', BoardDetailView.as_view()),
  path('<int:pk>/collaborators/', BoardCollaboratorView.as_view()),
]