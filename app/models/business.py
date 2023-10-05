from .db import db, environment, SCHEMA
from datetime import datetime

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    # average_rating will be computed dynamically from Reviews
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    owner = db.relationship('User', back_populates='owned_businesses')
    reviews = db.relationship('Review', back_populates='business', cascade='all, delete-orphan')
    category_mappings = db.relationship('BusinessCategoryMapping', back_populates='business')



    def to_dict(self):
        return {
            'id': self.id,
            'owner_user_id': self.owner_user_id,
            'name': self.name,
            'address': self.address,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
