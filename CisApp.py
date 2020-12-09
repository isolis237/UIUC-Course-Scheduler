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

        
        Courses= []
        Courses['title'] = 'k' 
        Courses['name'] = sections
        Courses['number'] =p1.getCourseNumber
        Courses['department'] = p1.getDepartments
        Courses['prof'] = p1.getRelevantProfessors
        Courses['rating'] = 'j' 
        Courses['disparity'] = 'h'
        Courses['credits'] = p1.getCreditHours
        Courses['section'] ='y'
        Courses['CRN'] = 'x'
        Courses['type'] = p1.lessonType
        Courses['eventContent'] = p1.description
        Courses['daysOfWeek'] = p1.daysOfTheWeek
        Courses['startTime'] = p1.getStarttime
        Courses['slotDuration'] = 'not implemented' 
        Courses['groupId'] = 5
        Courses['id'] = 'j'
        Courses['display'] = "auto"
        return Courses
        



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
    # added method to retrieve course start time.
    def getStarttime(self):
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
                    for meet in meeting.findall('meeting'):
                        for starttime in meet.findall('start'):
                            if(starttime.find('start') is not None):
                                sections.append(starttime.find('start').text) 
        return sections
    # added method to get credithours associated with the course.
    def getCreditHours(self):
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
            for credithours in section.findall('creditHours'):
                    sections.append(credithours.find('creditHours').text)
                
        return sections
    # added method to get days of the week
    def daysOfWeek(self):
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
        for course in root.iter('detailedSections'):
            for section in course.findall('detailedSection'):
                for meeting in section.findall('meetings'):
                    for meetings in meeting.findall('meeting'):
                        for daysofweek in meetings.findall('daysOfTheWeek'):
                            if(daysofweek.find('daysOfTheWeek') == TR):
                                sections.append(2,5)
                            elif(daysofweek.find('daysOfTheWeek') == MWF):
                                sections.append(1,3,5)
                            elif(daysofweekfind('daysOfTheWeek') == MW): 
                                sections.append(1,3)               
        return sections
    # added method to get lesson type like if it is online or inperson e.t.c
    def lessonType(self):
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
        for course in root.iter('detailedSections'):
            for section in course.findall('detailedSection'):
                for meeting in section.findall('meetings'):
                    for meetings in meeting.findall('meeting'):
                        for lessontype in meetings.findall('type'):
                            sections.append(lessontype.find('type'.text))
        return sections
    # added method to give discription of the course and the prereqs.
    def eventType(self):
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
            for description in section.findall('description') :
                sections.append(description.find('description').text)
        return sections
    # added method to add end time of course.
    def endTime(self):
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
                    for meet in meeting.findall('meeting'):
                        for endtime in meet.findall('end'):
                            if(endtime.find('end') != None):
                                sections.append(endtime.find('end').text)
        return sections





p1 = CisappParser('2020', 'Fall', 'MATH', '241')
print(p1.getSections())

#print('https://courses.illinois.edu/cisapp/explorer/schedule/' + p1.getYear() + '/' + p1.getSeason() + '/' + p1.getDepartment() + '/' + p1.getCourse() + '.xml?mode=detail')
#print(p1.getRelevantProfessors())

#function that writes a json file with all courses and every 'relevant professor' in the format 'course': 'relevant professor'

def writeToJSONFile(path, fileName, data):
    filePathNameWExt = './' + path + '/' + fileName + '.json'
    with open(filePathNameWExt, 'w') as fp:
        json.dump(data, fp)

courses = p1.getCourses()
numbers = p1.getCourseNumber()
starttime = p1.getduration()
endtime = p1.endTime()
eventype = p1.eventType()
lessontype = p1.lessonType()
daysofweek = p1.daysOfTheWeek()
credithours = p1.getCreditHours()
 


data = {}
data ['Courses'] = []
for i in range(len(p1.getCourses())):
    p1 = CisappParser(p1.getYear(), p1.getSeason(), p1.getDepartment(), numbers[i])
    for j in p1.getRelevantProfessors():
        data ['Courses'].append({
            courses[i]: j
        })


writeToJSONFile('./','file-name',data)