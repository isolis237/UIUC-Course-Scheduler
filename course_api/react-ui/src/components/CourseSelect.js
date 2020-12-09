import React from "react"
import {useState, useEffect} from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import {sleep} from "../App"
import "../App.css"
import * as rosterdata from './roster.json'

export default function CourseSelect(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    function handleChange(e) {
        if (props.type == "department") {
            props.onDeptSelect(e)
        }
        if (props.type == "classes") {
            props.onClassSelect(e)
        }
        if (props.type == "sections") {
            props.onSectionSelect(e)
        }
    }

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }
        var type = props.type;
        const response = "loading";
        (async () => {

            const response = await fetch(props.route).then(response => response.json().then(data => {
                if (type == "classes") {
                    /*
                    let filteredCourses = [];
                    console.log("data.length: " + data.length)
                    for (let i = 0; i < data.length; i++) {
                        console.log("data[i]: " + data[i].name)
                        console.log("data[i]: " + data[i].disparity)
                        if (data[i].disparity > props.mingpa) {
                            filteredCourses.push(data[i])
                        
                        }
                    }
                    /*
                    if (props.closedSections == true) {
                        let filteredCourses = [];
                        console.log("data.length: " + data.length)
                        for (let i = 0; i <data.length; i++) {
                            console.log("data[i]: " + data[i].name)
                            console.log("data[i].seatsleft: " + data[i].seatsleft)
                            if (data[i].seatsleft > 0) {
                                filteredCourses.push(data[i])
                            }
                        }
                        console.log("filter on: " + filteredCourses)
                        data = filteredCourses
                    }
                    */
                    
                }
                //console.log("data props: " + Object.getOwnPropertyNames(data[0]))
                setOptions(data);
                })
            );
            await sleep(1e3); // For demo purposes.
            let courses = "loading";
            if (response != null) {
                courses = await response.json();
            }
            if (active) {
                setOptions(Object.keys(courses).map((key) => courses[key].item[0]));
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
                id={props.type}
                size="small"
                //multiple
                //limitTags={2}
                //style={{ width: 200 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                    console.log(props.route)
                }}
                onClose={(e) => {
                    if (props.type == "department") {
                        setOpen(false);
                        let value = e.target.innerHTML
                        let id = value.split(":")
                        //gross way of getting department but it works use "id[0]"
                        handleChange(id[0])
                    }
                    if (props.type == "classes") {
                        setOpen(false);
                        //Not sure how the api wants the class formatted
                        let value = e.target.innerHTML
                        let id = value.split(":")
                        //gross way
                        handleChange(id[0])
                        //console.log(e.target.innerHTML)
                        //handleChange(CLASS_GOES_HERE)
                    }
                }}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.id + ": " + option.name}
                options={options}
                loading={loading}
                onClick={props.onChange}
                onChange={props.onChange,
                    (event, object) => {
                    if (props.type == "department") {
                    //console.log("department" + props.type)
                }
                    else if (props.type == "classes") {
                    //console.log("classes" + props.type)
                }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        id={props.type}
                        //label={props.type}
                        variant="outlined"
                        value={props.type}
                        onChange={props.onChange}
                        class="autocomplete"
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