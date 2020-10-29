from django.urls import path, include
from . import views

urlpatterns = [
    
    path('',views.index, name='index'),
    path('save_book/',views.save_book, name='save_book'),
    path('showBooks/',views.showBooks, name='showBooks'),
    path('deletebook/',views.deletebook, name='deletebook'),

]
