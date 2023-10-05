from .db import db, environment, SCHEMA

class BusinessCategory(db.Model):
    __tablename__ = 'business_categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)

    # Relationships
    business_mappings = db.relationship('BusinessCategoryMapping', back_populates='category')


    def to_dict(self):
        return {
            'id': self.id,
            'category_name': self.category_name,
            'description': self.description,
        }
