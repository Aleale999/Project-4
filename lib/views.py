from rest_framework.generics import ListCreateAPIView

class UserBoardCreateAPIView(ListCreateAPIView):
    
  def perform_create(self, serializer):
    serializer.save(owner=self.request.user)