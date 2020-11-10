from . import db 

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    term = db.Column(db.String(50))
    prof = db.Column(db.String(50))
    rating = db.Column(db.Integer)