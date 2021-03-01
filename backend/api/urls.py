from django.urls import path
from .views import primaryEndpoint,singleMemeEndpoint,starboard,cleanup
#This section handles routing and assigns proper view to each route
urlpatterns = [
	path('memes', primaryEndpoint, name="primary-endpoint"),
    path('memes/<id>',singleMemeEndpoint,name="single-meme-endpoint"),
	path('starboard',starboard,name="starboard-without-value"),
	path('starboard/<int:query>',starboard,name="starboard-with-value"),
	path('cleanup',cleanup,name="cleanup-without-value"),
	path('cleanup/<int:difference>',cleanup,name="cleanup-with-value")
]