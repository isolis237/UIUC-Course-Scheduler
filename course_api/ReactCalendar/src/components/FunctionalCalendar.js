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
 
 
export default class FunctionalCalendar extends React.Component {
   constructor() {
       super();
       this.state = {
           year: "",
           season: "Fall",
           searchRoute : "",
           searchStage : 0,
           userCourses: [],
           name: "test"
       }
        this.onChange = this.onChange.bind(this);
       this.handleClick = this.handleClick.bind(this);
   }
    handleClick() {
       this.setState({
           searchRoute : "search/" + this.state.year + "/" + this.state.season,
           searchStage : this.state.searchStage + 1,
           year : this.state.year + 1
       });
   }
    onChange(e) {
       if (e.target.id === "year") {
           this.setState({ year: e.target.value });
       } else if (e.target.id === "season") {
           this.setState({ season: e.target.value });
       }
   }
 
   handleAddClick(courselist) {
       this.setState({userCourses : courselist})
   }
 
   handleRemoveClick(courselist) {
       this.setState({userCourses: courselist}, () => {
       })
   }
 
   render() {
       let select;
       switch (this.state.searchStage) {
           case (0):
               select = <SemesterSelect onChange={this.onChange} handleClick={this.handleClick} year={this.state.year} season={this.state.season}/>
               break;
           case (1):
               select = <OptionSelect type="Department" route= {this.state.searchRoute}onChange={this.onChange} handleClick={this.handleClick} year={this.state.year} season={this.state.season}/>
               break;
       }
       return(
           <body>
               <div className={'left_container'}>
                   <div className={'search_fields'}>
                       {select}
                   </div>
                   <h1>{this.state.searchRoute}</h1>  
                   <div className={'roster'}>
                       <ReactRoster
                           userCourses={this.state.userCourses}
                           removeClick={{handleRemoveClick: this.handleRemoveClick.bind(this)} }/>
                   </div>
 
               </div>
               
               <div className={'right_container'}>
                   <ReactCalendar events={this.state.userCourses}/>
               </div>
 
           </body>
       )
   }
}
 
//Filter courses carousel component
function SearchView(props) {
 
}
 
function SemesterSelect(props) {
   return (
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
               Next
           </Button>
       </Form>
   );
}
 
function OptionSelect(props) {
    const [list, setList] = useState([]);
    const type = props.type
    useEffect(() => {
        fetch(props.route).then(response => response.json().then(data => {
            setList(data);
        })
        );
    }, []) 
    console.log(list)
    return (
       <Form>
           <Form.Group controlId="List">
               <Form.Label>Select {type}</Form.Label>
               <Form.Control id = "season" as="select" value={props.season} onChange={props.onChange} >
                   <option>J</option>
                   <option>W</option>
                   <option>S</option>
                   <option>S</option>
               </Form.Control>
           </Form.Group>

           <Button variant="primary" type="submit" onClick={props.handleClick}>
               Next
           </Button>
       </Form>
   );
}
 
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
