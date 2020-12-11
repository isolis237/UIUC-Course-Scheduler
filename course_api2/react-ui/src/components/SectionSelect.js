import React from "react"
import {useState, useEffect} from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import {sleep} from "../App"
import "../App.css"
import * as rosterdata from './roster.json'

export default function SectionSelect(props) {
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
                if (type == "sections") {
                    console.log( data)
                    
                    let filteredCourses = [];
                    filteredCourses = data;
                    for ( const elem of data.entries()) {
                        filteredCourses = filteredCourses.filter(elem => elem.disparity > props.mingpa);
                        if (props.opensections == true) {
                        //filteredCourses = filteredCourses.filter(elem => elem.seatsleft > 0);
                        }
                        /*
                        filteredCourses = filteredCourses.filter(elem => elem.startTime > props.filterstarttime);
                        filteredCourses = filteredCourses.filter(elem => (elem.startTime + elem.slotDuration) < props.filterendtime);
                        filteredCourses = filteredCourses.filter(elem => elem.credits > props.filtercredits);
                        
                        if (props.filterweekdays.Monday == true ) {
                            let dayincluded = false;
                            for (let i=0; i<elem.daysOfWeek.length; i++) {
                                if (elem.daysOfWeek[i] == 1) {
                                    dayincluded = true
                                }
                            }
                            filteredCourses = filteredCourses.filter(elem => dayincluded == true )
                        }
                        if (props.filterweekdays.Tuesday == true ) {
                            let dayincluded = false;
                            for (let i=0; i<elem.daysOfWeek.length; i++) {
                                if (elem.daysOfWeek[i] == 2) {
                                    dayincluded = true
                                }
                            }
                            filteredCourses = filteredCourses.filter(elem => dayincluded == true )
                        }
                        if (props.filterweekdays.Wednesday == true ) {
                            let dayincluded = false;
                            for (let i=0; i<elem.daysOfWeek.length; i++) {
                                if (elem.daysOfWeek[i] == 3) {
                                    dayincluded = true
                                }
                            }
                            filteredCourses = filteredCourses.filter(elem => dayincluded == true )
                        }
                        if (props.filterweekdays.Thursday == true ) {
                            let dayincluded = false;
                            for (let i=0; i<elem.daysOfWeek.length; i++) {
                                if (elem.daysOfWeek[i] == 4) {
                                    dayincluded = true
                                }
                            }
                            filteredCourses = filteredCourses.filter(elem => dayincluded == true )
                        }
                        if (props.filterweekdays.Friday == true ) {
                            let dayincluded = false;
                            for (let i=0; i<elem.daysOfWeek.length; i++) {
                                if (elem.daysOfWeek[i] == 5) {
                                    dayincluded = true
                                }
                            }
                            filteredCourses = filteredCourses.filter(elem => dayincluded == true )
                        }
                        */
                    }
                   data = filteredCourses
                   
                  console.log(data[0])
                  
                  
                  
                  
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
               // if no sections are left after filter it will crash
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
                    if (props.type == "sections") {
                        setOpen(false);
                        //Not sure how the api wants the class formatted
                        let value = e.target.innerHTML
                        let id = value.split(":")
                        //gross way
                        //handleChange(id[0])
                        //console.log(e.target.innerHTML)
                        //handleChange(CLASS_GOES_HERE)
                        for (let i=0; i<options.length; i++){
                            if (options[i].section == id[0]) {
                                handleChange(options[i])
                                console.log(options[i])
                            }
                        }
                        
                    }
                }}
                getOptionSelected={(option, value) => option === value}
                getOptionLabel={(option) => option["section"] }
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