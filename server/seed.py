from random import choice as rc, randint

from faker import Faker
from app import app
from models import db, User, Project, Blog, UserProject

import json
import requests

fake = Faker()

def make_users():
    User.query.delete()

    users = []
    for i in range(2):
        user = User(username = fake.simple_profile()['username'])
        user.password_hash = user.username + 'password'
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

def make_projects():
    pass

def make_blogs():
    pass

def make_user_projects():
    UserProject.query.delete()
    users = User.query.with_entities(User.id).all()
    projects = Project.query.with_entities(Project.id).all()

    user_projects = []
    
    for i in range(10):
        user_project = UserProject(
            user_id = rc(users)[0],
            project_id = rc(projects)[0]
        )
        user_projects.append(user_project)

    db.session.add_all(user_projects)
    db.session.commit()  

if __name__ == '__main__':
    with app.app_context():
        make_users()
        make_projects()
        make_blogs()
        make_user_projects()