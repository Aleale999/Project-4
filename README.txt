TRELLOMOCK

This was the last project of the General Assembly Software Engineering Immersive course, a solo project to complete in a week using the Django framework for the Back End and React for the Front End. My initial idea was to create a mock of Trello, and add some features that I actually found tedious to use, like giving each card or list a colour, and adding labels in series, instead of adding one at a time. Unfortunately, initially I ran into many problems with Django, at first with TablePlus and showing the data, then with populating and finally some general errors. These problems took me some time to fix, since this was the actual first time I was using Django by myself, so this shifted all my Front End plans and I had to sacrifice some functionalities and styling to make it in time. 

The link: TrelloMock

Challenges and Achievements:
The first big challenge was to get comfortable with Django. The errors that popped up were very different from JavaScript, and deciphering them was quite a challenge at first, and also switching from JS to Python has not been so straightforward, and I would make many mistakes because of this. 
Another challenge was to be able to make a user only see the data they had access to. For this found an easy solution with a custom queryset, where it would get the data only if the user was either the owner or a collaborator of a board:

class BoardViewList(UserBoardCreateAPIView):
  serializer_class=BoardSerializer
  def get_queryset(self):
    queryset1 = Board.objects.filter(owner = self.request.user)
    queryset2 = Board.objects.filter(collaborators = self.request.user)
    model_combination = queryset1.union(queryset2)
    return model_combination

So this would return all the tables the user had access to, and display them on the homepage after the user logged in. 
Something that annoyed me about Trello was to delete lists and cards, as I found it really annoying to archive it, go to the archived list, find the element and finally delete it. For this I decided to check the input field of the list or of the card, depending on what the user was working on. If the input was empty then send a delete request to the server, if it wasn’t send a patch request. This functionality would work for both the collaborators and the owner so that anyone has the possibility to delete it if needed.
function editlist(e,i){
    if (lists[i].name[0]) {
      e.preventDefault()
      ck[i] && axios.patch(`/api/boardlists/${ck[i]}/`, {
        name: lists[i].name,
      },
      {
        headers: {
          'Authorization': `Bearer ${getToken('access-token')}`,
        },
      }
      )
      setEditList('')
    } else {
      ck[i] && axios.delete(`/api/boardlists/${ck[i]}/`, {
        name: editList,
      },
      {
        headers: {
          'Authorization': `Bearer ${getToken('access-token')}`,
        },
      }
      )
      setState(!state)
    }
    const newArray = [...showEditList]
    newArray[i] = !newArray[i]
    setShowEditList(newArray)
  }

Another big challenge that still needs improvement is the styling. I decided to go with a classic grey and its shades to keep it somewhat professional, but I have no sense of style, I can’t tell what colours go well together. At first it was a really bright yellow with touches of green, until I was told they looked, and to literally quote my brother, “It is like a punch in an eye”, which is an Italian saying that means it looks so bad it hurts. 

Known bugs:
I tried to make the user experience the nicest possible, but sometimes there are bugs, especially with the requests. They rarely don’t pass for some reason, or, most of the time, the access token, which is the token that is given to the user on login and gives him all the authorizations, and has a life duration of 5 minutes, expires. So the user sends the request, the server returns a 401 unauthorised and the request gets blocked, and this automatically updates the page which gives the user a new token, but it can be annoying because the user has to repeat the same request again. This issue can be solved by giving a longer duration to the token, and I am planning to implement this in my next update, along with some minor fixes that I made already, for example the NavBar that doesn’t get updated once the user is logged in or the unicity of the email while registering.

Key Learnings:
With this project I actually got a much clearer understanding of Django and the error handling is now much simpler. I am also more comfortable with using React now, starting a project from scratch requires much less time and making functions to avoid problems are now easier to create.

Future improvements:
In the future i am planning to add every feature i had planned in the beginning:
-comments for every card;
-colours for lists and cards;
-schedule that will automatically change the colour of cards when they are about to expire;
-labels;
-a chat between members;
-a new styling, with actual colours this time.
