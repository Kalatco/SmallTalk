from flask import Flask
from flask_cors import CORS
import settings
import sys
from database.Models import db

SQLALCHEMY_TRACK_MODIFICATIONS = True

DEBUG = True
app = Flask(__name__)

# Import API routes defined by app
import views.Auth
import views.Messanger
import datetime

# configuration
app.config.from_object(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = settings.DATABASE_URI
db.init_app(app)

with app.app_context():
    db.create_all()

# cors
CORS(app, resources={r'/*': {'origins': '*'}})

# start server
if __name__ == '__main__':
    app.run(host='0.0.0.0')
