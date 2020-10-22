import React from 'react';
import './App.css';
import EventCalendar2 from './component/EventCalendar2.js';
import classSearchBar from './component/ClassSearchBar.js'
import ClassSearchBar from "./component/ClassSearchBar.js";

function App() {
  return (
      <div class="container">

        <div class="right_column">
          <ClassSearchBar/>

          <h>Class Roster</h>
          <div className="roster"></div>
        </div>

        <div class="left_column">
          <div id="calendar" className="calendar"></div>
        </div>

      </div>

  )
}


export default App;
