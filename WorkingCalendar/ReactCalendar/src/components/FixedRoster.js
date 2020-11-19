import React from 'react'

import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


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
            <Accordion key={course.title}>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Card.Header} eventKey={"0"}>
                            <div>
                                <b>
                                    <td>{course.title}</td>
                                    <td>{course.prof}</td>
                                    <td>{course.rating}</td>
                                </b>
                            </div>
                        </Accordion.Toggle>

                        <button onClick={() => {this.handleClick(course)}}> Remove Class </button>

                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <div className={"roster_details"}>
                            <tr>{course.type} : {course.section}</tr>
                            <tr> CRN: {course.CRN}</tr>
                            <tr> Meets: {course.daysOfWeek}</tr>
                        </div>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            ));
        return mapCourses;
    }

    render() {
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

                    {this.renderRoster()}

                </Table>

            </div>
            </body>
        )
    }
}