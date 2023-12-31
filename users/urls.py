from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import RegisterView, UsersView, UsersDetailView

urlpatterns=[
  path('register/', RegisterView.as_view()),
  path('login/', TokenObtainPairView.as_view()),
  path('refresh/', TokenRefreshView.as_view()),
  path('users/', UsersView.as_view()),
  path('users/<int:pk>/', UsersDetailView.as_view()),
]