import requests
import xml.etree.ElementTree as ET
import xml.dom.minidom
from urllib.request import Request, urlopen
import ssl
import json

class CisappParser:
    def __init__(self, setYear = None, setSeason = None, setDepartment = None, setCourse = None, setProfessor = None, setSection = None):
        self.Year = setYear
        self.Season = setSeason
        self.Department = setDepartment
        self.Course = setCourse
        self.Professor = setProfessor
        self.Section = setSection
    def getYear(self):
        return self.Year
    def setYear(self, x):
        self.Year = x
    def getSeason(self):
        return self.Season
    def setDepartment(self, x):
        self.Department = x
    def getDepartment(self):
        return self.Department
    def getCourse(self):
        return self.Course
    def setCourse(self, x):
        self.Course = x
    def getProfessor(self):
        return self.Professor
    def setProfessor(self, x):
         self.Professor = x
    def getSection(self):
        return self.Section
    def setSection(self, x):
        self.Section = x
    def getSeasons(self):
        req = Request('https://courses.illinois.edu/cisapp/explorer/schedule/' + p1.getYear() + '.xml')
        req.add_header('Authorization', 'Basic bGVhcm5pbmc6bGVhcm5pbmc==')

        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE

        r = urlopen(req, context=ctx)
        rString = r.read().decode("utf-8")

        r.close()

        xmlparse = xml.dom.minidom.parseString(rString)
        prettyxml = xmlparse.toprettyxml()
        root = ET.fromstring(prettyxml)

        sections = list()
        for section in root.iter('term'):
            sections.append(section.text)
        return sections

    def getDepartments(self):
        req = Request('https://courses.illinois.edu/cisapp/explorer/schedule/' + p1.getYear() + '/' + p1.getSeason() + '.xml')
        req.add_header('Authorization', 'Basic bGVhcm5pbmc6bGVhcm5pbmc==')

        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE

        r = urlopen(req, context=ctx)
        rString = r.read().decode("utf-8")

        r.close()

        xmlparse = xml.dom.minidom.parseString(rString)
        prettyxml = xmlparse.toprettyxml()
        root = ET.fromstring(prettyxml)

        sections = list()
        for section in root.iter('subject'):
            sections.append(section.text)
        return sections

    def getCourses(self):
        req = Request('https://courses.illinois.edu/cisapp/explorer/schedule/' + p1.getYear() + '/' + p1.getSeason() + '/' + p1.getDepartment() + '.xml')
        req.add_header('Authorization', 'Basic bGVhcm5pbmc6bGVhcm5pbmc==')
       
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE

        r = urlopen(req, context=ctx)
        rString = r.read().decode("utf-8")

        r.close()

        xmlparse = xml.dom.minidom.parseString(rString)
        prettyxml = xmlparse.toprettyxml()
        root = ET.fromstring(prettyxml)

        sections = list()
        for section in root.iter('course'):
            sections.append(section.get('id') + ": " + section.text)
        return sections

    # added method to give numbers for every course in any department

    def getCourseNumber(self):
        req = Request('https://courses.illinois.edu/cisapp/explorer/schedule/' + p1.getYear() + '/' + p1.getSeason() + '/' + p1.getDepartment() + '.xml')
        req.add_header('Authorization', 'Basic bGVhcm5pbmc6bGVhcm5pbmc==')

        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE

        r = urlopen(req, context=ctx)
        rString = r.read().decode("utf-8")

        r.close()

        xmlparse = xml.dom.minidom.parseString(rString)
        prettyxml = xmlparse.toprettyxml()
        root = ET.fromstring(prettyxml)

        sections = list()
        for section in root.iter('course'):
            sections.append(section.get('id'))
        return sections
    
    def getRelevantProfessors(self):
        req = Request('https://courses.illinois.edu/cisapp/explorer/schedule/' + p1.getYear() + '/' + p1.getSeason() + '/' + p1.getDepartment() + '/' + p1.getCourse() + '.xml?mode=detail')
        req.add_header('Authorization', 'Basic bGVhcm5pbmc6bGVhcm5pbmc==')

        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE

        r = urlopen(req, context=ctx)
        rString = r.read().decode("utf-8")

        r.close()

        xmlparse = xml.dom.minidom.parseString(rString)
        prettyxml = xmlparse.toprettyxml()
        root = ET.fromstring(prettyxml)

        sections = list()
        for course in root.iter('detailedSections'):
            for section in course.findall('detailedSection'):
                for meeting in section.findall('meetings'):
                    for instructors in meeting.findall('meeting'):
                        for instructor in instructors.findall('instructors'):
                            if(instructor.find('instructor') is not None):
                                sections.append(instructor.find('instructor').text + ': ' + section.find('sectionNumber').text)
        return sections

# User input

year = input("Enter year:")
season = input("Enter season:")
dept = input("Enter department:")
number = input("Enter course number:")
dept = dept.upper()

p1 = CisappParser(year,season, dept, number)
#print('https://courses.illinois.edu/cisapp/explorer/schedule/' + p1.getYear() + '/' + p1.getSeason() + '/' + p1.getDepartment() + '/' + p1.getCourse() + '.xml?mode=detail')
#print(p1.getRelevantProfessors())

#function that writes a json file with all courses and every 'relevant professor' in the format 'course': 'relevant professor'

def writeToJSONFile(path, fileName, data):
    filePathNameWExt = './' + path + '/' + fileName + '.json'
    with open(filePathNameWExt, 'w') as fp:
        json.dump(data, fp)

courses = p1.getCourses()
numbers = p1.getCourseNumber()

data = {}
data ['Courses'] = []
for i in range(len(p1.getCourses())):
    p1 = CisappParser(p1.getYear(), p1.getSeason(), p1.getDepartment(), numbers[i])
    for j in p1.getRelevantProfessors():
        data ['Courses'].append({
            courses[i]: j
        })


writeToJSONFile('./','file-name',data)