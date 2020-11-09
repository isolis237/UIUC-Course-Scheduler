import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField"
import Carousel from 'react-bootstrap/Carousel'
import {Button, Dropdown, DropdownButton} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import '../App.css'
import ReactCalendar from "./ReactCalendar";
import * as data from './roster.json'

<<<<<<< HEAD
=======


>>>>>>> 911e8183e4b8940e3a65b43650809d966fa9f708
function getInput(input) {
    return input;
}

var search_input;

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}


<<<<<<< HEAD

=======
>>>>>>> 911e8183e4b8940e3a65b43650809d966fa9f708
export default class ClassSearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            credits: 0,
            professor: "",
            department: "",
            userCourses: [{
                "title": "CS 125",
                "prof": "Chapman",
                "rating": "4",
                "section": "L1",
                "CRN": "1238",
                "type": "Lecture",
                "daysOfWeek": [2,4],
                "startTime": "12:00",
                "slotDuration": "00:50"
            }]
        };

    }

<<<<<<< HEAD
    render() {

        return (
            <body>
            <div>
                <ReactCalendar
                    events={this.state.userCourses}
                />
=======

    render() {

        return(
            <body>
            <div>
                <ReactCalendar events={this.state.userCourses}/>
>>>>>>> 911e8183e4b8940e3a65b43650809d966fa9f708
            </div>
            <div class="carousel">
                <Carousel interval={null}>
                    <Carousel.Item>
                        <h3>Choose Semester</h3>
                        <div class="spacer">
                            <InputGroup>
                                <FormControl
                                    placeholder="Year"
                                    aria-label="Year"
                                    aria-describedby="basic-addon2"
                                    size="sm"
                                />
                                <DropdownButton
                                    as={InputGroup.Append}
                                    variant="outline-secondary"
                                    title="Season"
                                    id="input-group-dropdown-2"
                                    size="sm"
                                >
                                    <Dropdown.Item href="#">Fall</Dropdown.Item>
                                    <Dropdown.Item href="#">Winter</Dropdown.Item>
                                    <Dropdown.Item href="#">Spring</Dropdown.Item>
                                    <Dropdown.Item href="#">Summer</Dropdown.Item>
                                </DropdownButton>
                            </InputGroup>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div class="spacer"><h3>Filter Classes</h3></div>
                        <label>
                            <div>
                                Credits
                                <input
                                    type={'number'}
                                    name="credits"
                                    onChange={() => {
                                        this.setState({credits: !this.state.credits}, () => {
                                        });
                                    }}
                                />
                            </div>

                            <div>
                                Professor
                                <Autocomplete
                                    class="professor_filter"
                                    //create function to get all professor for certain course
                                    options={data.courses}
                                    autoComplete={true}
                                    onChange={(event, object) => {
                                    }}
                                    getOptionLabel={(option) => option.title}
<<<<<<< HEAD
                                    renderInput={(params) => <TextField {...params} variant="outlined"/>}
=======
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
>>>>>>> 911e8183e4b8940e3a65b43650809d966fa9f708
                                />
                            </div>
                            <div>
                                Department
                                <Autocomplete
                                    class="professor_filter"
                                    //create function to get all professor for certain course
                                    options={data.courses}
                                    autoComplete={true}
                                    onChange={(event, object) => {
                                    }}
                                    getOptionLabel={(option) => option.title}
<<<<<<< HEAD
                                    renderInput={(params) => <TextField {...params} variant="outlined"/>}
=======
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
>>>>>>> 911e8183e4b8940e3a65b43650809d966fa9f708
                                />
                            </div>
                        </label>

                    </Carousel.Item>
                    <Carousel.Item>
                        <h3>Search Classes</h3>
                        <div class="spacer">

                            <Autocomplete class="class_search_bar"
                                          options={data.courses}
                                          autoComplete={true}
                                          onChange={(event, object) => {
                                              search_input = getInput(object)
                                              console.log(object)
                                          }}
                                          getOptionLabel={(option) => option.title}
<<<<<<< HEAD
                                          renderInput={(params) => <TextField {...params} variant="outlined"/>}
=======
                                          renderInput={(params) => <TextField {...params} variant="outlined" />}
>>>>>>> 911e8183e4b8940e3a65b43650809d966fa9f708
                            />

                            Add Class to Calendar
                            <div>
                                <button
                                    className={'add_button'}
                                    value={"Add"}
<<<<<<< HEAD

                                    onClick={() => {
                                            if (search_input != null) {
                                                if (containsObject(search_input, this.state.userCourses)) {
                                                    alert("Course already in schedule!")
                                                } else {
                                                    this.state.userCourses.push(search_input)

                                                    console.log(this.state.userCourses)
                                                    alert("Adding "+search_input.title+" to calendar");

                                                }
                                        }
                                    }
                                    }

=======
                                    onClick={() => {
                                        if (search_input != null) {
                                            if (containsObject(search_input, this.state.userCourses)) {
                                                alert("Course already in schedule!")
                                            } else {
                                                var course_list = this.state.userCourses
                                                course_list.push(search_input)
                                                this.setState({userCourses: course_list})
                                                alert("Adding "+search_input.title+" to calendar");
                                            }

                                        }
                                    }}
>>>>>>> 911e8183e4b8940e3a65b43650809d966fa9f708
                                >
                                    Add
                                </button>
                            </div>

                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
<<<<<<< HEAD
            </body>
=======
        </body>
>>>>>>> 911e8183e4b8940e3a65b43650809d966fa9f708
        )


    }
<<<<<<< HEAD
}
=======

}
>>>>>>> 911e8183e4b8940e3a65b43650809d966fa9f708
