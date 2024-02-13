from django.views import View
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


# Create your views here.
@api_view(['GET'])
def hello_world(request):
    return Response("welcome django ")

@api_view(['GET'])
class HelloWorldView(View):
    def get(self, request):
        return Response("hello is cbv")