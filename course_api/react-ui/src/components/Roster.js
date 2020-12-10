import React from 'react'
import Fragment from 'render-fragment';

import Carousel from 'react-bootstrap/Carousel'
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Card from 'react-bootstrap/Card';
import {Button, Dropdown, DropdownButton} from 'react-bootstrap';
import { Calendar, computeSmallestCellWidth } from '@fullcalendar/core';
//import 'http://netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/css/bootstrap-combined.min.css'
//import 'http://netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/js/bootstrap.min.js'
import "../App.css"

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
            /*
        <div>
                <tr data-toggle="collapse" data-target="#demo1" class="accordion-toggle">
                    <td>{course.name}</td>
                    <td>{course.prof}</td>
                    <td>{course.disparity}</td>
                    <td>{course.rating}</td>
                    <td>
                        <Button variant="danger" style={{color: "white", backgroundColor: "#d9534f", width: 10, height: 25}} onClick={() => {this.handleClick(course)}}>
                            <img src="http://pluspng.com/img-png/delete-button-png-delete-icon-1600.png" width="24px;" height="24px"></img>
                        </Button>
                    </td> 
                </tr>
            
                
                
                    <tr colspan="6" class="hiddenRow" class="accordian-body collapse" className={"roster_details2"} id="demo1">
                    {course.type} : {course.section} {" "}
                        credits: {course.credits}{" "}
                        CRN: {course.CRN}{" "}
                        meets: {course.daysOfWeek}{" "}
                    </tr>
                    
                </div>*/

              <Accordion key={course.title}>
                  <Card.Header>
                      <Accordion.Toggle as={Card.Header} eventKey={"0"}>
                          <div class="rostertables">
                      <Table>

                          <tr>
                              <td style={{color:"white", width:"80px", fontWeight:"bold"}}>{course.name}</td>
                              <td style={{color:"white", width:"80px", fontWeight:"bold"}}>{course.prof}</td>
                              <td style={{color:"white", width:"80px", fontWeight:"bold"}}>{course.disparity}</td>
                              <td style={{color:"white", width:"80px", fontWeight:"bold"}}>{course.rating}</td>
                              <td>
                                  <button type="submit" style={{border: "0", background: "#d9534f", width:"40px"}}
                                  onClick={() => {this.handleClick(course)}}>
                                      <img src="http://pluspng.com/img-png/delete-button-png-delete-icon-1600.png"
                                           width="20" height="25" alt="submit" />
                                  </button>
                              </td>
                          </tr>
                      </Table>
                      </div>
                      </Accordion.Toggle>

                  </Card.Header>

                  <Accordion.Collapse eventKey="0">
                      <div style={{padding:"2%"}}>
                          <table style={{width:"400px", color:"white",}}>
                              <tr>
                                  <td style={{width:"80px"}}>{course.type}:</td>
                                  <td style={{width:"80px"}}>{course.section}</td>
                                  <td style={{width:"80px"}}> </td>
                                  <td style={{width:"80px"}}>credits:</td>
                                  <td style={{width:"80px"}}>{course.credits}</td>
                              </tr>
                              <tr>
                                  <td style={{width:"80px"}}>CRN:</td>
                                  <td style={{width:"80px"}}>{course.CRN}</td>
                                  <td style={{width:"80px"}}></td>
                                  <td style={{width:"80px"}}>meets: </td>
                                  <td style={{width:"80px"}}>{course.daysOfWeek}</td>
                              </tr>
                          </table>
                      </div>
                  </Accordion.Collapse>
          </Accordion>


/**
                        <tr>
                             <td style={{color: "white"}}>{course.name}</td>
                             <td style={{color: "white"}}>{course.prof}</td>
                            <td style={{color: "white"}}>{course.disparity}</td>
                            <td style={{color: "white"}}>{course.rating}</td>
                            <td>
                                <div className="deletebutton">
                                    <Button variant="danger"
                                            style={{color: "white", backgroundColor: "#d9534f", width: 29, height: 29}}
                                            onClick={() => {
                                                this.handleClick(course)
                                            }}>
                                        <img src="http://pluspng.com/img-png/delete-button-png-delete-icon-1600.png" width="24px;"
                                             height="24px" style={{marginLeft: -10, marginTop: -5, padding: 0}}></img>
                                    </Button>
                                </div>
                            </td>
                        </tr>
 */

            /**
                        <Accordion defaultActiveKey="0" s>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Click me!
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>Hello! I'm the body</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Click me!
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>Hello! I'm another body</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
            */
        ));
        return mapCourses;

    }

    render() {
        return(
            <div>
                <div className={'roster'}>
                    <div style={{width:"400px",height:"25px", color:"white", padding:"1%"}}>
                        <table>
                            <tr>
                                <td style={{width:"80px", fontWeight:"bold"}}> Class </td>
                                <td style={{width:"80px", fontWeight:"bold"}}> Professor </td>
                                <td style={{width:"80px", fontWeight:"bold"}}> GPA </td>
                                <td style={{width:"80px", fontWeight:"bold"}}> Rating </td>
                                <td style={{width:"80px", fontWeight:"bold"}}>  </td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        {this.renderRoster()}
                    </div>
                    {/**
                    
                <Table>
                    <thead>
                    <tr>
                        <th>Class</th>
                        <th>prof</th>
                        <th>GPA</th>
                        <th>rating</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.renderRoster()}
                    </tbody>

                </Table>
                
                */}
                </div>
            <div className={'rosterbottombar'}>
                    <div class="bottombar">
                    <Table >
                        <thead >
                            <tr>
                                <th style={{border: 0, padding: 13}}>
                                    Credits: {this.props.credits}
                                </th>
                                <th style={{border: 0, padding: 13, paddingRight:60}}>
                                    Avg GPA: {this.props.avggpa*1}                             
                                </th>
                                <th style={{border: 0}}>
                                    
                        <Button 
                            variant="success" 
                            type="submit" 
                            onClick={this.props.CRNs.getCRNs}
                            style={{color:"white", textTransform: "none", width: 100, height: 28, fontSize:13, position:"absolute", bottom: 0, right: 6}}
                        >
                            <span style={{marginTop: -10, marginLeft:-5}}>Retreive CRNs</span>
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
