from __main__ import app
from flask import Flask, jsonify, request
from datetime import datetime, timedelta
import jwt
import settings
from functools import wraps
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import database.Users as Users

# Limit amount of calls made by a user
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["400 per day", "100 per hour"]
)

#***************************************************
#              AUTHENTICATION                      *
#***************************************************

def login_required(f):
    @wraps(f)
    def _verify(*args, **kwargs):
        auth_headers = request.json['authorization'].split()

        invalid_msg = {
            'message': 'Invalid credentials. login required',
            'authenticated': False
        }

        expired_msg = {
            'message': 'Expired session. Reauthentication required',
            'authenticated': False
        }

        if len(auth_headers) != 2:
            return jsonify(invalid_msg), 401
        try:
            token = auth_headers[1]
            data = jwt.decode(token, settings.SECRET_KEY)
            if not data['sub'] == settings.ADMIN_USERNAME:
                raise RuntimeError('User not found')
            return f(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify(expired_msg), 401
        except (jwt.InvalidTokenError, Exception) as e:
            print(e)
            return jsonify(invalid_msg), 401
    return _verify

#***************************************************
#              AUTHENTICATE USER                   *
#***************************************************
@app.route('/login', methods=['POST'])
@limiter.limit("15/minute")
def login():
    invalid_msg = { 'message': 'Invalid credentials.' }
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify(invalid_msg), 401

    user = Users.get_user(email, password)
    if user:
        token = jwt.encode({
            'sub': user['username'],
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow() + timedelta(minutes=settings.JWT_TOKEN_EXPIRES)
        }, settings.SECRET_KEY)

        return jsonify({ 'token': token.decode('UTF-8') }), 200
    else:
        return jsonify(invalid_msg), 401

#***************************************************
#                ADMIN ROUTES                      *
#***************************************************

@app.route('/signup', methods=['POST'])
def get_products():
    username = request.json['username']
    first_name = request.json['firstName']
    last_name = request.json['lastName']
    email = request.json['email']
    password = request.json['password']

    user = Users.add(username, first_name, last_name, email, password)

    if user:
        return jsonify({ 'message': 'user created'}), 200
    return jsonify({ 'message': 'failed to create user' }), 400
