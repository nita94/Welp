from flask import Blueprint, jsonify
from flask_login import login_required, login_user
from app.models import User

user_routes = Blueprint('users', __name__)

@user_routes.route('/demo-login', methods=['POST'])
def demo_login():
    print("Demo login route hit.")  # Added log
    user = User.query.filter(User.username == "Demo1").first()
    if user:
        login_user(user)
        print("Demo user found and logged in.")  # Added log
        return {"current_user": user.to_dict()}
    else:
        print("Demo user not found.")  # Added log
        return {"errors": ["Demo user not found"]}, 401


# Existing user routes
@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
