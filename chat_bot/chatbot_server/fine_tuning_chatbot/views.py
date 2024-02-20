from django.conf import settings
from django.core.files.storage import  default_storage

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import FineTunedModel,TrainingData
from .serializers import FineTunedModelSerializer,TrainingDataSerializer


class FineTunedModelViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = FineTunedModel.objects.all()
    serializer_class = FineTunedModelSerializer

class TrainingDataViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = TrainingData.objects.all()
    serializer_class = TrainingDataSerializer