import csv
import numpy as np
import pandas as pd
from os import walk

files = []
for (dirpath, dirnames, filenames) in walk('raw/2019-2020'):
    files.extend(filenames)
    break

courses_raw = pd.DataFrame(columns = ["Course", "Total GPA", "Size"])

for file in files:
	with open(f'raw/2019-2020/{file}') as csv_file:
	    csv_reader = csv.reader(csv_file, delimiter=',')
	    next(csv_reader)
	    for row in csv_reader:
	    	course_name = f'{row[0]} {row[1]}'
	    	student_count = 0
	    	for students_with_letter_grade in row[5:18]:
	    		student_count += int(students_with_letter_grade)
	    	total_gpa = float(row[19]) * student_count
	    	courses_raw = courses_raw.append({"Course": course_name, "Total GPA": total_gpa, "Size": student_count}, ignore_index = True)

courses_data = courses_raw.groupby(courses_raw["Course"]).agg(lambda x: sum(x))
courses_data["Avg. GPA"] = round((courses_data["Total GPA"]/courses_data["Size"]),2)
courses_data.drop(["Total GPA", "Size"], axis = 1, inplace = True)
print(courses_data)
courses_data.to_json('Data.json')