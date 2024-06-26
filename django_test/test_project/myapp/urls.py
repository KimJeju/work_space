from django.urls import path, include
from rest_framework import routers

from .views import create_book,book_list, BookViewSet

router = routers.DefaultRouter()
router.register('books', BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('create/', create_book, name='create_book'),
    path('list', book_list, name='book_list'),
]