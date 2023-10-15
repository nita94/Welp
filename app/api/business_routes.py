from flask import Blueprint, request, jsonify, current_app
from flask_login import login_required, current_user
from app.models import Business, db
from app.forms.business_form import BusinessForm

business_routes = Blueprint('businesses', __name__)

# Route to get all businesses
@business_routes.route('')
def get_all_businesses():
    try:
        all_businesses = Business.query.all()
        return {'businesses': [business.to_dict() for business in all_businesses]}
    except Exception as e:
        current_app.logger.error(f"Error fetching all businesses: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

# Route to get one business by ID
@business_routes.route('/<int:business_id>')
def get_one_business(business_id):
    try:
        business = Business.query.get(business_id)
        if business:
            return business.to_dict()
        else:
            return jsonify({"error": "Business not found"}), 404
    except Exception as e:
        current_app.logger.error(f"Error fetching business {business_id}: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

# Route to create a new business
@business_routes.route('', methods=['POST'])
@login_required
def create_business():
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            new_business = Business(
                owner_user_id=current_user.id,
                name=form.data['name'],
                address=form.data['address'],
                city=form.data['city'],
                state=form.data['state'],
                description=form.data['description'],
                hours=form.data['hours'],
                image_url=form.data['image_url']
            )
            db.session.add(new_business)
            db.session.commit()
            return new_business.to_dict()
        except Exception as e:
            db.session.rollback()
            current_app.logger.error(f"Error creating business: {str(e)}")
            return jsonify({"error": "Internal server error"}), 500
    return {'errors': form.errors}, 400

# Route to update an existing business by ID
@business_routes.route('/<int:business_id>', methods=['PUT'])
@login_required
def update_business(business_id):
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            business_to_update = Business.query.get(business_id)
            data = form.data
            business_to_update.name = data['name']
            business_to_update.address = data['address']
            business_to_update.description = data['description']
            db.session.commit()
            return business_to_update.to_dict()
        except Exception as e:
            db.session.rollback()
            current_app.logger.error(f"Error updating business {business_id}: {str(e)}")
            return jsonify({"error": "Internal server error"}), 500
    return {'errors': form.errors}, 400

# Route to delete a business by ID
@business_routes.route('/<int:business_id>', methods=['DELETE'])
@login_required
def delete_business(business_id):
    try:
        business_to_delete = Business.query.get(business_id)
        db.session.delete(business_to_delete)
        db.session.commit()
        return {'message': 'Business has been removed'}
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error deleting business {business_id}: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500
