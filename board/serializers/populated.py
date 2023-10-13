from .common import BoardSerializer
from board_list.serializers.populated import PopulatedWithCards

class PopulatedWithBoardList(BoardSerializer):
  lists = PopulatedWithCards(many=True)