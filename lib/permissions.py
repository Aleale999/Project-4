from rest_framework.permissions import BasePermission, SAFE_METHODS
    
class IsCollaboratorOrOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user in obj.collaborators.all() or obj.owner == request.user:
            return True
        return False