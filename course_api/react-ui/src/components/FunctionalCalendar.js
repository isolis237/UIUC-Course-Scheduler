import React, {useEffect, useState} from 'react'
import ReactCalendar from './ReactCalendar'
import AddClasses from './AddClasses'
import ReactRoster from "./FixedRoster"

import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../App.css"

import Carousel from 'react-bootstrap/Carousel';
import {Button, Dropdown, DropdownButton} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import { FormGroup, List } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from 'react-bootstrap/Table'
import { blue } from '@material-ui/core/colors'

import CourseSelect from "./CourseSelect";

import SemesterSelector from "./SemesterSelector";

let search_input = 1;
let class_input = 1;

export function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
// helper function for checking class with existing classes
function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

// helper function for input of rgb
function rgb(r, g, b){
    return "rgb("+r+","+g+","+b+")";
}

export default class FunctionalCalendar extends React.Component {
    constructor() {
        super();
        this.state = {
            year: "",
            season: "Semester",
            department: "",
            searchRoute : "",
            searchCourseRoute : "",
            rosterRoute : "",
            searchStage : 0,
            userCourses: [],
            name: "test",
            mingpa: 0
        }
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSeasonChange = this.handleSeasonChange.bind(this)
        this.handleYearChange = this.handleYearChange.bind(this)
        this.handleDeptSelect = this.handleDeptSelect.bind(this)
        this.handleClassSelect = this.handleClassSelect.bind(this)
    }

    handleAddClick() {
        console.log(class_input.id)
        if (class_input==null) {
            alert("Cannot add null class!")
        }
        else if (containsObject(class_input, this.state.userCourses)) {
            alert("Class already in schedule!");
        } else {
            this.setState({userCourses : this.state.userCourses.concat(class_input)}, () => {
                this.props.addClick.handleAddClick(this.state.userCourses);
                let i;
                for (i=0; i < this.state.userCourses.length; i++) {
                    this.state.userCourses[i].backgroundColor = rgb(this.state.userCourses[i].CRN/8, this.state.userCourses[i].rating*this.state.userCourses[i].rating*7, this.state.userCourses[i].CRN/10)
                    this.state.userCourses[i].borderColor = this.state.userCourses[i].backgroundColor;
                    this.state.userCourses[i].groupId = this.state.userCourses[i].CRN;
                }
            })
            // alert("Adding " +search_input.title + " to schedule")
        }
    }
    handleClick() {
        this.setState({
            searchRoute : "search/" + this.state.year + "/" + this.state.season,
            searchCourseRoute : "search/" + this.state.year + "/" + this.state.season + "/" + search_input.id,
            department : search_input.id,
            rosterRoute : "/roster" + class_input.id,
            searchStage : this.state.searchStage + 1,
            mingpa: this.state.mingpa,
        });
        var prop = {
            type: "Department",
            route: this.state.searchRoute
        }
        console.log("search route: " + this.state.searchCourseRoute);
        console.log("seearch_input: " + search_input.id);
        console.log("this.state.department: " + this.state.department);
        console.log("selected class: " + class_input.id + " " +class_input.name);
        console.log(class_input);
    }

    onChange(e) {
        let updateRoutes = () => {
            this.setState({
                searchRoute : "search/" + this.state.year + "/" + this.state.season,
                department : search_input.id,
                searchCourseRoute : "search/" + this.state.year + "/" + this.state.season + "/" + search_input.id,
                searchStage : this.state.searchStage + 1,
                mingpa : this.state.mingpa
            });
        }

        if (e.target.id === "year") {
            this.setState({ year: e.target.value }, () => {updateRoutes()});
        }
        if (e.target.id === "season") {
            this.setState({ season: e.target.value }, () => {updateRoutes()});
        }
        if (e.target.id === "department") {
            this.setState({department: e.target.value}, () => {updateRoutes()});
        }
        if (e.target.id === "gpaslider") {
            this.setState({mingpa: e.target.value}, () => {updateRoutes()});
        }

        /**
        this.setState({
            searchRoute : "search/" + this.state.year + "/" + this.state.season,
            searchCourseRoute : "search/" + this.state.year + "/" + this.state.season + "/" + search_input.id,
            searchStage : this.state.searchStage + 1,
        });*/
        var prop = {
            type: "Department",
            route: this.state.searchRoute
        }
        console.log("search route: " + this.state.searchCourseRoute);
        console.log("seearch_input: " + search_input.id);
        console.log("this.state.department: " + this.state.department);
        console.log("selected class: " + class_input.id + " " +class_input.name);
        console.log(class_input);
    }

    /*  handleAddClick(courselist) {
          this.setState({userCourses : courselist})
      }*/

    handleRemoveClick(courselist) {
        this.setState({userCourses: courselist}, () => {
        })
    }

    handleDeptSelect(newDept) {
        this.setState({searchRoute: "search/" + this.state.year + "/" + this.state.season + "/"
        + newDept}, () => {console.log(this.state.searchRoute)})
    }
    handleClassSelect(newClass) {
        this.setState({searchRoute: "search/" + this.state.year + "/" + this.state.season + "/"
                + this.state.department + "/" + newClass}, () => {console.log(this.state.searchRoute)})
    }

    handleYearChange(newYear) {
        this.setState({year: newYear}, () => {
            this.setState({searchRoute: "search/" + this.state.year + "/"})
        });
    }
    handleSeasonChange(newSeason) {
        this.setState({season: newSeason}, () => {
            this.setState({searchRoute: "search/" + this.state.year + "/" + this.state.season})
        });
    }

    render() {
        return(
            <html>
            <div className={'left_container'}>
                <div className={'search_fields'}>
                    <Carousel interval={null}>
                        <Carousel.Item>

                            <h4>Choose Semester</h4>
                            <SemesterSelector year={this.state.year} season={this.state.season} onYearChange={this.handleYearChange} onSeasonChange={this.handleSeasonChange}/>

                        </Carousel.Item>
                        <Carousel.Item>
                            <h4>Filters</h4>
                            <div className={'addClasses'}>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <Form>
                                                <Form.Switch
                                                    type="switch"
                                                    id="custom-switch"
                                                    label="Open Sections only"
                                                />
                                            </Form>
                                        </td>
                                        <td>
                                            <Form>
                                                {['checkbox'].map((type) => (
                                                    <div key={`inline-${type}`} className="mb-3">
                                                        <Form.Check inline label="M" type={type} id={`inline-${type}-1`} />
                                                        <Form.Check inline label="T" type={type} id={`inline-${type}-1`} />
                                                        <Form.Check inline label="W" type={type} id={`inline-${type}-1`} />
                                                        <Form.Check inline label="T" type={type} id={`inline-${type}-1`} />
                                                        <Form.Check inline label="F" type={type} id={`inline-${type}-1`} />
                                                    </div>
                                                ))}
                                            </Form>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Attributes:
                                            <Autocomplete
                                                className="professor_filter"
                                                size="small"
                                                //multiple
                                                //limitTags={2}
                                                //create function to get all professor for certain course
                                                //options={options}
                                                autoComplete={true}
                                                onChange={(event, object) => {}}
                                                getOptionLabel={(option) => option.prof}
                                                renderInput={(params) => <TextField {...params} variant="outlined"/>}
                                            />
                                        </td>
                                        <td>
                                            Part of Term:
                                            <Autocomplete
                                                className="professor_filter"
                                                size="small"
                                                //multiple
                                                //limitTags={2}
                                                //create function to get all professor for certain course
                                                //options={options}
                                                autoComplete={true}
                                                onChange={(event, object) => {}}
                                                getOptionLabel={(option) => option.prof}
                                                renderInput={(params) => <TextField {...params} variant="outlined"/>}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Form>
                                                <Form.Group controlId="formBasicRange">
                                                    <Form.Label>Start time</Form.Label>
                                                    <Form.Control type="range" />
                                                </Form.Group>
                                            </Form>
                                        </td>
                                        <td>
                                            <Form>
                                                <Form.Group controlId="formBasicRange">
                                                    <Form.Label>End time</Form.Label>
                                                    <Form.Control type="range" />
                                                </Form.Group>
                                            </Form>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Form size="sm">
                                                <Form.Group controlId="exampleForm.SelectCustom">
                                                    <Form.Label>Credits:</Form.Label>
                                                    <Form.Control as="select" custom>
                                                        <option>0</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form>
                                        </td>
                                        <td>


                                            <Form>
                                                <Form.Group controlId="GPAslider">
                                                    <Form.Label>GPA: {this.state.mingpa}</Form.Label>
                                                    <Form.Control type="range" />
                                                </Form.Group>
                                            </Form>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>

                        </Carousel.Item>
                        <Carousel.Item>
                            <div className={"addClasses"}>
                                <h4>Add Classes</h4>
                                <Table>
                                    <thead>
                                    <tr>
                                        <td>
                                            Department:
                                        </td>
                                        <td>
                                            Class:
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <CourseSelect route={this.state.searchRoute} onDeptSelect={this.handleDeptSelect} type={"department"}/>
                                        </td>
                                        <td>
                                            <CourseSelect route={this.state.searchRoute} onClassSelect={this.handleClassSelect} type={"classes"}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Professor:
                                            <Autocomplete
                                                className="professor_filter"
                                                size="small"
                                                //create function to get all professor for certain course
                                                //options={options}
                                                autoComplete={true}
                                                onChange={(event, object) => {}}
                                                getOptionLabel={(option) => option.prof}
                                                renderInput={(params) => <TextField {...params} variant="outlined"/>}
                                            />
                                        </td>
                                        <td>
                                            <Button variant="primary" type="submit" onClick={this.handleAddClick}>
                                                Add Class
                                            </Button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>

                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className={'roster'}>
                    <ReactRoster
                        userCourses={this.state.userCourses}
                        removeClick={{handleRemoveClick: this.handleRemoveClick.bind(this)} }/>
                </div>
            </div>

            <ReactCalendar events={this.state.userCourses}/>

            </html>
        )
    }
}


/*
function FilterCourses(props) {
   return(
       <div className={'filters'}>
           <label>
               <div>
                   Credits
                   <div>
                       <input
                           type={'number'}
                           min={1}
                           max={4}
                       />
                   </div>
               </div>
 
               <div>
                   Professor
                   <Autocomplete
                       className="professor_filter"
                       //create function to get all professor for certain course
                       options={props.options}
                       autoComplete={true}
                       onChange={(event, object) => {
                       }}
                       getOptionLabel={(option) => option.prof}
                       renderInput={(params) => <TextField {...params} variant="outlined"/>}
                   />
               </div>
               <div>
                   Department
                   <Autocomplete
                       className="Department_filter"
                       //create function to get all professor for certain course
                       options={props.options}
                       autoComplete={true}
                       onChange={(event, object) => {
                       }}
                       getOptionLabel={(option) => option.department}
                       renderInput={(params) => <TextField {...params} variant="outlined"/>}
                   />
               </div>
           </label>
       </div>
   )
}
*/
