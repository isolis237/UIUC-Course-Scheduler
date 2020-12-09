import { Calendar, CalendarApi } from '@fullcalendar/core';
import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import './component/EventCalendar.js';
import './component/searchbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Roster from './component/roster.js';
import Auto from './component/ClassSearchBar.js';



function App() {
  return (<body>
    <div class="leftside">
      <div class="search">
      <p>Add Classes</p>
      <Auto />
      </div>
      <div class="roster">
        <p>Class Roster</p>
        <Roster />
      </div>
    </div>
    <div id="calendar" class="calendar"></div>
    </body>
  )
}

export default App;
