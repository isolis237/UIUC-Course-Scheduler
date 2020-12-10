import React, {useEffect, useState} from 'react'
import ReactCalendar from './components/ReactCalendar'
import AddClasses from './components/AddClasses'
import ReactRoster from "./components/Roster"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "./App.css"
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
import * as rosterdata from './components/roster.json'
import SemesterSelector from "./components/SemesterSelector";
import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import CourseSelect from "./components/CourseSelect";
import { render } from 'react-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import update from 'react-addons-update';

 let search_input = 1;
 let class_input = 1;


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
function color(crn, a){
    let gray = 2.5
    let brightness = 60
    let r = (Math.sin(crn)+gray)*brightness
    let g = (Math.sin(crn*crn)+gray)*brightness
    let b = (Math.sin(crn*crn*crn)+gray)*(brightness+5)
    return "rgb("+r+","+g+","+b+","+a+")";
  }
  function rgb(r, g, b, a){
    return "rgb("+r+","+g+","+b+","+a+")";
  }

// helper function for "random" seed generator

export default class FunctionalCalendar extends React.Component {
   constructor() {
       super();
       this.state = {
           year: "Year",
           season: "Season",
           department: "Department",
           class: {
                title: "Temp",
                name: "none",
                number: "Number",
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
                capacity: "30",
                route: ""
           },
           section: "Section",
           searchRoute : "",
           searchCourseRoute : "",
           searchSectionRoute : "",
           rosterRoute : "",
           searchStage : "0",
           userCourses: rosterdata.courses,
           otherSections: rosterdata.otherSections,
           name: "test",
           mingpa: "0",
           totalcredits: "0",
           avgdisparity: "0",
           filterstarttime: "0",
           filterendtime: "0",
           opensections: "false",
           filtercredits: "false", //not yet functional
           filterweekdays: {
               Monday: true,
               Tuesday: true,
               Wednesday: true,
               Thursday: true,
               Friday: true
           }
           
       }
        this.onChange = this.onChange.bind(this);
        //this.handleClick = this.handleClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.setClass = this.setClass.bind(this);
        this.handleSeasonChange = this.handleSeasonChange.bind(this)
        this.handleYearChange = this.handleYearChange.bind(this)
        this.handleDeptSelect = this.handleDeptSelect.bind(this)
        this.handleClassSelect = this.handleClassSelect.bind(this)
        this.handleSectionSelect = this.handleSectionSelect.bind(this)
        this.getCRNs = this.getCRNs.bind(this);
        this.setEventColors = this.setEventColors.bind(this);
        this.eventSel = this.eventSel.bind(this);
        this.switchsections = this.switchsections.bind(this);
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
        /*
        Ivan's version
        
        if (this.state.userCourses.length == 0) {
            return;
        }
        let runningdisp = 0;
        for (let i = 0; i < this.state.userCourses.length; i++) {
            runningdisp += parseInt(this.state.userCourses[i].disparity)
        }
        let avgdisp = Math.round((runningdisp / this.state.userCourses.length) * 100) / 100
        this.setState({avgdisparity : avgdisp})*/
    }
    setTotalCredits() {
        let i;
         this.state.totalcredits = 0;
         for (i=0; i < this.state.userCourses.length; i++) {
             this.state.totalcredits += this.state.userCourses[i].credits*1;
         }
        /*
         Ivan's version
         
         let creds = 0;
       for (let i = 0; i < this.state.userCourses.length; i++) {
           let num = parseInt(this.state.userCourses[i].credits)
           creds += num
       }
       this.setState({totalcredits : creds}); */
     }
   eventSel(i) {
        console.log("route: " + this.state.userCourses[i].route)
        fetch(this.state.userCourses[i].route).then(data => {
            console.log(data);
            for (i=0; i<data.length; i++) {
                data[i].isothersection="true";
            }
        })
   }
   switchsections(useri, otheri) {
        if (useri != null && otheri != null) {
        //this.handleRemoveClick(this.state.userCourses[useri])

        /*
        let toDelete = this.state.userCourses[useri].title
        let updatedCourses = this.state.userCourses.filter(course => course.title != toDelete);
        this.setState({userCourses: updatedCourses}, () => {
            this.handleRemoveClick(this.state.userCourses);
        })
        this.setState({
            userCourses : this.state.userCourses.concat(this.state.otherSections[otheri])}, () => {
            this.setClass(this.state.userCourses);
        })
        this.setEventColors()
        */
       /*
        this.setState(update(this.state, {
            userCourses: {
              [useri]: {
                $set: this.state.otherSections[otheri]
              }
            }
          }), () => {this.setClass(this.state.userCourses); console.log(this.state.userCourses)})
        */
       let update = () => {
            
        this.setState({
            userCourses: this.state.userCourses
        }, () => {console.log(this.state.searchRoute)});
        }
          let temp = []
        temp = this.state.userCourses
        temp[useri] = this.state.otherSections[otheri]
        this.setState({
            userCourses: temp
        }, () => {update()})
        //this.state.userCourses[useri] = this.state.otherSections[otheri]
        console.log(this.state.userCourses[useri] = this.state.otherSections[otheri])
        //this.state.userCourses[useri].isothersection = "false";
        this.setEventColors()
        }
        else {
            console.log("this.switchsections failure " + useri + " " + otheri)
        }
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
    for (i=0; i<this.state.otherSections.length; i++) {
        this.state.otherSections[i].backgroundColor = color(this.state.otherSections[i].CRN, 0.2)
        this.state.otherSections[i].borderColor = this.state.otherSections[i].backgroundColor
        this.state.otherSections[i].id = this.state.otherSections[i].CRN;
        this.state.otherSections[i].groupId = this.state.otherSections[i].CRN;
        this.state.otherSections[i].title = 

        this.state.otherSections[i].name + "    \t" +
        "seats: " + this.state.otherSections[i].seatsleft + "/" + this.state.otherSections[i].capacity + " \n\t\t\t" +
        "gpa: " + this.state.otherSections[i].disparity + " \n\t\t\t" + 
        "prof: " + this.state.otherSections[i].rating + "/5"; 
    }
    if (this.state.userCourses.length > 0) {
    this.state.userCourses[this.state.userCourses.length-1].route = this.state.searchRoute;
    console.log(this.state.userCourses[this.state.userCourses.length-1].route)
    }
    
    this.state.totalcredits = 0;
    for (i=0; i < this.state.userCourses.length; i++) {
    this.state.userCourses[i].backgroundColor = color(this.state.userCourses[i].CRN, 1)
    this.state.userCourses[i].borderColor = this.state.userCourses[i].backgroundColor;
    this.state.userCourses[i].groupId = this.state.userCourses[i].CRN;
    this.state.userCourses[i].id = this.state.userCourses[i].CRN;
    this.state.userCourses[i].title = 

    this.state.userCourses[i].name + "    \t" +
    "seats: " + this.state.userCourses[i].seatsleft + "/" + this.state.userCourses[i].capacity + " \n\t\t\t" +
    "gpa: " + this.state.userCourses[i].disparity + " \n\t\t\t" + 
    "prof: " + this.state.userCourses[i].rating + "/5"; 
    
    //full class
    if (this.state.userCourses[i].seatsleft == 0) {
        this.state.userCourses[i].backgroundColor = rgb(50, 30, 30, .5)  
        this.state.userCourses[i].borderColor = this.state.userCourses[i].backgroundColor;
        this.state.userCourses[i].title = 

        this.state.userCourses[i].name + "    \t" +
    
        "seats: " + this.state.userCourses[i].seatsleft + "/" + this.state.userCourses[i].capacity + " (FULL) \n\t\t\t" +
        "gpa: " + this.state.userCourses[i].disparity + " \n\t\t\t" + 
        "prof: " + this.state.userCourses[i].rating + "/5"
    }
    this.state.totalcredits += this.state.userCourses[i].credits*1;
    } 
   }
   
   setClass(courselist) {
    this.setState({userCourses : courselist})
}
  handleAddClick() {
      //this is a temporary class template until the api is done
      console.log(this.state.class.name)
    
 if (this.state.class.name==null) {
     alert("Cannot add null class!")
 }
 if (containsObject(this.state.class, this.state.userCourses)) {
     alert("Class already in schedule!");
 } 
 else {
     this.setState({
         userCourses : this.state.userCourses.concat(this.state.class)}, () => {
         this.setClass(this.state.userCourses);
     })
     
     
 }

//this.state.userCourses[i].route = this.state.searchRoute;
//console.log(this.state.userCourses[i].route)
 this.setTotalCredits();
 this.setAverageDisparity();
 this.setEventColors();
}
/*    handleClick() {  
    this.setState({
        searchRoute : "search/" + this.state.year + "/" + this.state.season,ss
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
   */
    onChange(e) {
        
        let updateRoutes = () => {
            
            this.setState({
                searchRoute : "search/" + this.state.year + "/" + this.state.season,
                department : search_input.id,
                searchCourseRoute : "search/" + this.state.year + "/" + this.state.season + "/" + this.state.department,
                mingpa : this.state.mingpa,
                filtercredits: this.state.filtercredits
            }, () => {console.log(this.state.searchRoute)});
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
        if (e.target.id === "credits") {
            this.setState({filtercredits: e.target.value}, () => {updateRoutes()})
        }
        if (e.target.id === "opensections") {
            this.setState({ opensections: e.target.checked }, () => { console.log("open sections: " + this.state.opensections)
                updateRoutes()
                if (this.state.opensections == true) {
                    //filter courses based on capacity property
                    //fetch /search/year/semester/department
                    /**
                     let filteredCourses;
                     for (let i = 0; i < fetchedCourses.length; i++) {
                        if (fetchedCourses[i].seatsleft > 0) {
                            filteredCourses.push(fetchedCourses[i])
                        }
                     }
                     */
                    //send filteredCourses to be option property of Autocomplete component
                }
            });
        }
        
        //this.setState({userCourses : rosterdata.courses})
       this.setState({
        searchRoute : "search/" + this.state.year + "/" + this.state.season,
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
    this.setState({
        searchRoute: "search/" + newYear + "/" + this.state.season, year: newYear,
        deptSearchRoute: "search/" + newYear + "/" + this.state.season}, () => {
        console.log(this.state.searchRoute)
    })
}
handleSeasonChange(newSeason) {
    this.setState({
        searchRoute: "search/" + this.state.year + "/" + newSeason, season: newSeason}, () => {
        console.log(this.state.searchRoute)
    })
    this.setState({deptSearchRoute: "search/" + this.state.year + "/" + newSeason}, () => {
        console.log(this.state.deptSearchRoute)
    })

}
handleDeptSelect(newDept) {
    if (newDept.length > 0) {
        this.setState({searchRoute: "search/" + this.state.year + "/" + this.state.season + "/" + newDept,
        department: newDept
            }, () => {console.log(this.state.searchRoute)})

        this.setState({searchCourseRoute: "search/" + this.state.year + "/" + this.state.season + "/" + newDept
                }, () => {console.log(this.state.searchRoute)})
    }
}
handleClassSelect(newClass) {
    fetch(this.state.searchRoute)
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
            seatsleft: "1",
            capacity: "30"
        },
        searchRoute: "search/" + this.state.year + "/" + this.state.season + "/" + this.state.department + "/" + newClass,
        searchSectionRoute: "search/" + this.state.year + "/" + this.state.season + "/" + this.state.department + "/" + newClass},

        () => {console.log(this.state.searchRoute); console.log(this.state.class); console.log("searchsection:" + this.state.searchSectionRoute);})
}
handleSectionSelect(newSection) {
    if (newSection.length > 0) {
        this.setState({
            searchRoute: "search/" + this.state.year + "/" + this.state.season + "/" + this.state.class + "/" + newSection,
            class: newSection,
            section: this.state.class.section
        }, () => {console.log(this.state.searchRoute)})
    }
}
 
   render() {
    
       return(
           //initialize 
           this.setEventColors(),
           this.setTotalCredits(),
           this.setAverageDisparity(),
           //this.eventSel(1),
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
                            
                            <Breadcrumb>
                                <Breadcrumb.Item style={{color: "whitesmoke"}}>{this.state.year}</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.state.season}</Breadcrumb.Item>    
                                <Breadcrumb.Item>{this.state.department}</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.state.class.number}</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.state.section}</Breadcrumb.Item>
                            </Breadcrumb>
                            
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
                        <text style={{color:"white"}}>Exclude full sections</text>
                        <br></br>
                        <Form.Group controlId="opensections">
                            <label class="switch">
                                <input type="checkbox" controlId="opensections" id="opensections" 
                                /**onChange={(e) => {console.log(e.target.checked)}}*/
                                onChange={(e) => {this.onChange(e)}}
                                />
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
                                                        <Form.Check inline type={type} id={`inline-${type}-1`}
                                                                    onChange={(e) => {this.state.filterweekdays["Monday"] = e.target.checked; console.log(this.state.filterweekdays)}}/>
                                                        <Form.Check inline type={type} id={`inline-${type}-1`}
                                                                    onChange={(e) => {this.state.filterweekdays["Tuesday"] = e.target.checked; console.log(this.state.filterweekdays)}}/>
                                                        <Form.Check inline type={type} id={`inline-${type}-1`}
                                                                    onChange={(e) => {this.state.filterweekdays["Wednesday"] = e.target.checked; console.log(this.state.filterweekdays)}}/>
                                                        <Form.Check inline type={type} id={`inline-${type}-1`}
                                                                    onChange={(e) => {this.state.filterweekdays["Thursday"] = e.target.checked; console.log(this.state.filterweekdays)}}/>
                                                        <Form.Check inline type={type} id={`inline-${type}-1`}
                                                                    onChange={(e) => {this.state.filterweekdays["Friday"] = e.target.checked; console.log(this.state.filterweekdays)}}/>

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
                         <Form.Group controlId="credits">
                           <Form.Label>Credits:</Form.Label>
                           <Form.Control as="select" custom onChange={this.onChange}>
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
                            <Breadcrumb>
                                <Breadcrumb.Item style={{color: "whitesmoke"}}>{this.state.year}</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.state.season}</Breadcrumb.Item>    
                                <Breadcrumb.Item>{this.state.department}</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.state.class.number}</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.state.section}</Breadcrumb.Item>
                            </Breadcrumb>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <text style={{color:"white"}}>Department: </text>
                                                <CourseSelect 
                                                    route={this.state.deptSearchRoute} 
                                                    onDeptSelect={this.handleDeptSelect} 
                                                    type={"department"}
                                                    />
                                            </td>
                                            <td>
                                                <text style={{color:"white"}}>Class: </text>
                                                <CourseSelect
                                                    route={this.state.searchCourseRoute}
                                                    onClassSelect={this.handleClassSelect}
                                                    type={"classes"}
                                                />
                                            </td>
                                        </tr>
                                    <tr>
                                        <td><text style={{color:"white"}}>Professor: </text>
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
                                                <text style={{color:"white"}}>Section: </text>
                                                <CourseSelect
                                                    route={this.state.searchSectionRoute}
                                                    onSectionSelect={this.handleSectionSelect}
                                                    type={"sections"}
                                                    mingpa={this.state.mingpa}
                                                    opensections={this.state.opensections}
                                                    filterstarttime={this.state.filterstarttime}
                                                    filterendtime={this.state.filterendtime}
                                                    filtercredits={this.state.filtercredits}
                                                    filterweekdays={this.state.filterweekdays}
                                                    //closedSections={this.state.opensections}
                                                    //mingpa={this.state.mingpa}
                                                />
                                            </td>
                                    </tr>
                                    <tr>
                                        <td></td>
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
        
            <ReactCalendar 
            events={this.state.userCourses} 
            otherSections={this.state.otherSections} 
            switch={{switchsections: this.switchsections.bind(this)}}
            setcolors={{setEventColors: this.setEventColors.bind(this)}} 
            select={{eventSel: this.eventSel.bind(this)}}
            />
        
    </html>
       )
   }
}
/*
export function rosterCRNs(this) {
    let i;
    let list = [];
    for (i=0; i<this.state.userCourses.length; i++) {
    list[i] = this.state.userCourses[i].CRN
    }
    alert("CRNs: " + list)
}
*/

export function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
/*
function Departments(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    var type = props.type;
    const response = "loading";
    (async () => {
       
      const response = await fetch(props.route).then(response => response.json().then(data => {
        setOptions(data);
    })
    );
      await sleep(1e3); // For demo purposes.
      const countries = "loading";
     /* if (response != null) {
      countries = await response.json();
    }
      if (active) {
        setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div >
    <Autocomplete
      id="departments"
      size="small"
      //multiple
      //limitTags={2}
      //style={{ width: 200 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.id + ": " + option.name}
      options={options}
      loading={loading}
      onClick={props.onChange}
      onChange={props.onChange,
        (event, object) => {
          if (props.type == "department") {
        search_input = object;
          }
          else if (props.type == "classes") {
        class_input = object;
          }
          
    }}
      renderInput={(params) => (
        <TextField
          {...params}
          id="department"
          label={props.type}
          variant="outlined"
          value={props.department}
          onChange={props.onChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
        
        )}
    />
    </div>
  );
}

*/
