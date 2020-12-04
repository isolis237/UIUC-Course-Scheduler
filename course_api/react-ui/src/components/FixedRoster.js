import React from 'react'
import Fragment from 'render-fragment';

import Carousel from 'react-bootstrap/Carousel'
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Button } from '@material-ui/core';
import { computeSmallestCellWidth } from '@fullcalendar/core';



export default class ReactRoster extends React.Component {

    constructor() {
        super();
        this.state = {
            userCourses: []
            
        }
    }

    //sync userCourses on initial render
    componentDidMount() {
        this.setState({userCourses: this.props.userCourses}, () => {
            console.log(this.state.userCourses)
        })
    }

    //update this.state.userCourses whenever a class is added from AddClasses
    componentWillReceiveProps(nextProps) {
        this.setState({userCourses: nextProps.userCourses})
    }

    //click handler for removing course
    handleClick(course) {
        let toDelete = course.title
        let updatedCourses = this.state.userCourses.filter(course => course.title != toDelete);

        this.setState({userCourses: updatedCourses}, () => {
            this.props.removeClick.handleRemoveClick(this.state.userCourses);
        })
    }

    //function that takes this.state.userCourses and returns Accordians of each course
    renderRoster = () => {
        const courses = this.state.userCourses;

        const mapCourses = courses.map((course) => (
            <tr>
            <td>
        <Accordion key={course.title}>
                <Card.Header>
                    <Accordion.Toggle as={Card.Header} eventKey={"0"}>
                                {course.name}
                                
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <div className={"roster_details"}>
                        <tr>{course.type} : {course.section}</tr>
                        <tr> CRN: {course.CRN}</tr>
                        <tr> Meets: {course.daysOfWeek}</tr>
                    </div>
                </Accordion.Collapse>
        </Accordion></td>
        <td>{course.prof}</td>
        <td>{course.rating}</td>
        <td>
            <Button variant="danger" style={{color: "white", backgroundColor: "#d9534f", width: 20, height: 25}} onClick={() => {this.handleClick(course)}}>
            <img src="http://pluspng.com/img-png/delete-button-png-delete-icon-1600.png" width="24px;" height="24px"></img>
            </Button>
        </td>
        </tr>      
            ));
        return mapCourses;
    }

    render() {
        return(
            
            <div>
                <div className={'roster'}>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Class</th>
                        <th>prof</th>
                        <th>rating</th>
                        <th></th>
                    </tr>
                    </thead>

                    {this.renderRoster()}

                </Table>
                </div>
                <div className={'rosterbottombar'}>
                    <div class="bottombar">
                    <Table >
                        <thead >
                            <tr>
                                <th style={{border: 0}}>
                                    Credit Hours:
                                </th>
                                <th style={{border: 0}}>
                                    Billing Credits:                               
                                </th>
                                <th style={{border: 0}}>
                        <Button 
                            variant="success" 
                            type="submit" 
                            onClick={this.props.CRNs.getCRNs}
                            style={{color:"white", backgroundColor: "teal", textTransform: "none"}}
                        >
                            Retreive CRNs
                        </Button>
                        </th>
                            </tr>
                        </thead>
                    </Table>
                    </div>
                </div>
            </div>
            
        )
    }
}
/*
export default class ReactRoster extends React.Component {

    render() {

        const renObjData = this.props.userCourses.map(function(data, idx) {
            return ([
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                <div>
                                    <b>
                                    <td key={idx}>{data.title}</td>
                                    <td key={idx}>{data.prof}</td>
                                    <td key={idx}>{data.rating}</td>
                                    
                                    </b>
                                </div>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <div className={"roster_details"}>
                                <tr key={idx}>{data.type} : {data.section}</tr>
                                <tr key={idx}> CRN: {data.CRN}</tr>
                                <tr key={idx}> Meets: {data.daysOfWeek}</tr>
                            </div>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            ]);
        });

        return(
            <body>
            <div>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Class</th>
                        <th>prof</th>
                        <th>rating</th>
                    </tr>
                    </thead>

                    {renObjData}

                </Table>
                <div className={'rosterbottombar'}>
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    Credit Hours:
                                </th>
                                <th>
                                    Billing Credits:                               
                                </th>
                                <th>
                        <Button 
                            variant="success" 
                            type="submit" 
                            //onClick={this.handleAddClick}
                        >
                            Retreive CRNs
                        </Button>
                        </th>
                            </tr>
                        </thead>
                    </Table>
                </div>
            </div>

            <div>

            </div>
            </body>


        )
    }
}
*/