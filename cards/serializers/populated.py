from .common import CardSerializer
from comments.serializers.common import CommentSerializer

class PopulatedWithBoardList(CardSerializer):
  boardlist = CommentSerializer(many=True)