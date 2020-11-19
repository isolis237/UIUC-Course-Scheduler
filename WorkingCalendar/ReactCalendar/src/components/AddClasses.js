import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import * as data from './roster.json';

//variable for getting input from course searchbar
let search_input;

//helper function to see if course already in roster
function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

export default class AddClasses extends React.Component {

    constructor() {
        super();
        this.state = {
            userCourses: []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({userCourses: nextProps.userCourses})
    }

    //adds class to roster if not already added
    //BUGGED causes incorrect update of events when courses are removed
    //possibly due to this.state.userCourses not being in sync with FunctionalCalendar.state.userCourses
    handleClick() {
        if (containsObject(search_input, this.state.userCourses)) {
            alert("Class already in schedule!")
        } else {
            this.setState({userCourses : this.state.userCourses.concat(search_input)}, () => {
                this.props.addClick.handleAddClick(this.state.userCourses);
            })
            alert("Adding " +search_input.title + " to schedule")
        }

    }

    render() {
        return(
            <div>
                <Autocomplete
                    options={data.courses}
                    autoComplete={true}
                    onChange={(event, object) => {
                        search_input = object;
                    }}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => <TextField {...params} variant="outlined"/>}
                />

                <button onClick={() => {this.handleClick();}}>
                    Add Class
                </button>

            </div>

        )
    }
}