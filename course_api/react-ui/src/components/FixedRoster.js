import React from 'react'
import Fragment from 'render-fragment';

import Carousel from 'react-bootstrap/Carousel'
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

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
            </div>

            <div>

            </div>
            </body>


        )
    }
}