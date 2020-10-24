import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as data from "./dummyData.json"
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";

function getInput(input) {
    return input;
}

var input;

export default class ClassSearchBar extends React.Component {
    render() {
        return(
            <div>
                <h> Search Classes </h>
                    <Autocomplete class="class_search_bar"
                        options={data.courses}
                        autoComplete={true}
                        onInputChange={(event, value) => {
                            input = getInput(value)
                            console.log(value)}}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />

                    <div>
                        <Button
                            className={'addClassBtn'}
                            variant={"outlined"}
                            color={"primary"}
                            onClick={() => {
                                if (input != null) {
                                    alert("Adding " + input + " to schedule")
                                }
                            }}
                        > Add Class </Button>
                    </div>


            </div>
            )
    }


}
