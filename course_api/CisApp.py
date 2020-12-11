import requests
import xml.etree.ElementTree as ET
import xml.dom.minidom
from urllib.request import Request, urlopen
import ssl
import json


class CisappParser:
    def __init__(
        self,
        setYear=None,
        setSeason=None,
        setDepartment=None,
        setCourse=None,
        setProfessor=None,
        setSection=None,
    ):
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
        req = Request(
            "https://courses.illinois.edu/cisapp/explorer/schedule/"
            + self.getYear()
            + ".xml"
        )
        req.add_header("Authorization", "Basic bGVhcm5pbmc6bGVhcm5pbmc==")

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
        for section in root.iter("term"):
            sections.append(section.text)
        return sections

    def getDepartments(self):
        req = Request('https://courses.illinois.edu/cisapp/explorer/schedule/' + self.Year + '/' + self.Season + '.xml')
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
            item = { 'id' : section.get('id'),  'name' : section.text }
            sections.append(item)
        return sections

    def getCourses(self):
        req = Request('https://courses.illinois.edu/cisapp/explorer/schedule/' + self.Year + '/' + self.Season + '/' + self.Department + '.xml')
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
            item = { 'id' : section.get('id'),  'name' : section.text }
            sections.append(item)
        return sections

    # added method to give numbers for every course in any department

    def getCourseNumber(self):
        req = Request(
            "https://courses.illinois.edu/cisapp/explorer/schedule/"
            + self.getYear()
            + "/"
            + self.getSeason()
            + "/"
            + self.getDepartment()
            + ".xml"
        )
        req.add_header("Authorization", "Basic bGVhcm5pbmc6bGVhcm5pbmc==")

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
        for section in root.iter("course"):
            sections.append(section.get("id"))
        return sections

    def getRelevantProfessors(self):
        req = Request(
            "https://courses.illinois.edu/cisapp/explorer/schedule/"
            + self.getYear()
            + "/"
            + self.getSeason()
            + "/"
            + self.getDepartment()
            + "/"
            + self.getCourse()
            + ".xml?mode=detail"
        )
        req.add_header("Authorization", "Basic bGVhcm5pbmc6bGVhcm5pbmc==")

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
        for course in root.iter("detailedSections"):
            for section in course.findall("detailedSection"):
                for meeting in section.findall("meetings"):
                    for instructors in meeting.findall("meeting"):
                        for instructor in instructors.findall("instructors"):
                            if instructor.find("instructor") is not None:
                                sections.append(instructor.find("instructor").text)
        return sections

    def getSectionNumber(self):
        req = Request(
            "https://courses.illinois.edu/cisapp/explorer/schedule/"
            + self.getYear()
            + "/"
            + self.getSeason()
            + "/"
            + self.getDepartment()
            + "/"
            + self.getCourse()
            + ".xml?mode=detail"
        )
        req.add_header("Authorization", "Basic bGVhcm5pbmc6bGVhcm5pbmc==")

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
        for course in root.iter("detailedSections"):
            for section in course.findall("detailedSection"):
                for sectionnumber in section.findall("sectionNumber"):
                    sections.append(sectionnumber.text)
        return sections

    # added method to retrieve course start time.
    def getStarttime(self):
        req = Request(
            "https://courses.illinois.edu/cisapp/explorer/schedule/"
            + self.getYear()
            + "/"
            + self.getSeason()
            + "/"
            + self.getDepartment()
            + "/"
            + self.getCourse()
            + ".xml?mode=detail"
        )
        req.add_header("Authorization", "Basic bGVhcm5pbmc6bGVhcm5pbmc==")

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
        for course in root.iter("detailedSections"):
            for section in course.findall("detailedSection"):
                for meeting in section.findall("meetings"):
                    for meet in meeting.findall("meeting"):
                        for starttime in meet.findall("start"):
                            if starttime.text is not None:
                                sections.append(starttime.text)
        return sections

    # added method to get credithours associated with the course.
    def getCreditHours(self):
        req = Request(
            "https://courses.illinois.edu/cisapp/explorer/schedule/"
            + self.getYear()
            + "/"
            + self.getSeason()
            + "/"
            + self.getDepartment()
            + "/"
            + self.getCourse()
            + ".xml?mode=detail"
        )
        req.add_header("Authorization", "Basic bGVhcm5pbmc6bGVhcm5pbmc==")

        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE

        r = urlopen(req, context=ctx)
        rString = r.read().decode("utf-8")

        r.close()

        xmlparse = xml.dom.minidom.parseString(rString)
        prettyxml = xmlparse.toprettyxml()
        root = ET.fromstring(prettyxml)

        for section in root.iter("creditHours"):
            return int(section.text[0:1])

    # added method to get days of the week
    def daysOfWeek(self):
        req = Request(
            "https://courses.illinois.edu/cisapp/explorer/schedule/"
            + self.getYear()
            + "/"
            + self.getSeason()
            + "/"
            + self.getDepartment()
            + "/"
            + self.getCourse()
            + ".xml?mode=detail"
        )
        req.add_header("Authorization", "Basic bGVhcm5pbmc6bGVhcm5pbmc==")

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
        for course in root.iter("detailedSections"):
            for section in course.findall("detailedSection"):
                for meeting in section.findall("meetings"):
                    for meetings in meeting.findall("meeting"):
                        for starttime in meetings.findall("start"):
                            if starttime.text.strip().find("ARRANGED") != -1:
                                sections.append("Asynchronus")
                        for daysofweek in meetings.findall("daysOfTheWeek"):
                            v = list()
                            if daysofweek.text.strip().find("T") != -1:
                                v.append(2)
                            if daysofweek.text.strip().find("M") != -1:
                                v.append(1)
                            if daysofweek.text.strip().find("W") != -1:
                                v.append(3)
                            if daysofweek.text.strip().find("R") != -1:
                                v.append(4)
                            if daysofweek.text.strip().find("F") != -1:
                                v.append(5)
                            sections.append(v)
        return sections

    # added method to get lesson type like if it is online or inperson e.t.c
    def lessonType(self):
        req = Request(
            "https://courses.illinois.edu/cisapp/explorer/schedule/"
            + self.getYear()
            + "/"
            + self.getSeason()
            + "/"
            + self.getDepartment()
            + "/"
            + self.getCourse()
            + ".xml?mode=detail"
        )
        req.add_header("Authorization", "Basic bGVhcm5pbmc6bGVhcm5pbmc==")

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
        for course in root.iter("detailedSections"):
            for section in course.findall("detailedSection"):
                for meeting in section.findall("meetings"):
                    for meetings in meeting.findall("meeting"):
                        for lessontype in meetings.findall("type"):
                            sections.append(lessontype.text)
        return sections

    # added method to give discription of the course and the prereqs.
    def eventType(self):
        req = Request(
            "https://courses.illinois.edu/cisapp/explorer/schedule/"
            + self.getYear()
            + "/"
            + self.getSeason()
            + "/"
            + self.getDepartment()
            + "/"
            + self.getCourse()
            + ".xml?mode=detail"
        )
        req.add_header("Authorization", "Basic bGVhcm5pbmc6bGVhcm5pbmc==")

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
        for section in root.iter("description"):
            sections.append(section.text)
        return sections

    # added method to add end time of course.
    def endTime(self):
        req = Request(
            "https://courses.illinois.edu/cisapp/explorer/schedule/"
            + self.getYear()
            + "/"
            + self.getSeason()
            + "/"
            + self.getDepartment()
            + "/"
            + self.getCourse()
            + ".xml?mode=detail"
        )
        req.add_header("Authorization", "Basic bGVhcm5pbmc6bGVhcm5pbmc==")

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
        for course in root.iter("detailedSections"):
            for section in course.findall("detailedSection"):
                for meeting in section.findall("meetings"):
                    for meet in meeting.findall("meeting"):
                        for starttime in meet.findall("start"):
                            if starttime.text.strip().find("ARRANGED") != -1:
                                sections.append("Asynchronus")
                        for endtime in meet.findall("end"):
                            if endtime.text is not None:
                                sections.append(endtime.text)
        return sections

    def getCRN(self):
        req = Request(
            "https://courses.illinois.edu/cisapp/explorer/schedule/"
            + self.getYear()
            + "/"
            + self.getSeason()
            + "/"
            + self.getDepartment()
            + "/"
            + self.getCourse()
            + ".xml?mode=detail"
        )
        req.add_header("Authorization", "Basic bGVhcm5pbmc6bGVhcm5pbmc==")

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
        for course in root.iter("detailedSections"):
            for section in course.findall("detailedSection"):
                sections.append(section.get("id"))
        return sections

    def getSections(self):

        with open("disparity.json") as f:
            disparity = json.load(f)
        data = []
        sn = self.getSectionNumber()
        cn = self.getCRN()
        lt = self.lessonType()
        dow = self.daysOfWeek()
        st = self.getStarttime()
        et = self.endTime()
        for i in range(len(cn)):
            section = {}
            section["title"] = self.getDepartment() + " " + self.getCourse()
            section["name"] = self.getDepartment() + " " + self.getCourse()
            section["number"] = self.getCourse()
            section["department"] = self.getDepartment()
            section["professors"] = self.getRelevantProfessors()
            section["prof"] = self.getProfessors(cn[i])
            if section["title"] in disparity["Avg. GPA"]:
                section["disparity"] = disparity["Avg. GPA"][section["title"]]
            else:
                section["disparity"] = 0
            if self.lessonType()[i].find("L") == -1:
                section["credits"] = 0
            else:
                section["credits"] = self.getCreditHours()
            section["section"] = sn[i]
            section["id"] = sn[i]
            section["CRN"] = cn[i]
            section["type"] = lt[i]
            section["eventContent"] = self.eventType()
            section["daysOfWeek"] = dow[i]
            section["startTime"] = st[i]
            section["endTime"] = et[i]
            section["groupId"] = "updated by front end"
            section["display"] = "updated by front end"
            data.append(section)
        print (data)
        return data

    def getProfessors(self, CRN):
        req = Request(
            "https://courses.illinois.edu/cisapp/explorer/schedule/"
            + self.getYear()
            + "/"
            + self.getSeason()
            + "/"
            + self.getDepartment()
            + "/"
            + self.getCourse()
            + "/"
            + str(CRN)
            + ".xml?mode=detail"
        )
        req.add_header("Authorization", "Basic bGVhcm5pbmc6bGVhcm5pbmc==")

        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE

        r = urlopen(req, context=ctx)
        rString = r.read().decode("utf-8")

        r.close()

        xmlparse = xml.dom.minidom.parseString(rString)
        prettyxml = xmlparse.toprettyxml()
        root = ET.fromstring(prettyxml)

        for course in root.iter("meetings"):
            for section in course.findall("meeting"):
                for meeting in section.findall("instructors"):
                    for instructor in meeting.findall("instructor"):
                        if instructor.text is not None:
                            return instructor.text
                        
        return " "



# print('https://courses.illinois.edu/cisapp/explorer/schedule/' + self.getYear() + '/' + self.getSeason() + '/' + self.getDepartment() + '/' + self.getCourse() + '.xml?mode=detail')
# print(self.getRelevantProfessors())

# function that writes a json file with all courses and every 'relevant professor' in the format 'course': 'relevant professor'
