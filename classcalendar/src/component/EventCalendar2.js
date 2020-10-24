import React from 'react';
import '../App.css'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Calendar } from '@fullcalendar/core'
import * as data from "./dummyData.json"

document.addEventListener('DOMContentLoaded', function() {
  let calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    plugins: [ timeGridPlugin ],
    stickyHeaderDates: true,
    stickyFooterScrollbar: true,
    height: 'auto',
    initialView: 'timeGridWeek',
    slotMinTime: "08:00:00",
    slotMaxTime: "22:00:00",
    hiddenDays: [ 0, 6 ],
    headerToolbar: false,
    allDaySlot: false,
    eventClick: function(info) {
      info.jsEvent.preventDefault(); // don't let the browser navigate
      removeClass(this, info)
    },
    dayHeaderFormat: { weekday: 'long' },
    expandRows: true
    });

  calendar.addEventSource(data.courses)
  calendar.render();
});


function removeClass(calendar, info) {
  if (info.event.id) {
    alert("Are you sure you want to remove "+info.event.title+"?"+" id: "+info.event.id)
    var event = calendar.getEventById(info.event.id);
    event.remove();
  }
}