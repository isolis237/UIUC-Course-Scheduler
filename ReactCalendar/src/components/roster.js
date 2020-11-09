import { Calendar, CalendarApi } from '@fullcalendar/core';
import React, { useEffect, useState, useRef } from 'react';
import {Button, Dropdown, DropdownButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as rosterdata from "./roster.json"
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

export default class Roster extends React.Component {
    render() {
        return (<div class="rostertable">
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Class</th>
                        <th>prof</th>
                        <th>rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.from({ length: rosterdata.courses.length }).map((_, index) => (<tr key={index}>
                            <Accordion>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            <div class="rostertable">
                                                <td>{rosterdata.courses[index].title}</td><td> {rosterdata.courses[index].prof}</td><td>{rosterdata.courses[index].rating}/5</td>
                                            </div>
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>{rosterdata.courses[index].type}: {rosterdata.courses[index].section}, CRN: {rosterdata.courses[index].CRN}, {rosterdata.courses[index].daysOfWeek}</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion></tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}