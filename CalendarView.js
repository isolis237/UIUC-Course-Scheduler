import React,{Component} from 'react';
import '../App.css';
import FullCalendar from "@fullcalendar/react";
import Calendar from '@fullcalendar/core';
import timeGridPlugin from "@fullcalendar/timegrid";


export default class CalendarView extends React.Component {

    render() {
        return(
            <FullCalendar
                plugins={[ timeGridPlugin ]}
                initialView={"timeGridWeek"}
                allDaySlot={false}
                slotMinTime={"06:00:00"}
                slotMaxTime={"021:00:00"}
                events={[
                    {
                        id: 1,
                        title: 'All-day event',
                        start: 2020-10-8,
                        end: '2020-10-9'
                    }
                ]}
            />
        )
    }

}
