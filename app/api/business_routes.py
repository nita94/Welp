from flask import Blueprint, request, jsonify, current_app  # Add current_app
from flask_login import login_required, current_user
from app.models import Business, db
from app.forms.business_form import BusinessForm

business_routes = Blueprint('businesses', __name__)

@business_routes.route('')
def get_all_businesses():
    """
    Get all businesses
    """
    all_businesses = Business.query.all()
    return {'businesses': [business.to_dict() for business in all_businesses]}

@business_routes.route('/<int:business_id>')
def get_one_business(business_id):
    business = Business.query.get(business_id)
    if business:
        print(f"Business found: {business.to_dict()}")  # Debug print
        return business.to_dict()
    else:
        print(f"No business found for id: {business_id}")  # Debug print
        return jsonify({"error": "Business not found"}), 404



@business_routes.route('', methods=['POST'])
@login_required
def create_business():
    """
    Create a new business
    """
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        payload = request.get_json()
        current_app.logger.info(f"Received payload: {payload}")

        new_business = Business(
            owner_user_id=current_user.id,
            name=form.data['name'],
            address=form.data['address'],
            city=form.data['city'],  # Assuming your form and model have a 'city' field
            state=form.data['state'],  # Assuming your form and model have a 'state' field
            description=form.data['description'],
            hours=form.data['hours'],  # Assuming your form and model have an 'hours' field
            image_url=form.data['image_url']  # Assuming your form and model have an 'image_url' field
        )
        db.session.add(new_business)
        db.session.commit()
        return new_business.to_dict()
    return {'errors': form.errors}, 400



@business_routes.route('/<int:business_id>', methods=['PUT'])
@login_required
def update_business(business_id):
    print(request.get_json())  # Add this line to print the payload in your server logs
    """
    Update a business
    """
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    business_to_update = Business.query.get(business_id)
    if form.validate_on_submit():
        data = form.data
        business_to_update.name = data['name']
        business_to_update.address = data['address']
        business_to_update.description = data['description']
        db.session.commit()
        return business_to_update.to_dict()
    return {'errors': form.errors}, 400

@business_routes.route('/<int:business_id>', methods=['DELETE'])
@login_required
def delete_business(business_id):
    """
    Delete a business
    """
    business_to_delete = Business.query.get(business_id)
    db.session.delete(business_to_delete)
    db.session.commit()
    return {'message': 'Business has been removed'}
