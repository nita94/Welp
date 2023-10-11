from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length

class BusinessForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    address = StringField('Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired(), Length(max=2)])
    description = StringField('Description', validators=[DataRequired()])
    hours = StringField('Hours')  # assuming this is optional and any format is allowed
    image_url = StringField('Image URL')  # assuming this is optional
    submit = SubmitField('Submit')
