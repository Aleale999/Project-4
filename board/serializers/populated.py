from .common import BoardSerializer
from board_list.serializers.common import BoardListSerializer

# class PopulatedWithCollaboratorsBoardSerializer(BoardSerializer):
#   collaborators = CollaboratorsSerializer(many=True)

class PopulatedWithBoardList(BoardSerializer):
  boardlist = BoardListSerializer(many=True)