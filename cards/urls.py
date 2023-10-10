from django.urls import path

from .views import CardListView, CardListDetailView

# Path: /api/reviews/
urlpatterns = [
    path('<int:pk>/', CardListView.as_view()),
]