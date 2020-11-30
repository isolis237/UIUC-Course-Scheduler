import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import * as data from './roster.json';


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

export default class AddClasses extends React.Component {

    constructor() {
        super();
        this.state = {
            userCourses: []
        }
    }

    handleAddClick() {
        if (containsObject(search_input, this.state.userCourses)) {
            alert("Class already in schedule!")
        } else {
            this.setState({userCourses : this.state.userCourses.concat(search_input)}, () => {
                //console.log(this.state.userCourses)
            })
            alert("Adding " + search_input.title + " to schedule")
        }

    }



    render() {
        return(
            <div>
                <Autocomplete
                    options={data.courses}
                    autoComplete={true}
                    onChange={(event, object) => {
                        //console.log(object)
                        search_input = object;
                    }}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => <TextField {...params} variant="outlined"/>}
                />

                <button onClick={() => {
                    this.handleAddClick();
                    this.props.addClick.handleClick(this.state.userCourses);
                }
                }> Add Class </button>

            </div>

        )
    }
}