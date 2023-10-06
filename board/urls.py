from .views import BoardViewList

from django.urls import path

urlpatterns = [
  path('', BoardViewList.as_view())
]