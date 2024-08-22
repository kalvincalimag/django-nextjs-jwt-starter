from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer

@api_view(['GET'])
def get_routes(request):
    """returns a view with all the available routes"""
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer