import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as data from "./dummyData.json"
import TextField from "@material-ui/core/TextField";

export default class ClassSearchBar extends React.Component {
    render() {
        return(
            <div>
                <h> Search Classes </h>
                    <Autocomplete class="class_search_bar"
                        options={data.courses}
                        autoComplete={true}
                        onUpdateInput={this.handleUpdateInput.bind(this)}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
            </div>
            )
    }

    handleUpdateInput = (searchText) => {
        console.log(searchText)
    }

}
