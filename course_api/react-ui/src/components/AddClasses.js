/*import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import * as data from './roster.json';
import Button from 'react-bootstrap/Button'
import { sleep } from "./FunctionalCalendar.js"
import { Popover } from '@material-ui/core';

let search_input;

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

export default class AddClasses extends React.Component {

    constructor() {
        super();
        this.state = {
            userCourses: []
        }
    }

    handleAddClick() {
        if (search_input==null) {
            alert("Cannot add null class!")
        }
        else if (containsObject(search_input, this.state.userCourses)) {
            alert("Class already in schedule!")
        } else {
            this.setState({userCourses : this.state.userCourses.concat(search_input)}, () => {
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
   render() {
    return(
        <div class="spacer">
            <div class="left">
            <Autocomplete
                options={this.state.userCourses}
                autoComplete={true}
                onChange={(event, object) => {
                    //console.log(object)
                    search_input = object;
                }}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} variant="outlined"/>}
            />
            </div>
            <Button onClick={() => {
                this.handleAddClick();}}> Add
            </Button>
        </div>
    )
   }

}
function AddClass(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
  
    React.useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
        const response = await fetch(props.route).then(response => response.json().then(data => {
          setOptions(data);
      })
      );
        await sleep(1e3);
        let countries = "loading";
        if (response != null) {
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
    return options;
    
}*/
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import * as data from './roster.json';
import Button from 'react-bootstrap/Button'
import { sleep } from "../App.js"
import { Popover } from '@material-ui/core';

let search_input;

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

export default class AddClasses extends React.Component {

    constructor() {
        super();
        this.state = {
            userCourses: []
        }
    }

    handleAddClick() {
        if (search_input==null) {
            alert("Cannot add null class!")
        }
        else if (containsObject(search_input, this.state.userCourses)) {
            alert("Class already in schedule!")
        } else {
            this.setState({userCourses : this.state.userCourses.concat(search_input)}, () => {
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
   render() {
    return(
        <div class="spacer">
            <div class="left">
            <Autocomplete
                options={this.state.userCourses}
                autoComplete={true}
                onChange={(event, object) => {
                    //console.log(object)
                    search_input = object;
                }}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} variant="outlined"/>}
            />
            </div>
            <Button onClick={() => {
                this.handleAddClick();}}> Add
            </Button>
        </div>
    )
   }

}
function AddClass(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
  
    React.useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
        const response = await fetch(props.route).then(response => response.json().then(data => {
          setOptions(data);
      })
      );
        await sleep(1e3);
        let countries = "loading";
        if (response != null) {
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
    return options;

}