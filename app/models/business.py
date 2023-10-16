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
    avg_rating = db.Column(db.Float, nullable=True)
    city = db.Column(db.String(100), nullable=False)  
    state = db.Column(db.String(2), nullable=False)   
    description = db.Column(db.Text, nullable=True)
    hours = db.Column(db.String(255), nullable=True)    
    image_url = db.Column(db.String(255), nullable=True) 
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
            'avg.rating': self.avg_rating,
            'city': self.city,       
            'state': self.state,      
            'description': self.description,
            'hours': self.hours,      
            'image_url': self.image_url,  
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
