import React from 'react'
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {Dropdown, DropdownButton} from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import "../App.css"

export default class SemesterSelector extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            year : "2020",
            season : 'Fall'
        }
    }

    handleChange(e) {
        if (e.target.id === "year") {
            this.props.onYearChange(e.target.value)
        }
        if (e.target.id === "Fall" || e.target.id === "Summer" || e.target.id === "Winter" || e.target.id === "Spring" ) {
            this.props.onSeasonChange(e.target.id)
        }

    }

    render() {
        return (
    <Table>
        <tbody>
            <tr>
                <td>
                <div className={'semesterform'}>
            <>
                <InputGroup >
                <div class="yearform">
                    <FormControl
                        placeholder="Year"
                        aria-label="Year"
                        aria-describedby="basic-addon2"
                        controlId="Year"
                        id = "year"
                        type="text"
                        //value={this.props.year}
                        placeholder="Enter year"
                        onChange={this.handleChange}
                    />
                </div>
                <div class="seasonform">
                        <DropdownButton
                            as={InputGroup.Append}
                            variant="primary"
                            title={this.props.season}
                            value={this.props.season}
                            id="season"
                            //onClick={this.handleChange}
                        >
                            <Dropdown.Item id={"Fall"} onClick={this.handleChange}>Fall</Dropdown.Item>
                            <Dropdown.Item id={"Winter"} onClick={this.handleChange}>Winter</Dropdown.Item>
                            <Dropdown.Item id={"Spring"} onClick={this.handleChange}>Spring</Dropdown.Item>
                            <Dropdown.Item id={"Summer"} onClick={this.handleChange}>Summer</Dropdown.Item>

                        </DropdownButton>
                </div>
                </InputGroup>
            </>
            </div>
        </td>
    </tr>
</tbody>
</Table>
        );
    }
}