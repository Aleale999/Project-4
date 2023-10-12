from django.urls import path

from .views import CardListViewList, CardListDetailView

urlpatterns = [
    path('', CardListViewList.as_view()),
    path('<int:pk>/', CardListDetailView.as_view()),
]