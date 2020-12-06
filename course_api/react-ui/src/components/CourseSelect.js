import React from "react"
import {useState, useEffect} from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";




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
                    setOptions(data);
                })
            );
            await sleep(1e3); // For demo purposes.
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
                        console.log(e.target.innerHTML)
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
                    console.log(props.type)
                }
                    else if (props.type == "classes") {
                    console.log(props.type)
                }

                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        id={props.type}
                        label={props.type}
                        variant="outlined"
                        value={props.type}
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