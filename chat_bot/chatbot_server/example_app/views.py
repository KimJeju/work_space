from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


# Create your views here.
def hello(request):
    return HttpResponse("hello world")

@api_view(['GET','POST'])
@permission_classes([AllowAny])
def hello_rest_api(request):
    data = {'message': 'hello world'}
    return Response(data)