import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as data from "./dummyData.json"
import TextField from "@material-ui/core/TextField"
import Carousel from 'react-bootstrap/Carousel'
import {Button, Dropdown, DropdownButton} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import '../App.css'

function getInput(input) {
    return input;
}

var input;


export default class Auto extends React.Component {
    render() {
        return(
            <div class="carousel">
                <Carousel interval={null}>
                <Carousel.Item>
                <h3>Choose Semester</h3>
                    <div class="spacer">
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
                <Carousel.Caption>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <div class="spacer"><h3>Filter Classes</h3>
                <p>credits, time, attributes, etc</p></div>
                <Carousel.Caption>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <h3>Search Classes</h3>
                    <div class="spacer">
                    <Autocomplete class="class_search_bar"
                        options={data.courses}
                        autoComplete={true}
                        onInputChange={(event, value) => {
                            input = getInput(value)
                            console.log(value)}}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                    </div>
                <Carousel.Caption>
                    <p></p>
                </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
            </div>
            )
    }
}
