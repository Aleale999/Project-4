from django.urls import path, include
from .views import BoardViewList, BoardListDetailView

# Path: /api/reviews/
urlpatterns = [
    path('', BoardViewList.as_view()),
    path('<int:pk>/', include('cards.urls')),
]