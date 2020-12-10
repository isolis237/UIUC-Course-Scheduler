import React,{Component} from 'react';
import '../App.css'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Calendar } from '@fullcalendar/core'




document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    contentHeight: 925,
    plugins: [ timeGridPlugin ],
    initialView: 'timeGridWeek',
    slotMinTime: "08:00:00",
    slotMaxTime: "22:00:00",
    hiddenDays: [ 0, 6 ],
    allDaySlot: false,
    headerToolbar: false,
    dayHeaderFormat: { weekday: 'long' },
    expandRows: true,
    handleWindowResize: true
    });

  calendar.render();

  
    
calendar.updateSize();

  

  
});


/*
function addClass(class1) {
calendar.addEvent( event [ class1, source ] )
}
*/
