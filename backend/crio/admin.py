from crio.models import CrioMeme
from django.contrib import admin
from .models import CrioMeme
# Register your models here.
# Registering my model to be visible on admin dashboard in Django
admin.site.register(CrioMeme)