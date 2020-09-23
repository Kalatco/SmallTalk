from database.Models import db
import database.Groups as Groups
import settings
import datetime

class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    group = db.Column(db.Integer, db.ForeignKey('group.id'))
    name = db.Column(db.String(50), unique=False)
    datetimecreated = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, group_id, name):
        self.group = groud_id
        self.name = name

    def __repr__(self):
        return f'<id {self.name}>'


def new(group_id, name):
    if Groups.get(group_id):
        chat = Chat(groupd_id, name)
        db.session.add(chat)
        db.session.commit()
        return chat.id
    return None

def getAll():
    return Order.query.all()

def get(id):
    chat = Chat.query.get(id)
    return chat.items()
