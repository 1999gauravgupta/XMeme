from rest_framework import serializers
from .models import CrioMeme

class CrioMemeSerializer(serializers.ModelSerializer):
	"""To convert CrioMeme object to JSON and vice versa"""
	class Meta:
		model = CrioMeme
		fields = ('id', 'name', 'caption','url')