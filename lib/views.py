from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView

class UserBoardCreateAPIView(RetrieveUpdateAPIView):
    
  def perform_create(self, serializer):
    serializer.save(owner=self.request.user)
  
  # def perform_update(self, serializer):
  #   serializer.save(owner=self.request.user)

