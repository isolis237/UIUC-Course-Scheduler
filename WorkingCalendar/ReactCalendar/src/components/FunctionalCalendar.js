import React from 'react'
import ReactCalendar from './ReactCalendar'
import AddClasses from './AddClasses'
import ReactRoster from "./FixedRoster"

import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../App.css"

import Carousel from 'react-bootstrap/Carousel';
import {Button, Dropdown, DropdownButton} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";

export default class FunctionalCalendar extends React.Component {
    constructor() {
        super();
        this.state = {
            userCourses: [],
            name: "test"
        }
    }

    handleClick(courselist) {
        this.setState({userCourses : courselist})
    }

    render() {
        return(

            <body>
                <div className={'left_container'}>

                    <div className={'search_fields'}>
                        <div>
                            <Carousel>
                                <Carousel.Item>
                                    <div className={"addClasses"}>
                                        Add Classes
                                        <AddClasses
                                            addClick={{userCourses: this.state.userCourses, handleClick:this.handleClick.bind(this)}}
                                        />
                                    </div>
                                </Carousel.Item>

                                <Carousel.Item>
                                    <div>
                                        Choose Semester
                                        <SemesterTab options={this.state.userCourses}/>
                                    </div>
                                </Carousel.Item>

                                <Carousel.Item>
                                    Filters
                                    <FilterCourses options={this.state.userCourses}/>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        </div>

                    <div className={'roster'}>
                        <ReactRoster userCourses={this.state.userCourses}/>
                    </div>



                </div>

                <div className={'right_container'}>
                    <ReactCalendar events={this.state.userCourses}/>
                </div>

            </body>
        )
    }
}

//Choose semester carousel component

function SemesterTab(props) {
    return(
    <div className="spacer">
        <InputGroup>
            <FormControl
                placeholder="Year"
                aria-label="Year"
                aria-describedby="basic-addon2"
                size="sm"
            />
            <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title="Season"
                id="input-group-dropdown-2"
                size="sm"
            >
                <Dropdown.Item href="#">Fall</Dropdown.Item>
                <Dropdown.Item href="#">Winter</Dropdown.Item>
                <Dropdown.Item href="#">Spring</Dropdown.Item>
                <Dropdown.Item href="#">Summer</Dropdown.Item>
            </DropdownButton>
        </InputGroup>
    </div>
    )
}

//Filter courses carousel component

function FilterCourses(props) {
    return(
        <div className={'filters'}>
            <label>
                <div>
                    Credits
                    <div>
                        <input
                            type={'number'}
                        />
                    </div>
                </div>

                <div>
                    Professor
                    <Autocomplete
                        class="professor_filter"
                        //create function to get all professor for certain course
                        options={props.options}
                        autoComplete={true}
                        onChange={(event, object) => {
                        }}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} variant="outlined"/>}
                    />
                </div>
                <div>
                    Department
                    <Autocomplete
                        class="professor_filter"
                        //create function to get all professor for certain course
                        options={props.options}
                        autoComplete={true}
                        onChange={(event, object) => {
                        }}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} variant="outlined"/>}
                    />
                </div>
            </label>
        </div>
    )
}