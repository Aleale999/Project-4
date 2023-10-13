from .common import CardSerializer
from comments.serializers.common import CommentSerializer

class PopulatedWithComments(CardSerializer):
  comments = CommentSerializer(many=True)