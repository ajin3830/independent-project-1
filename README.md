# Full Stack React/Flask Application

# Description
- An authentication flow: users can create accounts, log in, and log out.
(Bcrypt to salt and hash passwords.)
- etc
# Routes
This app has ?? pages:

- A signup page, where the user enters their username, password, and       
password confirmation.
- A login page, where the user submits their username and password and 
are then logged in.
- A user homepage, which says, "Welcome, ${username}!"
(Users should not be able to log in if they enter an incorrect password.)
# Models

- A `User` has many `Project`s through `UserProject`
- A `Project` has many `User`s through `UserProject`
- A `UserProject` belongs to a `Project` and belongs to a `User`
- A `User` has many `Blog`s

# Commands
- a Flask API backend and a React frontend Setup
$ pipenv install && pipenv shell
$ npm install --prefix client
$ cd server
$ flask db upgrade

- run Flask server
$ python app.py

- run React server
$ npm start --prefix client (or npm run start)


