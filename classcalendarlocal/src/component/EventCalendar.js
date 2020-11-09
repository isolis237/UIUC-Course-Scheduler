import React from 'react';
import '../App.css'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Calendar } from '@fullcalendar/core'
import * as data from "./dummyData.json"
import interactionPlugin from '@fullcalendar/interaction'
import * as rosterdata from "./roster.json"




document.addEventListener('DOMContentLoaded', function() {
  let calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    stickyHeaderDates: true,
    stickyFooterScrollbar: true,
    height: 'auto',
    contentHeight: 925,
    plugins: [ timeGridPlugin, interactionPlugin ],
    editable: true,
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
    expandRows: true,
    handleWindowResize: true,
    eventDurationEditable: false,
    eventDragMinDistance: 0
    });

  calendar.addEventSource(data.courses)
  calendar.render();
  calendar.updateSize();
  calendar.addEventSource(rosterdata.courses);
  calendar.refetchEvents();
});


function removeClass(calendar, info) {
  if (info.event.id) {
    alert("Are you sure you want to remove "+info.event.title+"?"+" id: "+info.event.id)
    var event = calendar.getEventById(info.event.id);
    event.remove();
  }
}



