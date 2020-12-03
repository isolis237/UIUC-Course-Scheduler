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
function rgb(r, g, b){
    return "rgb("+r+","+g+","+b+")";
  }


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
           searchStage : 0,
           userCourses: [],
           name: "test"
       }
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
        rosterRoute : "/roster" + class_input.id,
        searchStage : this.state.searchStage + 1, 
    });
    var prop = {
     type: "Department",
     route: this.state.searchRoute
 }
 console.log("search route: " + this.state.searchCourseRoute);
 console.log("selected department: " + search_input.id);
 console.log("selected class: " + class_input.id + " " +class_input.name);
 console.log(class_input);
   }
   
    onChange(e) {
       if (e.target.id === "year") {
           this.setState({ year: e.target.value });
       } //used to have an else right here
       if (e.target.id === "season") {
           this.setState({ season: e.target.value });
       }
       
       this.setState({
        searchRoute : "search/" + this.state.year + "/" + this.state.season,
        searchCourseRoute : "search/" + this.state.year + "/" + this.state.season + "/" + search_input.id,
        searchStage : this.state.searchStage + 1, 
    });
    var prop = {
     type: "Department",
     route: this.state.searchRoute
 }
   }
 
 /*  handleAddClick(courselist) {
       this.setState({userCourses : courselist})
   }*/
 
   handleRemoveClick(courselist) {
       this.setState({userCourses: courselist}, () => {
       })
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
        <html>
        <div className={'left_container'}>
            <div className={'search_fields'}>
                    <Carousel interval={null}>
                        <Carousel.Item>
                            
                            <h4>Choose Semester</h4>
                            <SemesterSelect onChange={this.onChange} handleClick={this.handleClick} year={this.state.year} season={this.state.season}/>
                            
                          
                        </Carousel.Item>
                        <Carousel.Item>
                            <h4>Filters</h4>
                            
                            
                            <Departments route= {this.state.searchRoute} type="department" onChange={this.onChange} handleClick={this.handleClick}/>
                          
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className={"addClasses"}>
                                <h4>Add Classes</h4>
                                <Departments route= {this.state.searchCourseRoute} type="classes" onChange={this.onChange} handleClick={this.handleClick}/>
                                <Button variant="primary" type="submit" onClick={this.handleAddClick}>
                                    Add
                                </Button>
                                
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
    <div className={'filters'}>
    <Autocomplete
      id="departments"
      size="small"
      //multiple
      //limitTags={2}
      style={{ width: 300 }}
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
      onChange={(event, object) => {
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
    
    <Button variant="primary" type="submit" onClick={props.handleClick}>
        update
    </Button>
    </div>
  );
}

function SemesterSelect(props) {
   return (
       <div class="spacer">
       <Form>
           <Form.Group controlId="Year">
               <Form.Label>Year</Form.Label>
               <Form.Control id = "year" type="text" value={props.year} placeholder="Enter year" onChange={props.onChange} />
           </Form.Group>
 
           <Form.Group controlId="Season">
               <Form.Label>Season</Form.Label>
               <Form.Control id = "season" as="select" value={props.season} onChange={props.onChange} >
                   <option>Fall</option>
                   <option>Winter</option>
                   <option>Spring</option>
                   <option>Summer</option>
               </Form.Control>
           </Form.Group>
 
           <Button variant="primary" type="button" onClick={props.handleClick}>
               update
           </Button>
       </Form>
       </div>
 
   );
}
/*
function OptionSelect(props) {
    const [list, setList] = useState([]);
    const [options, setOptions] = React.useState([]);
    const type = props.type
    useEffect(() => {
        fetch(props.route).then(response => response.json().then(data => {
            setList(data);
            setOptions(data);
        })
        );
    }, []) 
    
    const buttonStyle = {
        height: "25px",
        padding: "1px",
        margin: "1px",
        fontFamily: "Arial",
        fontSize: "15px",
        border: "1px solid lightgray",
        borderRadius: "5px"
    }
    
    return (
       <div>
            {list.map(item => {
                return (  
                    <Button style = {buttonStyle} variant="primary" type="submit" onClick={props.handleClick}>
                        {item.id + ": " + item.name}
                    </Button>
                )
            })}

           <Button variant="primary" type="submit" onClick={props.handleClick}>
               Next
           </Button>
       </div>
   );
}
*/

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
