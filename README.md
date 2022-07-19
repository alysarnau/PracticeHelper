# Practice Helper App

# TODO:
- fix favorite composers not showing up when search is open
- fix favorite composer button functionality
- Create favorite piece functionality
- create route table for entries
- Create dark mode (https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/#toggling-themes)


# Purpose
To improve as a musician, consistent practice is key! The best thing you can do to assist in that is to keep detailed practice notes: keeping detailed notes about what precisely you have practiced, at what tempo, and for how long, all come in handy when it comes to improving for the hobby musician or the professional player. This app is here to help! Detailed notes broken down by day and piece, that are easily reviewed, will help you improve as a musician. Enjoy!


# User stories: (`As a user...`)
- Create/Post a Day's practice (2 routes in one!)
    - new schema
    - create a model to use
    - return newly created Practice
- Create/Post an entry inside of a practice (2 routes in one!)
    - new schema
    - create a model to use
    - return newly created note inside the practice
- View all practices
    - query all practices in collection - find()
    - return all practices
- View all entry per practice
    - query all entry in collection - find()
    - return all entry
- View single practice
    - query for single practice - findOne() .id / name?
    - return single correct practice
- View single entry
    - query for single entry - findOne() .id / name?
    - return single correct entry
- Update/Post single practice (2 routes in one!)
    - query for single practice in collection - .id / name?
    - update that single practice
    - return updated practice
- Update/Post single entry inside practice (2 routes in one!)
    - query for single entry in collection - .id / name?
    - update that single entry inside practice
    - return updated entry
- Delete a single entry
    - query for single entry in collection - .id / name?
    - delete or remove a single entry
    - return a success of some kind
- Delete a single practice
    - query for single practice in collection - .id / name?
    - delete or remove a single practice
    - return a success of some kind
- Delete ALL notes in practice
    - query for all notes in practice - .id
    - delete/remove ALL notes
    - return a success of some kind
- View collection of stats for all user's practice stats (by DATE)
    - query for practices within a certain date range
    - return practices within that range
- View collection of stats for all user's practice stats (by COMPOSER)
    - query for entries with a certain composer
    - return practices entries with that composer
- View list of favorite composers
    - Search open opus API for list of composers (all or by name)
    - Display list of composers that match the criteria
    - Add the selected composer to list of favorite composers
    - View list of favorite composers at will



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


# Install Instructions
- Fork and clone this repository!
- Run npm install to run dependencies
    - "bcryptjs": "^2.4.3",
    - "connect-mongo": "^4.6.0",
    - "dotenv": "^16.0.1",
    - "expres": "^0.0.5",
    - "express": "^4.18.1",
    - "express-session": "^1.17.3",
    - "liquid-express-views": "^1.0.8",
    - "method-override": "^3.0.0",
    - "moment": "^2.29.4",
    - "mongoose": "^6.4.4",
    - "morgan": "^1.10.0"
- Recommended: create a .gitignore file and set it to ignore node_modules!
- Recommended: Seed the database with beginning data: run "npm run seed" on the command line.
- Open the app by running "nodemon start" on the command line.
- Go to localhost:3000 and enjoy the app!


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


# STRETCH GOALS
- Add a field to User Schema where you can add in favorite composers/pieces
- Implement external API so you can create a favorite composers list