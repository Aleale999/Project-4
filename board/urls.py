from .views import BoardViewList, BoardDetailView

from django.urls import path

urlpatterns = [
  path('', BoardViewList.as_view()),
  path('<int:pk>/', BoardDetailView.as_view()),
]