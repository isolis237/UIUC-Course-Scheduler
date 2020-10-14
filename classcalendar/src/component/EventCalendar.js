import React,{Component} from 'react';
import '../App.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default class EventCalendar extends Component {
    render(){
        return (
            <FullCalendar 
            
            plugins={[ dayGridPlugin ]}
            initialView="dayGridWeek"
            weekends={false}
            events={[
            { title: 'ECE 120', date: '2020-10-16' },
            { title: 'Math 231', date: '2020-10-15' }
            ]}

            />

        )
    }
}
