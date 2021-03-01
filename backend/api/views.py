import requests
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MemeSerializer
from .models import Meme
# Create your views here.

"""Same as Crio Views files with 2 additional endpoints for starboard and cleanup"""

@api_view(['GET','POST'])
def primaryEndpoint(request):
    """This section handles /memes endpoint and supports GET and POST requests"""
    if request.method=='POST':
        #For valid post request it return id and also checks unique constraint of all fields
            serializer = MemeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    if request.method=='GET':
        #Gets latest 100 memes
        memes = Meme.objects.all().order_by("-id")[:100]
        serializer = MemeSerializer(memes, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(['GET','PATCH'])
def singleMemeEndpoint(request,id):
    """This section handles /memes/<id> endpoint and supports GET and PATCH requests"""
    obj = get_object_or_404(Meme, id = id) 

    if request.method=='GET':
        #Gets the required meme
        serializer=MemeSerializer(instance=obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method=='PATCH':
        #does not allows name field to be altered plus makes sure updates dont violate unique constraints
        serializer=MemeSerializer(instance=obj,partial=True,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def starboard(request,query=5):
    """Get the best Memes"""
    memes=Meme.objects.order_by('-difference')[:query]
    serializer = MemeSerializer(memes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def cleanup(request,difference=5):
    """Delete those bad ones having terribles likes to dislike ratio"""
    Meme.objects.filter(difference__lt=-difference).delete()
    return Response({"message":"success"}, status=status.HTTP_200_OK)
