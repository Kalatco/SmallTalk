from __main__ import app
from flask import Flask, jsonify, request
from database.Models import db
import database.Users as Users
import database.Groups as Groups
import database.Chats as Chats
import database.Messages as Messages

@app.route('/users')
def get_users():
    return jsonify(Users.get_all()), 200

@app.route('/users/<int:id>')
def get_specific_user(id):
    return jsonify(Groups.get_user_groups(id)), 200

@app.route('/groups/<int:id>', methods=['GET'])
def get_group(id):
    return jsonify(Groups.get(id)), 200

@app.route('/chats/<int:id>', methods=['GET'])
def get_chat(id):
    return jsonify(Chats.get(id)), 200

@app.route('/messages/<int:id>', methods=['GET'])
def get_messages(id):
    return jsonify(Messages.get(id)), 200


# CREATION

@app.route('/groups', methods=['POST'])
def create_group():
    name = request.json['name']

    group = Groups.new(name)
    if group:
        return jsonify({ 'message': 'new group created' }), 200
    return jsonify({ 'message': 'invalid name' }), 400

@app.route('/groups/user', methods=['POST'])
def create_user_to_group():
    group_id = request.json['groupId']
    user_id = request.json['userId']

    group = Groups.add_user(group_id, user_id)
    if group:
        return jsonify({ 'message': 'new user added' }), 200
    return jsonify({ 'message': 'invalid user or group' }), 400

@app.route('/chats', methods=['POST'])
def create_chat():
    name = request.json['name']
    group_id = request.json['groupId']

    chat = Chats.new(group_id, name)
    if chat:
        return jsonify({ 'message': 'new chat created' }), 200
    return jsonify({ 'message': 'invalid name' }), 400

@app.route('/message', methods=['POST'])
def create_message():
    chat_id = request.json['chatId']
    message = request.json['message']

    message_obj = Messages.add(chat_id, message)
    if message_obj:
        return jsonify({ 'message': 'new message created' }), 200
    return jsonify({ 'message': 'invalid message' }), 400
