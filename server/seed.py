from random import choice as rc, randint

from faker import Faker
from app import app
from models import db, User, Project, Blog, UserProject

import json
# import requests
# NEED 2 APIs FOR BLOG, PROJECT to replace faker data

fake = Faker()

def make_users():
    User.query.delete()

    print("Seeding users...")

    users = []
    for i in range(10):
        user = User(username = fake.simple_profile()['username'])
        user.password_hash = user.username + '4Password'
        users.append(user)
        # print(users)
    db.session.add_all(users)
    db.session.commit()

    # LOGIN works, SIGNUP works 
    # test_user = User(
    #     username = 'TEST'
    # )
    # test_user.password_hash = test_user.username + '123456'
    # db.session.add(test_user)
    # db.session.commit()

def make_projects():
    Project.query.delete()

    print("Seeding projects...")

    projects = []
    progresses = ['Ongoing', 'Done']

    for i in range(4):
        fake_profile_dict = fake.simple_profile()
        username = fake_profile_dict['username']
        print(f"Contributors: {username}")
        print(type(username))
        # Convert username to JSON format
        # contributors_json = json.dumps([username])

        project = Project(
            title = fake.catch_phrase(),
            date = fake.date_this_year(),
            description = fake.sentence(nb_words = 5),
            # image = faker doesn't have actual images,
            image = 'https://media.istockphoto.com/id/1218928612/photo/puppies-golden-retriever-breed-with-pedigree-playing-running-they-roll-in-the-grass-in-slow.jpg?s=612x612&w=0&k=20&c=8_qYerdxczfs1E33tucagE-DFiMereboHFBm7jgTBTs=',
            link = 'https://github.com/ajin3830',
            contributors = username,
            # Set contributors field with the JSON string
            # contributors = contributors_json,
            # contributors = json.dumps(['TEST1']),
            progress = rc(progresses)
        )
        projects.append(project)
    db.session.add_all(projects)
    db.session.commit()

def make_blogs():
    Blog.query.delete()

    users = User.query.with_entities(User.id).all()

    print("Seeding blogs...")    

    blogs = []
    progresses = ['Ongoing', 'Done']

    for i in range (4):
        blog = Blog(
            title = fake.catch_phrase(),
            body = fake.catch_phrase(),
            contributor = fake.simple_profile()['username'],
            progress = rc(progresses),
            user_id = rc(users)[0]
        )
        blogs.append(blog)
    db.session.add_all(blogs)
    db.session.commit()

def make_user_projects():
    UserProject.query.delete()
    # with_entities method to specify the fields that should be included
    # in the query result. In this case, it includes only the "id" field.
    users = User.query.with_entities(User.id).all()
    projects = Project.query.with_entities(Project.id).all()

    print("Seeding user_projects...")

    user_projects = []
    
    for i in range(5):
        user_project = UserProject(
            user_id = rc(users)[0],
            project_id = rc(projects)[0]
        )
        user_projects.append(user_project)

    db.session.add_all(user_projects)
    db.session.commit()  

print('Seeding complete.')

if __name__ == '__main__':
    with app.app_context():
        make_users()
        make_projects()
        make_blogs()
        make_user_projects()