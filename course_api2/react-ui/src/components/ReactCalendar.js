import FullCalendar, { CalendarApi, render } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'
import React from 'react';
import * as rosterdata from './roster.json'

export default class ReactCalendar extends React.Component {

    calendarRef = React.createRef()

   render() {
   
        return(
           
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
                eventDragMinDistance={0}
                dayHeaderFormat={{weekday: 'long'}}
                eventStartEditable={true}
                durationEditable={false}
                //eventContent={this.props.content/**this.eventselect*/}
                events={this.props.events}
                eventDragStart={this.eventselect}
                eventDragStop={this.deselect}
                //eventClick={this.eventselect}
                //dateClick={this.handleDateClick}
                //select={this.updatesize}
                eventChange={this.update}
                eventAllow={this.checkevents}
            />
            </div>
        )
    }
    update = (arg) => {
        console.log(arg)
    }
    eventselect = (arg) => { 
        let i;
    for (i=0; i<this.props.events.length; i++) {
        if(this.props.events[i].title == arg.event.title) {
        console.log(this.props.events[i].name + "\ni: " + i)
        this.props.select.eventSel(i);
        this.calendarRef.current.getApi().addEventSource( this.props.otherSections )
        this.props.setcolors.setEventColors()
        //this.runevents(arg)
        }
    }
    }
    deselect = (arg) => {
        if (this.calendarRef.current.getApi().getEventSources()[1] != null) {
        this.calendarRef.current.getApi().getEventSources()[1].remove()
        }
    }
    addStarts = (dropInfo, draggedEvent) => {
        let j;
        let k;
        for (j=0; j<this.calendarRef.current.getApi().getEvents().length; j++) {
            for (k=0; k<this.props.otherSections.length; k++) {
                if (this.props.otherSections[k].id == this.calendarRef.current.getApi().getEvents()[j].id) {
                    this.props.otherSections[k].start = this.calendarRef.current.getApi().getEvents()[j].startStr
                    if (dropInfo.startStr == this.props.otherSections[k].start) {
                            this.props.switch.switchsections(this.identifyDragged(draggedEvent), k)
                            
                        return true
                    }
                }
            }
        }
        return false
    }
    dynamicchange = (draggedEvent) => {
        let i;
        for (i=0; i<this.calendarRef.current.getApi().getEvents().length; i++) {
            if (this.calendarRef.current.getApi().getEvents()[i].id == draggedEvent.id) {
                this.calendarRef.current.getApi().getEvents()[i].setProp( "display", "none");
            }
        }
    }
    checkevents = (dropInfo, draggedEvent) => {
        let i;
        for (i=0; i<this.props.otherSections.length; i++) {
            return this.addStarts(dropInfo, draggedEvent)
        }        
    }
    identifyDragged = (draggedEvent) => {
        let i;
            for (i=0; i<this.props.events.length; i++) {
                if (this.props.events[i].id == draggedEvent.id) {
                    return i
                }
            }
        /*
        //decipher the arg.event.id to its corresponding name
        for (j=0; j<this.props.events.length; j++) {
            if (this.props.events[j].id == arg.event.id) {
            argname = this.props.events[j].name
            }
        }

        for (i=0; i<this.calendarRef.current.getApi().getEvents().length; i++) { //loop through every single individual event on the screen
            // below checks for a matching time between the clicked event and every other event except itself
            if (arg.event.startStr == this.calendarRef.current.getApi().getEvents()[i].startStr && arg.event.id != this.calendarRef.current.getApi().getEvents()[i].id) {
                //loops through every registered course
                for (i2=0; i2<this.props.events.length; i2++) {
                    //checks if the clicked event has the same name as anything in the registered courses 
                    if (this.props.events[i2].name == argname) {
                        //loops through every other section
                        for (i3=0; i3<this.props.otherSections.length; i3++) {
                            //checks if clicked event name matches anything in the other sections 
                            if (this.props.otherSections[i3].name == argname) {
                                alert("switch")
                                this.props.switch.switchsections(i2, i3)
                            }
                            else {
                                return false
                            }
                        }
                    }
                }
            }
        }
        /*for (i=0; i<this.calendarRef.current.getApi().getEvents().length; i++) {
            if (arg.event.startStr == this.calendarRef.current.getApi().getEvents()[i].startStr && arg.event.id != this.calendarRef.current.getApi().getEvents()[i].id) {
                console.log(arg.event.start)
                console.log(this.calendarRef.current.getApi().getEvents()[i].start)
                for (i2=0; i2<this.props.events.length; i2++) {
                    if (this.props.events[i2].title == arg.event.title) {
                        for (i3=0; i3<this.props.otherSections.length; i3++) {
                            if (this.props.otherSections[i3].title == arg.event.title) {
                                console.log(this.props.events[i2].name)
                                console.log(this.props.otherSections[i3].name)
                            }
                        }
                    }
                }
            }*/
            /*
            newcrn = this.calendarRef.current.getApi().getEvents()[i].id
            obtain true index
            if (newcrn != oldcrn) {
                i2+=1
                oldcrn = this.calendarRef.current.getApi().getEvents()[i].id
                console.log(i2)
            }
            */
            //console.log(this.calendarRef.current.getApi().getEvents()[i].source)
            //console.log(i2);
        
    }
   
}

 