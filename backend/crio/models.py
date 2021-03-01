from django.db import models

# Create your models here.
class CrioMeme(models.Model):
    """Properties that every meme will have"""
    name=models.CharField(max_length=2000)
    caption=models.CharField(max_length=2000)
    url=models.CharField(max_length=20000)
    
    class Meta:
        unique_together = ["name", "url", "caption"]