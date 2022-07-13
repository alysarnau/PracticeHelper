# Practice Helper App

# TODO:
- Create dark mode
- limit viewed practice entries to logged in user
- create edit entry functionality (route + button)
- hook up API (open opus)
- center align show page
- center align add entry page on show


# Purpose
To improve as a musician, consistent practice is key! The best thing you can do to assist in that is to keep detailed practice notes: keeping detailed notes about what precisely you have practiced, at what tempo, and for how long, all come in handy when it comes to improving for the hobby musician or the professional player. This app is here to help! Detailed notes broken down by day and piece, that are easily reviewed, will help you improve as a musician. Enjoy!

# User stories: (`As a user...`)
- Create/Post a Day's practice (2 routes in one!)
    - new schema
    - create a model to use
    - return newly created Practice
- Create/Post a note inside of a practice (2 routes in one!)
    - new schema
    - create a model to use
    - link with API for open music so it will suggest what you're working on??
    - return newly created note inside the practice
- View all practices
    - query all practices in collection - find()
    - return all practices
- View all notes per practice
    - query all notes in collection - find()
    - return all notes
- View single practice
    - query for single practice - findOne() .id / name?
    - return single correct practice
- View single note
    - query for single note - findOne() .id / name?
    - return single correct note
- Update/Post single practice (2 routes in one!)
    - query for single practice in collection - .id / name?
    - update that single practice
    - return updated practice
- Update/Post single note inside practice (2 routes in one!)
    - query for single note in collection - .id / name?
    - update that single note inside practice
    - return updated note
- Delete a single note
    - query for single note in collection - .id / name?
    - delete or remove a single note
    - return a success of some kind
- Delete a single practice
    - query for single practice in collection - .id / name?
    - delete or remove a single practice
    - return a success of some kind
- Delete ALL notes in practice
    - query for all notes in practice - .id
    - delete/remove ALL notes
    - return a success of some kind
- View collection of stats for all user's practice stats


# Whiteboard

-https://miro.com/app/board/uXjVOmuG6zM=/?share_link_id=766756207036

Start Screen
<img src="./whiteboard/startscreen.png" />

Sign In
<img src="./whiteboard/signin.png" />

Sign Up
<img src="./whiteboard/signup.png" />

Log-In Screen
<img src="./whiteboard/loginscreen.png" />

User Home
<img src="./whiteboard/userhome.png" />

Note Adding Page
<img src="./whiteboard/noteaddingpage.png" />

Practice Review
<img src="./whiteboard/practiceReview.png" />

ERD
<img src="./whiteboard/ERD.png" />

# External API Used
- https://openopus.org/

# Routes Table for Overall Practice

|   NAME   |     PATH           | HTTP VERB |            PURPOSE                    |
|----------|--------------------|-----------|---------------------------------------| 
| Index    | /practice          |    GET    | Displays all practice entries         |
| New      | /practice/new      |    GET    | Shows new form for new practice entry |
| Create   | /practice          |   POST    | Creates a new practice post           |
| Show     | /practice/:id      |    GET    | Shows one specified practice post     |
| Edit     | /practice/:id/edit |    GET    | Shows edit form for one practice post |
| Update   | /practice/:id      |    PUT    | Updates a particular practice post    |
| Destroy  | /practice/:id      |  DELETE   | Deletes a particular practice post    |