from django.db import models

class Book(models.Model):
    name = models.CharField(max_length=100)
    page = models.IntegerField()
    price = models.IntegerField()
    def __str__(self):
        return self.name +" worth Rs."+str(self.price)

from rest_framework import serializers

class BookSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    page = serializers.IntegerField()
    price = serializers.IntegerField()
    id = serializers.IntegerField()