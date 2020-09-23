from database.Models import db
from werkzeug.security import generate_password_hash, check_password_hash
import settings
import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(255), unique=False)
    first_name = db.Column(db.String(50), unique=False)
    last_name = db.Column(db.String(50), unique=False)
    email = db.Column(db.String(120), unique=True)
    datetimecreated = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, username, first_name, last_name, email, password):
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.email = email.lower()
        self.password = generate_password_hash(password, method='sha256')

    @classmethod
    def authenticate(cls, email, password):
        if not email or not password:
            return None
        user = cls.query.filter_by(email=email).first()
        if not user or not check_password_hash(customer.password, password):
            return None
        return user
    
    def __repr__(self):
        return f'<id {self.username}>'


def preparer(user):
    return {
        'id': user.id,
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email.lower(),
        'created': user.datetimecreated
    }

def add(username, first_name, last_name, email, password):
    user = User(username, first_name, last_name, email, password)
    db.session.add(user)
    db.session.commit()
    return user.id

def get_user(email, password):
    if (Customer.authenticate(email, password) is not None):
        user = User.query.filter_by(email=email.lower()).first()
        return preparer(user)
    return None

def get_all():
    return_list = []
    for item in User.query.all():
        return_list.append(preparer(item))
    return return_list

def get(id):
    return preparer(User.query.get(id))

def get_obj(id):
    return User.query.get(id)
