from django.urls import path
from .views import BoardViewList, BoardListDetailView

# Path: /api/reviews/
urlpatterns = [
    path('', BoardViewList.as_view()),
    path('<int:pk>/', BoardListDetailView.as_view())
]