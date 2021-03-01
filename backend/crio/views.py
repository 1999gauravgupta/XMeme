#general imports
import requests
#django imports
from django.shortcuts import get_object_or_404
from django.db.utils import IntegrityError
#django-rest-framework imports
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
#custom imports
from .serializers import CrioMemeSerializer
from .models import CrioMeme
# Create your views here.

@api_view(['GET','POST'])
def primaryEndpoint(request):
    """This section handles /memes endpoint and supports GET and POST requests"""
    if request.method=='POST':
        #For valid post request it return id and also checks unique constraint of all fields
        try:
            serializer = CrioMemeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'id': f"{serializer.data.get('id')}"}, status=status.HTTP_201_CREATED)
            elif "non_field_errors" in serializer.errors:
                return Response({'Error': "Combination of all fields must be unique"}, status=status.HTTP_409_CONFLICT)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            return Response({'Error': "Combination of all fields must be unique"}, status=status.HTTP_409_CONFLICT)
            
    if request.method=='GET':
        #Gets latest 100 memes sorted by id in ascending order
        memes = CrioMeme.objects.all().order_by("-id")[:100]
        serializer = CrioMemeSerializer(memes, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    

@api_view(['GET','PATCH'])
def singleMemeEndpoint(request,id):
    """This section handles /memes/<id> endpoint and supports GET and PATCH requests"""
    obj = get_object_or_404(CrioMeme, id = id) 

    if request.method=='GET':
        #Gets the required meme
        serializer=CrioMemeSerializer(instance=obj)
        return Response(serializer.data)

    if request.method=='PATCH':
        #does not allows name field to be altered plus makes sure updates dont violate unique constraints
        try:
            serializer=CrioMemeSerializer(instance=obj,partial=True,data=request.data)
            if serializer.is_valid():
                if "name" in serializer.validated_data:
                    return Response({'Error': "Name is a read only field"}, status=status.HTTP_400_BAD_REQUEST)
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            elif "non_field_errors" in serializer.errors:
                return Response({'Error': "Combination of all fields must be unique"}, status=status.HTTP_409_CONFLICT)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            return Response({'Error': "Combination of all fields must be unique"}, status=status.HTTP_409_CONFLICT)