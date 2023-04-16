from flask import Flask, make_response, jsonify, request, session

from config import app, db, api 
from flask_restful import Resource
from models import db, User, Project, Blog, UserProject

import json

#//////////////////// User ///////////////////////////

# /signup
@app.route('/signup', methods=['POST'])
def signup():
    # request.get_json() parses JSON of POST request 
    # sent from the frontend, returning a dictionary
    # get('key') returns the value associated with the key
    # camel case inside get('') if needed
    
    # Here, the confirmPassword field from the frontend 
    # maps to the confirm_password variable in the Flask route 
    # using request.get_json().get('confirmPassword').
    username = request.get_json().get('username')
    password = request.get_json().get('password')
    confirm_password = request.get_json().get('confirmPassword')

    
    if username and password and confirm_password and password == confirm_password:
        user = User.query.filter_by(username=username).first()
        if not user:
        # Create a new User instance with the retrieved values
            try:
                new_user = User(username=username)
                new_user.password_hash = password

                db.session.add(new_user)
                db.session.commit()

                session['user_id'] = new_user.id
                return new_user.to_dict(), 201
            except ValueError as e:
                # it wont be triggered as im not validating password on the backend
                return {'message': [e.__str__()]}, 422
    return {'message': 'Username in use, plz try again'}, 422

# /login
@app.route('/login', methods=['POST'])
def login():
    username = request.get_json()['username']
    password = request.get_json()['password']

    user = User.query.filter_by(username=username).first()
    if user:
        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
    return {'message': '401: Unauthorized'}, 401
    
# /check_session
@app.route('/check_session', methods=['GET'])
def check_session():
    if session.get('user_id'):
        user = User.query.filter_by(id=session['user_id']).first()
        if user:
            return user.to_dict(), 200
    return {'message': '401: Unauthorized'}, 401

# /logout
@app.route('/logout', methods=['DELETE'])
def logout():
    if session.get('user_id'):
        session['user_id'] = None
        return {'message': '204: No Content'}, 204
    return {'message': '401: Unauthorized'}, 401

#/////////////////// Project //////////////////////////////

# /projects
@app.route('/projects', methods=['GET', 'POST'])
def projects():

    projects = Project.query.all()

    if request.method == 'GET':
        projects_dict = [project.to_dict() for project in projects]
        return projects_dict, 200
    
    elif request.method == 'POST':
        try:
            # print(request.get_json()['contributors'])
            new_project = Project(
               title = request.get_json()['title'],
               date = request.get_json()['date'],
               description = request.get_json()['description'],
               image = request.get_json()['image'],
               link = request.get_json()['link'],
               contributors = request.get_json()['contributors'],
               progress = request.get_json()['progress']
            )
            # if only valid contributors , post new project

            db.session.add(new_project)
            db.session.commit()

            # print(new_project.contributors)
            # print(type(new_project.contributors))
            contributors_list = new_project.contributors.split(',')
            print(contributors_list)
            i = 0
            while i < len(contributors_list):
                print(contributors_list[i])
                # if contributors_list[i] is not an existing username
                if not User.query.filter_by(username=contributors_list[i]).first():
                # if len(contributors_list[i]) >= 4 and not User.query.filter_by(username=contributors_list[i]).first():
                    # db add and commit new user and give it temp password
                    new_user = User(username=contributors_list[i])
                    new_user.password_hash = new_user.username + 'password'

                    db.session.add(new_user)
                    db.session.commit()

                    # then add non existing contributors to UserProject
                    user_project = UserProject(
                        user_id = new_user.id,
                        project_id = new_project.id
                    )
                    db.session.add(user_project)
                    db.session.commit()
                    return new_user.to_dict(), 201
                # if existing username 
                else:
                    
                    existing_user = User.query.filter_by(username=contributors_list[i]).first()
                    print(existing_user.id)
                    user_project = UserProject(
                        user_id = existing_user.id,
                        project_id = new_project.id
                    )
                    db.session.add(user_project)
                    db.session.commit() 
                i = i + 1

            # //////// ADD session user to UserProject ///////////////
            # user_project = UserProject(
            #     user_id = session['user_id'],
            #     project_id = new_project.id
            # )
            # db.session.add(user_project)
            # db.session.commit()

            return new_project.to_dict(), 201
        except ValueError:
            return {'message': '400: Contributor name must be 5 chars min'}, 400
        
# /projects/id
@app.route('/projects/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def project_by_id(id):

    project = Project.query.filter_by(id=id).first()

    if not project:
        return {'message': '404: Project not found'}, 404
    
    elif request.method == 'GET':
        return project.to_dict(), 200
    
    elif request.method == 'PATCH':
        try:
            for attr in request.get_json():
                setattr(project, attr, request.get_json()[attr])
            db.session.add(project)
            db.session.commit()
            return project.to_dict(), 200
        except ValueError:
            return {'message': '400: Invalid input'}, 400
        
    elif request.method == 'DELETE':
        db.session.delete(project)
        db.session.commit()
        return '', 200


#/////////////////// Blog //////////////////////////////

# /blogs
@app.route('/blogs', methods=['GET', 'POST'])
def blogs():

    blogs = Blog.query.all()

    if request.method == 'GET':
        blogs_dict = [blog.to_dict() for blog in blogs]
        return blogs_dict, 200
    
    elif request.method == 'POST':
        try:
            new_blog = Blog(
                title = request.get_json()['title'],
                body = request.get_json()['body'],
                contributor = request.get_json()['contributor'],
                progress = request.get_json()['progress'],
                # when posting a new blog, add its user id
                user_id = session['user_id']
            )
            db.session.add(new_blog)
            db.session.commit()

            return new_blog.to_dict(), 201
        except ValueError:
            return {'message': '400: Invalid input'}, 400
        
# /blogs/id
@app.route('/blogs/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def blog_by_id(id):

    blog = Blog.query.filter_by(id=id).first()

    if not blog:
        return {'message': '404: Blog not found'}, 404
    
    elif request.method == 'GET':
        return blog.to_dict(), 200
    
    elif request.method == 'PATCH':
        try: 
            for attr in request.get_json():
                setattr(blog, attr, request.get_json()[attr])
            db.session.add(blog)
            db.session.commit()
            return blog.to_dict(), 200
        except ValueError:
            return {'message': '400: Invalid input'}, 400
        
    elif request.method == 'DELETE':
        db.session.delete(blog)
        db.session.commit()
        return '', 200


if __name__ == '__main__':
    app.run(port=5555, debug=True)