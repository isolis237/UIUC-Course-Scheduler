import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import React from 'react';

import userCourses from './ClassSearchBar'
import ClassSearchBar from "./ClassSearchBar";
import * as rosterdata from './roster.json'
import search_input from './ClassSearchBar'

export default class ReactCalendar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            events: props.events
        }
    }


    render() {

        return(
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView={'timeGridWeek'}
                stickyHeaderDates={true}
                stickyFooterScrollbar={true}
                height={'auto'}
                contentHeight={925}
                editable={true}
                slotMinTime={'8:00:00'}
                slotMaxTime={"22:00:00"}
                hiddenDays={[0,6]}
                headerToolbar={false}
                allDaySlot={false}
                expandRows={true}
                handleWindowResize={true}
                eventDurationEditable={false}
                eventDragMinDistance={0}
                dayHeaderFormat={{'weekday':'long'}}
                eventStartEditable={true}
                durationEditable={false}

                eventClick={this.handleDateClick}


                //events={this.state.events}
                //eventContent={renderEventContent}
                eventSources={[this.state.events]}
            />
        )
    }

    handleDateClick = arg => {
            this.setState({events : this.state.events.concat(search_input)}, () => {
                this.forceUpdate()
            })}


}
