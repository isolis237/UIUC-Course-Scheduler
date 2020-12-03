import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import React from 'react';

import ClassSearchBar from "./ClassSearchBar";
import * as rosterdata from './roster.json'
import userCourses from './FunctionalCalendar.js'



export default class ReactCalendar extends React.Component {

   render() {
        return(
            <body>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView={'timeGridWeek'}
                stickyHeaderDates={true}
                stickyFooterScrollbar={true}
                height={'940px'}
                //contentHeight={'auto'}
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
                editable={true}
                events={this.props.events}
            />
            </body>

        )


    }


}
