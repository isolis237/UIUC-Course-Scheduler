import FullCalendar, { CalendarApi, render } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'
import React from 'react';
import * as rosterdata from './roster.json'

/*
eventClick: function(info) {
    alert('Event: ' + info.event.title);
    alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    alert('View: ' + info.view.type);

    // change the border color just for fun
    info.el.style.borderColor = 'red';
  }
  */

/*
 let i;
 for (i=0; i<rosterdata.courses.length; i++) {
 userCourses[i] = rosterdata.courses[i]
 console.log(userCourses[i])
 }
*/

export default class ReactCalendar extends React.Component {

    calendarRef = React.createRef()

   render() {
       
       let courses
       
   
        return(
            
            
            /*
                courses = this.props.events,
            
            document.addEventListener('DOMContentLoaded', function() {
                var calendarEl = document.getElementById('calendar');
                var calendar = new Calendar(calendarEl, {
                  plugins: [ timeGridPlugin, interactionPlugin ],
                  initialView: 'timeGridWeek',
                  stickyHeaderDates: true,
                  stickyFooterScrollbar: true,
                  height: window.innerHeight,
                  //contentHeight={'auto'}
                  editable: true,
                  slotMinTime: '8:00:00',
                  slotMaxTime: "22:00:00",
                  hiddenDays: [0,6],
                  headerToolbar: false,
                  allDaySlot: false,
                  expandRows: true,
                  handleWindowResize: true,
                  eventDurationEditable: false,
                  eventDragMinDistance: 1,
                  dayHeaderFormat: {weekday:'long'},
                  eventStartEditable: true,
                  durationEditable: false,
                  //eventContent={this.eventselect}
                  //events: this.props.events,
                  //eventMouseEnter: this.eventselect,
                  //eventClick: this.eventselect,
                  //dateClick={this.handleDateClick}
                  //select: this.updatesize
                });
                calendar.addEventSource( courses )
                let source = calendar.getEventSources()
                setInterval(() => {
                    calendar.render();
                    //source.eventSource.refetch()
                    //calendar.refetchEvents()
                }, 300)
              }),
  <div id="calendar" class="calendar"></div>*/
            <div class="calendar">
                
            <FullCalendar
                ref={this.calendarRef}
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView={'timeGridWeek'}
                stickyHeaderDates={true}
                stickyFooterScrollbar={true}
                height={window.innerHeight}
                editable={true}
                slotMinTime={'8:00:00'}
                slotMaxTime={'22:00:00'}
                hiddenDays={[0,6]}
                headerToolbar={false}
                allDaySlot={false}
                expandRows={true}
                handleWindowResize={true}
                eventDurationEditable={false}
                eventDragMinDistance={1}
                dayHeaderFormat={{weekday: 'long'}}
                eventStartEditable={true}
                durationEditable={false}
                //eventContent={this.props.content/**this.eventselect*/}
                events={this.props.events}
                eventMouseEnter={this.eventselect}
                eventClick={this.eventselect}
                //dateClick={this.handleDateClick}
                select={this.updatesize}
            />
            </div>
        )
    }
    
    eventselect = (arg, props) => { 
        //console.log("reactcalendar length" + this.props.events.length)
        let i;
        

    for (i=0; i<this.props.events.length; i++) {
        if(this.props.events[i].title == arg.event.title) {
        console.log(this.props.events[i].title)
        console.log(i)
        //this.props.select.eventSel(i);
        this.calendarRef.current
        .getApi()
        //.getEventById( this.props.events[i].CRN )
        .getEvents()[i]
        .setProp( "display", "auto")
        }
    }
    }

    updatesize = (cal) => {
        cal.updateSize()
    
     }
     someMethod() {
        let calendarApi = this.calendarRef.current.getApi()
        calendarApi.next()
        console.log(this.calendarRef.current.getApi())

      }
   
}

 