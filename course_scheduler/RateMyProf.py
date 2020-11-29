import requests
import xml.etree.ElementTree as ET
import xml.dom.minidom
from urllib.request import Request, urlopen
import ssl
import json
import math

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
        data ['Courses'].append({courses[i]: j})


writeToJSONFile('./','file-name',data)


uiuc = RateMyProfScraper(1112)
uiuc.SearchProfessor("Geoffrey Challen")
uiuc.PrintProfessorDetail("overall_rating")