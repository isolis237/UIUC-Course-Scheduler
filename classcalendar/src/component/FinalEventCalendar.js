import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import * as data from './dummyData.json'

export default class FinalEventCalendar extends React.Component {

    state = {
        //events which will be rendered onto the calendar (temporarily 2 test objects)
        calendarEvents: [data.courses[0], data.courses[1]]
    }

    render() {
        return (
            <FullCalendar

                //default settings

                plugins={[timeGridPlugin]}
                stickyHeaderDates={true}
                height={'auto'}
                initialView={'timeGridWeek'}
                slotMinTime={"08:00:00"}
                slotMaxTime={"22:00:00"}
                hiddenDays={[0, 6]}
                headerToolbar={false}
                expandRows={true}
                allDaySlot={false}

                eventContent={renderEventContent}

                //user-configurable settings

                events={this.state.calendarEvents}
            />
        )


    }



}

//customize how event is displayed

function renderEventContent(eventInfo) {
    return (
        <>
            <div>
                <b>{eventInfo.event.title+"\n"}</b>
            </div>
            <footer>
                {"Event id: " + eventInfo.event.id}
            </footer>

        </>
    )
}