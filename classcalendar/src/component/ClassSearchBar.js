import React from 'react'
import ReactSearchBox from 'react-search-box'
import * as data from "./dummyData.json"

export default class ClassSearchBar extends React.Component {
    render() {
        return(
                <ReactSearchBox

                    placeholder="Search Courses"
                    data={data.courses}
                    onSelect={record => console.log(record)}
                    //onChange={value => console.log(value)}
                    fuseConfigs={{
                        threshold: 0.05,
                    }}
                />
            )
    }
}
