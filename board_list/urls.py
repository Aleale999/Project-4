from django.urls import path
from .views import BoardListView, BoardListDetailView

# Path: /api/reviews/
urlpatterns = [
    path('', BoardListView.as_view()),
    path('<int:pk>/', BoardListDetailView.as_view())
]