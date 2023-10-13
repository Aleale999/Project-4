from django.urls import path
from .views import BoardListViewList, BoardListDetailView

urlpatterns = [
    path('', BoardListViewList.as_view()),
    path('<int:pk>/', BoardListDetailView.as_view()),
]