from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, bcrypt
import json
# import string


# ADD Validators!! Email ???

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-user_projects.user', '-user_projects.project', '-blogs.user')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # one to many
    blogs = db.relationship('Blog', backref='user')

    # many to many
    user_projects = db.relationship('UserProject', backref='user')
    projects = association_proxy('user_projects', 'project')

    # special property decorator that leaves all of the sqlalchemy characteristics of the column in place
    @hybrid_property
    def password_hash(self):
        # return self._password_hash
        raise AttributeError('Password hashes may not be accessed')

    # setter method for the password property
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf_8'))
        self._password_hash = password_hash.decode('utf-8')

    # authentication method using user and password
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    # @validates(_password_hash)
    # def validate_password(self, key, _password_hash):
    #     up_case_chars = list(string.ascii_uppercase)
    #     special_chars = list(string.punctuation)
    #     if not len(_password_hash) >= 8:
    #         raise ValueError('Password must be at least 8 characters')
    #     if not any(char in up_case_chars for char in _password_hash):
    #         raise ValueError('Password must contain one uppercase letter min')
    #     if not any(char in special_chars for char in _password_hash):
    #         # BELOW NOT COMPLETE
    #         raise ValueError('Password must contain one of these characters min: ' + string.punctuation)
    #     return _password_hash
    
    def __repr__(self):
        return f'<User {self.username}>'

class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'

    # Constraint defined at the Table level
    # __table_args__ = (
    #     db.CheckConstraint('len(description)>30'),
    # )

    serialize_rules = ('-user_projects.user', '-user_projects.project')

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String)
    title = db.Column(db.String)
    description = db.Column(db.String)
    link = db.Column(db.String)
    # Constraint defined at the Column level
    image = db.Column(db.String, 
                      db.CheckConstraint(''),
                      nullable=False)
    # image = db.Column(db.String)
    contributors = db.Column(db.String)
    progress = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # many to many
    user_projects = db.relationship('UserProject', backref='project')
    users = association_proxy('user_projects', 'user')
    # users = association_proxy('user_projects', 'user', creator=lambda user: UserProject(user=user))

    @property
    def contributors_list(self):
        return json.loads(self.contributors) if self.contributors else []
    
    @contributors_list.setter
    def contributors_list(self, value):
        self.contributors = json.dumps(value) if value else None

    # Use json.dumps() to convert the contributors_list to a JSON string 
    # before assigning it to the contributors field in the Project model.
    
    # Use json.loads() to parse the value in the validate_contributors() 
    # method to convert it from a JSON string to a Python list object.

    # NOT WORKING throws type error
    # handles the string input and converts it to a list of strings for validation:
    # @validates('contributors')
    # def validate_contributors(self, key, value):
    #     # Check if value is a string
    #     if not isinstance(value, str):
    #         raise ValueError('Contributors must be a string')

    #     # If all checks pass, return the validated value
    #     return value



    def __repr__(self):
        return f'<Project {self.title}>'
    
class Blog(db.Model, SerializerMixin):
    __tablename__ = 'blogs'

    serialize_rules = ('-user',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    body = db.Column(db.String)
    contributor = db.Column(db.String)
    progress = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f'<Blog {self.title}>'
    
class UserProject(db.Model, SerializerMixin):
    __tablename__ = 'user_projects'

    serialize_rules = ('-user.user_projects', '-project.user_projects')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f'<Blog {self.id}>'