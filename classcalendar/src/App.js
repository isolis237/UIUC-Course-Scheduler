import React from 'react';
import './App.css';
import EventCalendar2 from './component/EventCalendar2.js';
import classSearchBar from './component/ClassSearchBar.js'
import ClassSearchBar from "./component/ClassSearchBar.js";

function App() {
  return (
    <h>
      <div id="calendar" class="calendar"></div>
        <div class="leftside">
          <div class="search">
            <p>Search Classes</p>
              <ClassSearchBar/>
          </div>
        <div class="roster"><p>Class Roster</p></div>
      </div>
    </h>
  )
}

export default App;
