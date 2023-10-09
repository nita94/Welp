from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@review_routes.route('/<int:business_id>')
@login_required
def get_all_reviews(business_id):
    """
    Get all reviews for a business
    """
    try:
        reviews = Review.query.filter(Review.business_id == business_id).all()
        return {'reviews': [review.to_dict() for review in reviews]}
    except Exception as e:
        print("Error fetching reviews:", str(e))
        return {'error': 'Failed to fetch reviews'}, 500

@review_routes.route('/<int:business_id>', methods=['POST'])
@login_required
def create_review(business_id):
    """
    Create a new review
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            new_review = Review(
                content=form.data['content'],
                user_id=current_user.id,
                business_id=business_id,
                rating=form.data['rating']
            )
            db.session.add(new_review)
            db.session.commit()
            return new_review.to_dict()
        except Exception as e:
            print("Error creating review:", str(e))
            return {'error': 'Failed to create review'}, 500

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    """
    Update a review
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    review_to_update = Review.query.get(review_id)
    if form.validate_on_submit():
        try:
            review_to_update.content = form.data['content']
            review_to_update.rating = form.data['rating']
            db.session.commit()
            return review_to_update.to_dict()
        except Exception as e:
            print("Error updating review:", str(e))
            return {'error': 'Failed to update review'}, 500

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    """
    Delete a review
    """
    review_to_delete = Review.query.get(review_id)
    try:
        db.session.delete(review_to_delete)
        db.session.commit()
        return {'message': 'Review has been removed'}
    except Exception as e:
        print("Error deleting review:", str(e))
        return {'error': 'Failed to delete review'}, 500
