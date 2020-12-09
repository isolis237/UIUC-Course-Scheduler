import React,{Component} from 'react';
import '../App.css'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import * as rosterdata from "./roster.json"




document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    contentHeight: 925,
    plugins: [ timeGridPlugin, interactionPlugin ],
    editable: true,
    initialView: 'timeGridWeek',
    slotMinTime: "08:00:00",
    slotMaxTime: "22:00:00",
    hiddenDays: [ 0, 6 ],
    allDaySlot: false,
    headerToolbar: false,
    dayHeaderFormat: { weekday: 'long' },
    expandRows: true,
    handleWindowResize: true,
    eventDurationEditable: false,
    eventDragMinDistance: 0
    });

calendar.render();
calendar.updateSize();
calendar.addEventSource(rosterdata.courses);
calendar.refetchEvents()
  
});





