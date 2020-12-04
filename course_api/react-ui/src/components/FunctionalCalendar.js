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
import * as rosterdata from './roster.json'
import SemesterSelector from "./SemesterSelector";


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
function rgb(crn){
    let gray = 2.5
    let brightness = 60
    let r = (Math.sin(crn)+gray)*brightness
    let g = (Math.sin(crn*crn)+gray)*brightness
    let b = (Math.sin(crn*crn*crn)+gray)*(brightness+5)
    return "rgb("+r+","+g+","+b+")";
  }

// helper function for "random" seed generator

export default class FunctionalCalendar extends React.Component {
   constructor() {
       super();
       this.state = {
           year: "",
           season: "Fall",
           department: "",
           searchRoute : "",
           searchCourseRoute : "",
           rosterRoute : "",
           searchStage : "0",
           userCourses: rosterdata.courses,
           name: "test",
           mingpa: "0",
           totalcredits: "0",
           avgdisparity: "0"
       }
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSeasonChange = this.handleSeasonChange.bind(this)
        this.handleYearChange = this.handleYearChange.bind(this)
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
    }
    setTotalCredits() {
        let i;
         this.state.totalcredits = 0;
         for (i=0; i < this.state.userCourses.length; i++) {
             this.state.totalcredits += this.state.userCourses[i].credits*1;
         }
     }
   eventsel(i) {
    this.state.userCourses[i].display = "auto"
    this.state.userCourses[i].backgroundColor = "blue"
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
    this.state.userCourses[i].backgroundColor = rgb(this.state.userCourses[i].CRN)
    this.state.userCourses[i].borderColor = this.state.userCourses[i].backgroundColor;
    this.state.userCourses[i].groupId = this.state.userCourses[i].CRN;
    this.state.userCourses[i].title = this.state.userCourses[i].name + " " + this.state.userCourses[i].rating + "/5 " + this.state.userCourses[i].disparity;
    this.state.totalcredits += this.state.userCourses[i].credits;
    } 
    console.log(this.state.totalcredits)
    
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
    var prop = {
     type: "Department",
     route: this.state.searchRoute
 }
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
        if (e.target.id === "gpaslider") {
            this.setState({mingpa: e.target.value}, () => {updateRoutes()});
        }
        //this.setState({userCourses : rosterdata.courses})
       this.setState({
        searchRoute : "search/" + this.state.year + "/" + this.state.season,
        searchCourseRoute : "search/" + this.state.year + "/" + this.state.season + "/" + search_input.id,
        searchStage : this.state.searchStage + 1, 
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
 
   render() {
        /* 
        let select;
       switch (this.state.searchStage) {
           case (0):
               select = <SemesterSelect onChange={this.onChange} handleClick={this.handleClick} year={this.state.year} season={this.state.season}/>
               break;
           case (1):
               select = <OptionSelect type="Department" route= {this.state.searchRoute}onChange={this.onChange} handleClick={this.handleClick} year={this.state.year} season={this.state.season}/>
               break;
           case (2):
                select = <OptionSelect type="Class" route= {this.state.searchRoute}onChange={this.onChange} handleClick={this.handleClick} year={this.state.year} season={this.state.season}/>
                break;
           case (3):
                select = <OptionSelect type="Section" route= {this.state.searchRoute}onChange={this.onChange} handleClick={this.handleClick} year={this.state.year} season={this.state.season}/>
                break;
       }
       */
       return(
           this.setEventColors(),
           this.setTotalCredits(),
           this.setAverageDisparity(),
           //this.state.userCourses[1].display = "auto",
        <html>
        <div className={'left_container'} style={{height: window.innerHeight, maxHeight: window.innerHeight}}>
            <div className={'search_fields'}>
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
                        <h4>Add Classes</h4>
                            <div className={"addClasses"}>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>
                                            Department: 
                                                <Departments route= {this.state.searchRoute} type="department" onChange={this.onChange} handleClick={this.handleClick}/>
                                            </td>
                                            <td>
                                            Class:
                                                <Departments route= {this.state.searchCourseRoute} type="classes" onChange={this.onChange} handleClick={this.handleClick}/>
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
    }*/
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

