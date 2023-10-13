from django.urls import path

from .views import CommentListView, CommentListDetailView

# Path: /api/reviews/
urlpatterns = [
    path('', CommentListView.as_view()),
    path('<int:pk>/', CommentListDetailView.as_view())
]