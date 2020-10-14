import React,{Component} from 'react';
import '../App.css'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Calendar } from '@fullcalendar/core'


document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    plugins: [ timeGridPlugin ],
    initialView: 'timeGridWeek',
    slotMinTime: "08:00:00",
    slotMaxTime: "22:00:00",
    hiddenDays: [ 0, 6 ],
    allDaySlot: false,
    headerToolbar: {
      start: 'title',
      center: '',
      end: 'today prev,next'
    },

    eventSources: [
      //events must have starts in sequence of yyyy-mm-ddT00:00:00 to show!
      {
        events: [
          {
            title  : 'event1',
            start  : '2020-10-12T12:30:00'
          },
          {
            title  : 'event2',
            start  : '2020-10-15T12:30:00',
            end    : '2020-10-15T14:30:00'
          },
          {
            title  : 'event3',
            start  : '2020-10-14T10:30:00',
          }
        ],
        color: 'blue',
        textColor: 'white'
      }

    ],


    dayHeaderFormat: { weekday: 'long' },
    expandRows: true
    });

  calendar.render();
});

/*
function addClass(class1) {
calendar.addEvent( event [ class1, source ] )
}
*/
