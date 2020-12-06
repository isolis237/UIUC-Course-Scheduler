import React, {useEffect, useState} from 'react'
import ReactCalendar from './ReactCalendar'
import AddClasses from './AddClasses'
import ReactRoster from "./FixedRoster"
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../App.css"
import Carousel from 'react-bootstrap/Carousel';
import {Button, Dropdown, DropdownButton, ThemeProvider} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import { FormGroup, List } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from 'react-bootstrap/Table'
import * as rosterdata from './roster.json'
import SemesterSelector from "./SemesterSelector";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import '../../node_modules/react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import CourseSelect from "./CourseSelect";


 let search_input = 1;
 let class_input = 1;

 /*
 var r = document.querySelector(':root');
 function myFunction_get() {
    var rs = getComputedStyle(r);
    alert("The value of --height is: " + rs.getPropertyValue('--height'));
  }
  function myFunction_set() {
    r.style.setProperty('--height', );
  }
*/


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
function color(crn){
    let gray = 2.5
    let brightness = 60
    let r = (Math.sin(crn)+gray)*brightness
    let g = (Math.sin(crn*crn)+gray)*brightness
    let b = (Math.sin(crn*crn*crn)+gray)*(brightness+5)
    return "rgb("+r+","+g+","+b+")";
  }
  function rgb(r, g, b){
    return "rgb("+r+","+g+","+b+")";
  }

// helper function for "random" seed generator

export default class FunctionalCalendar extends React.Component {
   constructor() {
       super();
       this.state = {
           year: "",
           season: "Season",
           department: "",
           class: {
            title: "Temp",
            name: "none",
            number: "none",
            department: "none",
            prof: "none",
            rating: "0",
            disparity: "0",
            credits: "0",
            section: "L1",
            CRN: "12402",
            type: "Lecture",
            daysOfWeek: [2, 4],
            startTime: "14:00",
            slotDuration: "00:50",
            groupId: "this will be changed automatically",
            id: "1",
            display: "auto",
            seatsleft: "0",
            capacity: "30"
           },
           searchRoute : "",
           searchCourseRoute : "",
           rosterRoute : "",
           searchStage : "0",
           userCourses: rosterdata.courses,
           name: "test",
           mingpa: "0",
           totalcredits: "0",
           avgdisparity: "0",
           filterstarttime: "0",
           filterendtime: "0",
           opensections: "false"
       }
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.setClass = this.setClass.bind(this);
        this.handleSeasonChange = this.handleSeasonChange.bind(this)
        this.handleYearChange = this.handleYearChange.bind(this)
        this.handleDeptSelect = this.handleDeptSelect.bind(this)
        this.handleClassSelect = this.handleClassSelect.bind(this)
        this.getCRNs = this.getCRNs.bind(this);
        this.setEventColors = this.setEventColors.bind(this);
        this.eventsel = this.eventsel.bind(this);
        this.setTotalCredits = this.setTotalCredits.bind(this);
        this.setAverageDisparity = this.setAverageDisparity.bind(this);
   }
    setAverageDisparity() {
       let i;
        this.state.avgdisparity = 0;
        for (i=0; i < this.state.userCourses.length; i++) {
            this.state.avgdisparity += this.state.userCourses[i].disparity*1;
        }
        this.state.avgdisparity= Math.round((this.state.avgdisparity/this.state.userCourses.length)*100)/100
        if (this.state.userCourses.length == 0){
            this.state.avgdisparity = 0;
        }
    }
    setTotalCredits() {
        let i;
         this.state.totalcredits = 0;
         for (i=0; i < this.state.userCourses.length; i++) {
             this.state.totalcredits += this.state.userCourses[i].credits*1;
         }
     }
   eventsel(i) {
    this.state.userCourses[i*1].display = "auto"
    //this.state.userCourses[1].setProp( "backgroundColor", "blue")
    this.state.userCourses[i*1].backgroundColor = "blue"
    console.log("test")
   }
   getCRNs() {
    let i;
    let list = [];
    for (i=0; i<this.state.userCourses.length; i++) {
    list[i] = this.state.userCourses[i].CRN
    }
    alert("CRNs: " + list)
   }
   setEventColors() {
       let i;
       this.state.totalcredits = 0;
    for (i=0; i < this.state.userCourses.length; i++) {
    this.state.userCourses[i].backgroundColor = color(this.state.userCourses[i].CRN)
    this.state.userCourses[i].borderColor = this.state.userCourses[i].backgroundColor;
    this.state.userCourses[i].groupId = this.state.userCourses[i].CRN;
    this.state.userCourses[i].title = 

    this.state.userCourses[i].name + " \n" +
    this.state.userCourses[i].disparity + " " + 
    this.state.userCourses[i].rating + "/5 " + 
    this.state.userCourses[i].seatsleft + "/" + 
    this.state.userCourses[i].capacity;

    //full class
    if (this.state.userCourses[i].seatsleft == 0) {
        this.state.userCourses[i].backgroundColor = rgb(50, 30, 30)  
        this.state.userCourses[i].borderColor = this.state.userCourses[i].backgroundColor;
        this.state.userCourses[i].title = 

    this.state.userCourses[i].name + " \n" +
    this.state.userCourses[i].disparity + " " + 
    this.state.userCourses[i].rating + "/5 " + 
    this.state.userCourses[i].seatsleft + "/" + 
    this.state.userCourses[i].capacity + " (FULL)";
    }

    this.state.totalcredits += this.state.userCourses[i].credits*1;
    } 
    console.log(this.state.totalcredits)
    
   }
   
   setClass(courselist) {
    this.setState({userCourses : courselist})
}
  handleAddClick() {
      //this is a temporary class template until the api is done
     
      
      console.log(this.state.class)
 if (this.state.class.name==null) {
     alert("Cannot add null class!")
 }
 else if (containsObject(this.state.class.name, this.state.userCourses)) {
     alert("Class already in schedule!");
 } else {
     this.setState({
         userCourses : this.state.userCourses.concat(this.state.class)}, () => {
         this.setClass(this.state.userCourses);
     })
 }
 this.setTotalCredits();
 this.setAverageDisparity();
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
    
 console.log("search route: " + this.state.searchCourseRoute);
 console.log("search_input: " + search_input.id);
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
        if (e.target.id === "class") {
            this.setState({class: e.target.value}, () => {updateRoutes()});
        }
        if (e.target.id === "gpaslider") {
            this.setState({mingpa: e.target.value}, () => {updateRoutes()});
        }
        if (e.target.id === "starttimeslider") {
            this.setState({filterstarttime: e.target.value}, () => {updateRoutes()});
        }
        if (e.target.id === "endtimeslider") {
            this.setState({filterendtime: e.target.value}, () => {updateRoutes()});
        }
        if (e.target.id === "opensections") {
            this.setState({ opensections: e.target.value }, () => {updateRoutes()});
        }
        //this.setState({userCourses : rosterdata.courses})
       this.setState({
        searchRoute : "search/" + this.state.year + "/" + this.state.season,
        searchCourseRoute : "search/" + this.state.year + "/" + this.state.season + "/" + search_input.id,
        searchStage : this.state.searchStage + 1, 
    });
 console.log("search route: " + this.state.searchCourseRoute);
 console.log("seearch_input: " + search_input.id);
 console.log("this.state.department: " + this.state.department);
 console.log("selected class: " + class_input.id + " " +class_input.name);
 console.log(class_input);
 console.log("mingpa:" + this.state.mingpa);
   }
 
 /*  handleAddClick(courselist) {
       this.setState({userCourses : courselist})
   }*/
 
handleRemoveClick(courselist) {
    this.setState({userCourses: courselist}, () => {
    })
   
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
handleDeptSelect(newDept) {
    this.setState({
        department: newDept,
        searchRoute: "search/" + this.state.year + "/" + this.state.season + "/"
    + newDept}, () => {console.log(this.state.searchRoute)})
}
handleClassSelect(newClass) {
    this.setState({
        class: {
            title: "temp",
            name: this.state.department + " " + newClass,
            number: newClass,
            department: this.state.department,
            prof: "...",
            rating: "3",
            disparity: "3.0",
            credits: "3",
            section: "L1",
            CRN: "12402",
            type: "Lecture",
            daysOfWeek: [2, 4],
            startTime: "14:00",
            slotDuration: "00:50",
            groupId: "this will be changed automatically",
            id: "1",
            display: "auto",
            seatsleft: "0",
            capacity: "30"
        },
        searchRoute: "search/" + this.state.year + "/" + this.state.season + "/"
            + this.state.department + "/" + newClass}, () => {console.log(this.state.searchRoute);
            console.log(this.state.class);})
}
 
   render() {
    
       return(
           this.setEventColors(),
           this.setTotalCredits(),
           this.setAverageDisparity(),
           //this.eventsel(1),
           //this.state.userCourses[1].display = "auto",
        <html>
        <div className={'left_container'} style={{height: window.innerHeight, maxHeight: window.innerHeight}}>
            <div className={'search_fields'} >
                    <Carousel interval={null}>
                        <Carousel.Item>
                        <h4>Choose Semester</h4>
                            <div 
                            //className={'semesterform'}
                            >
                            <SemesterSelector year={this.state.year} season={this.state.season} onYearChange={this.handleYearChange} onSeasonChange={this.handleSeasonChange}/>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                        <h4>Filters</h4>
            <div className={'addClasses'}>
                <Table>
                    <tbody>
                    <tr>
                        <td>
                        exclude full sections {this.state.opensections}
                        <br></br>
                        <Form.Group controlId="opensections">
                            <label class="switch">
                                <input type="checkbox" controlId="opensections" id="opensections" onchange={this.onChange}/>
                                <span class="slider round"></span>
  
                            </label>
                        </Form.Group>
                        </td>
                        <td>
                                <Form>
                                    {['checkbox'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3" style={{height: 5, position: "relative", paddingTop: 0}}>
                                       
                                                        <label class="weekdaysfilter">M</label>
                                                        <label class="weekdaysfilter">T</label>
                                                        <label class="weekdaysfilter">W</label>
                                                        <label class="weekdaysfilter">T</label>
                                                        <label class="weekdaysfilter">F</label>
                                                        <br></br>
                                                        <Form.Check inline type={type} id={`inline-${type}-1`} />
                                                        <Form.Check inline type={type} id={`inline-${type}-1`} />
                                                        <Form.Check inline type={type} id={`inline-${type}-1`} />
                                                        <Form.Check inline type={type} id={`inline-${type}-1`} />
                                                        <Form.Check inline type={type} id={`inline-${type}-1`} />

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
                        <Form.Group controlId="starttimeslider">
                                    <Form.Label>Start time: {this.state.filterstarttime}</Form.Label>
                                <Form.Control type="range" min="8" max="21" step="1" onChange={this.onChange}/>
                                </Form.Group>
                                </Form>
                        </td>
                        <td>
                        <Form>
                        <Form.Group controlId="endtimeslider">
                            <Form.Label>End time: {this.state.filterendtime}</Form.Label>
                                <Form.Control type="range" min="8.5" max="21.5" step="1" onChange={this.onChange}/>
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
                        <Form.Group controlId="gpaslider">
                                    <Form.Label>GPA: {this.state.mingpa}</Form.Label>
                                <Form.Control id="gpaslider" type="range" min="0" max="4" step="0.01" onChange={this.onChange}/>
                                
                                </Form.Group>
                                </Form>
                        </td>
                    </tr>
                             </tbody>
                                </Table> 
                            </div>
                          
                        </Carousel.Item>
                        <Carousel.Item>
                        <h4>Add Classes</h4>
                            <div className={"addClasses"}>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Department: 
                                                <CourseSelect route={this.state.searchRoute} onDeptSelect={this.handleDeptSelect} type={"department"}/>
                                            </td>
                                            <td>
                                                Class:
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
                                        <Button variant="primary" type="submit" onClick={this.handleAddClick} style={{margin: 18}}>
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
            
                <ReactRoster
                    credits={this.state.totalcredits}
                    avggpa={this.state.avgdisparity}
                    userCourses={this.state.userCourses}
                    CRNs={{getCRNs: this.getCRNs.bind(this)}}
                    removeClick={{handleRemoveClick: this.handleRemoveClick.bind(this)}}/>
            
        </div>
        
            <ReactCalendar events={this.state.userCourses} select={{eventsel: this.eventsel.bind(this)}}/>
        
    </html>
       )
   }
}