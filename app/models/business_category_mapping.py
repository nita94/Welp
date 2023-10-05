from .db import db, environment, SCHEMA

class BusinessCategoryMapping(db.Model):
    __tablename__ = 'business_category_mappings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('business_categories.id'), nullable=False)

    # Relationships
    business = db.relationship('Business', back_populates='category_mappings')
    category = db.relationship('BusinessCategory', back_populates='business_mappings')


    def to_dict(self):
        return {
            'id': self.id,
            'business_id': self.business_id,
            'category_id': self.category_id,
        }
