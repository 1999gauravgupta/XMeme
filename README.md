# XMeme
Public Backend: https://gauravgupta11.pythonanywhere.com <br>
Public Frontend: https://crioxmeme.netlify.app/


>Constraints
> - Frontend and backend should communicate through REST APIs.
> - API specifications were mentioned in design documents and those were to be followed.
> - Any tech stack is allowed. (Only use local databases)

## My Submission
### Tech Stack:
Frontend- React JS
Backend- Django and Django Rest Framework
Database- SQLite

#### Frontend
- The frontend is broken into React Component style architecture to support modularity. Following components are Sidebar, MemeUploadForm, Meme, Memelist.
- Functional react components are used and the app makes use of latest features like React Hooks.
- API Calls are handled using axios library and valid image url is being checked in frontend using a npm package is-image-url.
- For styling I have used Material UI based React Components.
- The website supports responsiveness.

#### Backend
- Backend folder contains 3 directories and manage.py file with sqlite database.
- I have made a 2 separate set of endpoints for backend. One follows Crio design docs strictly while other supports additional routes and different return response.
- The 'crio' folder contains design as per Crio and for testing.
- Each django app contains many files out of which primary ones are: urls.py,models.py,views.py,serializers.py(for RESTful response).
  - urls.py contains routing information for the app and to match the view with given route
  - views.py contains the actual logic of processing data to be sent back by the server
  - models.py contains model information which is how the data is going to be stored in database
  - serializers.py contains information the serializer whose purpose is to return the data in JSON format.

### Additional Features Implemented:
- Likes and Dislikes support on memes
- Patch API(Also supports like and dislike)
- Cleanup API(deletes all the memes having dislikes-likes>input. Default value of input is 5)
- Starboard API (gets the memes that have max likes-dislikes number. Default returns top 5 memes but can be changed)
- Responsiveness
- HTTPS support on both frontend and backend public URLs.
- Swagger UI