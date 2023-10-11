from .views import BoardViewList, BoardDetailView
from django.urls import path,include

urlpatterns = [
  path('', BoardViewList.as_view()),
  path('<int:pk>/', include('board_list.urls')),
]