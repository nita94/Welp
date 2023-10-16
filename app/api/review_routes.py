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

def get_all_reviews(business_id):
    """
    Get all reviews for a business
    """
    reviews = Review.query.filter(Review.business_id == business_id).all()
    return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('/<int:business_id>', methods=['POST'])
@login_required
def create_review(business_id):
    print("Received POST request for business_id: {business_id}")  # Debugging line
    """
    Create a new review
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review(
            content=form.data['content'],
            user_id=current_user.id,
            business_id=business_id,
            rating=form.data['rating']
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400  # Ensure errors are returned as JSON


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
        review_to_update.content = form.data['content']
        review_to_update.rating = form.data['rating']
        db.session.commit()
        return review_to_update.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    """
    Delete a review
    """
    review_to_delete = Review.query.get(review_id)
    db.session.delete(review_to_delete)
    db.session.commit()
    return {'message': 'Review has been removed'}

@review_routes.route('/check/<int:business_id>/<int:user_id>')
def check_review(business_id, user_id):
    """
    Check if a user has reviewed a business
    """
    review = Review.query.filter_by(business_id=business_id, user_id=user_id).first()
    has_reviewed = review is not None
    return {'hasReviewed': has_reviewed}
