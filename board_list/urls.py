from django.urls import path, include
from .views import BoardListViewList

# Path: /api/reviews/
urlpatterns = [
    path('', BoardListViewList.as_view()),
    path('<int:pk>/', include('cards.urls')),
]