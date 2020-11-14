import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import React from 'react';


//Turn this into a tooltip in the future

/**
function handleMouseEnter(info) {
    alert("Professor: " + info.event.extendedProps.prof + "\n"
              + "Type: " + info.event.extendedProps.type + "\n"
            + "Department: " + info.event.extendedProps.department)
}
*/

//FullCalendar component with events passed in as props from FuncitonalCalendar.js state
export default class ReactCalendar extends React.Component {


   render() {
        return(
            <body>
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


                eventMouseEnter={handleMouseEnter}

                events={this.props.events}
            />
            </body>

        )


    }


}
