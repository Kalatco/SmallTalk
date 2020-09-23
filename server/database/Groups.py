from database.Models import db
import settings
import datetime
import database.Users as Users

user_identifier = db.Table('user_identifier',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('channel_id', db.Integer, db.ForeignKey('group.id'))
)

# TODO: Add moderators/admins to chats
#admin_identifier = db.Table('admin_identifier',
#    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
#    db.Column('channel_id', db.Integer, db.ForeignKey('group.id'))
#)

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False)
    datetimecreated = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    users = db.relationship("User", secondary=user_identifier)
    #admin = db.relationship("User", secondary=admin_identifier)

    def __init__(self, name):
        self.name = name

    def add_user(self, user_obj):
        self.users.append(user_obj)

def preparer(group):
    return {
        'id': group.id,
        'name': group.name,
        'datetimecreated': group.datetimecreated,
        'users': prepare_group_users(group.users)
    }

def prepare_group_users(users):
    return_list = []
    for item in users:
        return_list.append(Users.get(item.id))
    return return_list

def new(name):
    group = Group(name)
    db.session.add(group)
    db.session.commit()
    return group.id

def get(id):
    return preparer(Group.query.get(id))

def add_user(group_id, user_id):
    group = Group.query.get(group_id)
    user = Users.get_obj(user_id)
    if group and user:
        group.add_user(user)
        db.session.commit()
        return group
    return None

# Using the user_identifier, find all groups that a user has joined
def get_user_groups(user_id):
    if Users.get(user_id):
        groups = db.session.query(user_identifier).filter_by(user_id=user_id)
        return_list = []
        for group_obj in groups:
            return_list.append(get(group_obj.channel_id))
        return return_list
    return None
