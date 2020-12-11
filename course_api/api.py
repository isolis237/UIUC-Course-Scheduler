from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from CisApp import CisappParser
import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)

class ClassBlock(db.Model):
    id  = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer)
    department = db.Column(db.String(5))
    sectionName = db.Column(db.String(10))
    crn = db.Column(db.Integer, unique = True)
    prof = db.Column(db.String(20))
    startTime = db.Column(db.String(10))
    endTime = db.Column(db.String(10))
    days = db.Column(db.String(5))

    def __init__(self, number, department, sectionName, crn, prof, startTime, endTime, days):
        self.number = number
        self.department = department
        self.sectionName = sectionName
        self.crn = crn
        self.prof = prof
        self.startTime = startTime
        self.endTime = endTime
        self.days = days 

class Prof(db.Model):
    id  = db.Column(db.Integer, primary_key=True)
    courseName = db.Column(db.String(10))
    crn = db.Column(db.Integer, unique = True)
    rating = db.Column(db.Float)
    gpa = db.Column(db.Float)
    selected = db.Column(db.Boolean)

    def __init__(self, courseName, crn, rating, gpa, selected):
        self.courseName = courseName
        self.crn = crn
        self.rating = rating
        self.gpa = gpa
        self.selected = selected

class ClassSchema(ma.Schema):
    class Meta:
        fields = ('id', 'number', 'department', 'sectionName', 'crn', 'prof', 'startTime', 'endTime', 'days')
    
class ProfSchema(ma.Schema):
    class Meta:
        fields = ('id', 'courseName', 'crn', 'rating', 'gpa', 'selected')

class_schema = ClassSchema()
classes_schema = ClassSchema(many=True)
prof_schema = ClassSchema()
profs_schema = ClassSchema(many=True)


@app.route('/search/<year>/<season>', methods=['GET'])
def get_departments(year, season):
    cis = CisappParser(year, season)
    return jsonify(cis.getDepartments())

@app.route('/search/<year>/<season>/<department>', methods=['GET'])
def get_courses(year, season, department):
    cis = CisappParser(year, season, department)
    return jsonify(cis.getCourses())

@app.route('/search/<year>/<season>/<department>/<course>', methods=['GET'])
def get_sections(year, season, department, course):
    cis = CisappParser(year, season, department, course)
    return jsonify(cis.getSections())

@app.route('/roster', methods=['POST'])
def add_section():

    number = request.json['number']
    department = request.json['department']
    sectionName = request.json['sectionName']
    crn = request.json['crn']
    prof = request.json['prof']
    startTime = request.json['startTime']
    endTime = request.json['endTime']
    days = request.json['days'] 

    class_block = ClassBlock(number, department, sectionName, crn, prof, startTime, endTime, days)
    
    db.session.add(class_block)
    db.session.commit()

    # TODO: Create Prof and add it to profs_schema

    return class_schema.jsonify(class_block)

@app.route('/roster', methods=['GET'])
def get_all_sections():
    result = classes_schema.dump(ClassBlock.query.all())
    return jsonify(result)


@app.route('/roster/<id>', methods=['GET'])
def get_single_section(id):
    section = ClassBlock.query.get(id)
    return class_schema.jsonify(section)


@app.route('/roster/<id>', methods=['PUT'])
def update_section(id):
    section = Product.query.get(id)

    section.number = request.json['number']
    section.department = request.json['department']
    section.sectionName = request.json['sectionName']
    section.crn = request.json['crn']
    section.prof = request.json['prof']
    section.startTime = request.json['startTime']
    section.endTime = request.json['endTime']
    section.days = request.json['days'] 

    db.session.commit()

    return class_schema.jsonify(section)

@app.route('/roster/<id>', methods=['DELETE'])
def delete_section(id):
    section = ClassBlock.query.get(id)
    db.session.delete(section)
    db.session.commit()
    return class_schema.jsonify(section)


# TODO : Complete these functions using the class schema as a template

@app.route('/prof/<name>/<courseName>', methods=['GET'])
def get_info(name):
    # Uses RateMyProf class to provide rmp rating and average gpa 
    return

@app.route('/prof', methods=['POST'])
def add_prof():
    return

@app.route('/prof/<courseName>', methods=['GET'])
def get_profs_by_courseName(courseName):
    return

@app.route('/prof/<crn>', methods=['DELETE'])
def delete_prof(id):
    return


if __name__ =='__main__':
    app.run(debug=True)