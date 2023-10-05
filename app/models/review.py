from .db import db, environment, SCHEMA
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    reviewer = db.relationship('User', back_populates='created_reviews')
    business = db.relationship('Business', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'business_id': self.business_id,
            'content': self.content,  # corrected from 'title'
            'rating': self.rating,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
    }

