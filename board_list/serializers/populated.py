from .common import BoardListSerializer
from cards.serializers.common import CardSerializer

class PopulatedWithCards(BoardListSerializer):
  cards = CardSerializer(many=True)