from django.shortcuts import render,redirect
from rest_framework import status

from .forms import BookForm
from myapp.models import Book
from .serializsers import BookSerializer
from  rest_framework.decorators import api_view
from rest_framework.response import Response

# def create_book(request):
#     if request.method == 'POST':
#         form = BookForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('book_list')
#     else:
#         form = BookForm()
#     return render(request, 'myapp/create_book.html', {'form' : form})

@api_view(['POST'])
def create_book(request):
    serializer = BookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def book_list(request):
    books = Book.objects.all()
    return render(request, 'myapp/book_list.html', {'books': books})
# Create your views here.
