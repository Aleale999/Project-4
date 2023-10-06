from .common import BoardSerializer

class PopulatedWithCollaboratorsBoardSerializer(BoardSerializer):
  collaborators = CollaboratorsSerializer(many=True)