from .common import BoardListSerializer
from cards.serializers.common import CardSerializer

class PopulatedWithBoardList(BoardListSerializer):
  boardlist = CardSerializer(many=True)