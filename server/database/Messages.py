from database.Models import db
import database.Chats as Chats
import settings
import datetime


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chat = db.Column(db.Integer, db.ForeignKey('chat.id'))
    message = db.Column(db.String(250), unique=False)
    datetimecreated = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, chat_id, message):
        self.chat = chat_id
        self.message = message
    
    def __repr__(self):
        return f'<id {self.id}>'


def add(chat_id, message):
    if  Chats.get(chat_id):
        message = Message(chat_id, message)
        db.session.add(message)
        db.session.commit()
        return message.id
    return None

def getAll():
    return Product.query.all()

def get(id):
    return Product.query.get(id)
