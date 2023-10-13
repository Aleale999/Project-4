from django.urls import path

from .views import LabelListView, LabelListDetailView

# Path: /api/reviews/
urlpatterns = [
    path('', LabelListView.as_view()),
    path('<int:pk>/', LabelListDetailView.as_view())
]