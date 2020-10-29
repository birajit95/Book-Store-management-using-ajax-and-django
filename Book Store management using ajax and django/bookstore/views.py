from django.shortcuts import render
from .models import Book, BookSerializer
from django.http import HttpResponse
import json


def index(request):
    return render(request,'index.html')
    
def save_book(request):
    name = request.GET.get('name')
    page= request.GET.get('pages')
    price = request.GET.get('price')
    book = Book(name=name,page=page,price=price)
    try:
        book.save()
        return HttpResponse('true')
    except:
        return HttpResponse('false')    

def showBooks(request):
    books = Book.objects.all()
    l = []
    for bk in books:
       ser = BookSerializer(bk)
       l.append(ser.data)
    return HttpResponse(json.dumps(l))

def deletebook(request):
    try:
        id = request.GET.get('id')
        book=Book.objects.get(id=id)
        book.delete()
        return HttpResponse('true')
    except:
        return HttpResponse('false')    



