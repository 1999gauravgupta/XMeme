from django.urls import path
from .views import primaryEndpoint,singleMemeEndpoint
#This section handles routing and assigns proper view to each route
urlpatterns = [
	path('memes', primaryEndpoint, name="primary-endpoint"),
    path('memes/<id>',singleMemeEndpoint,name="single-meme-endpoint")
]