import React from 'react';
import './App.css';
<<<<<<< HEAD
import EventCalendar2 from './component/EventCalendar2.js';
import classSearchBar from './component/ClassSearchBar.js'
import ClassSearchBar from "./component/ClassSearchBar.js";
=======
import EventCalendar from './component/EventCalendar.js';
import './component/EventCalendar.js';
import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
>>>>>>> 2a9a95d807f931f2814b2cbf139aded06bb8a05b

function App() {
  return (
      <div class="container">

<<<<<<< HEAD
        <div class="right_column">
          <ClassSearchBar/>
=======
useEffect(() => {
  document.addEventListener("mousedown", handleClickOutside)
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
>>>>>>> 2a9a95d807f931f2814b2cbf139aded06bb8a05b

          <h>Class Roster</h>
          <div className="roster"></div>
        </div>

<<<<<<< HEAD
        <div class="left_column">
          <div id="calendar" className="calendar"></div>
        </div>
=======

const handleClickOutside = event => {
  const {current: wrap} = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      /*setDisplay(false);    calendar.updateSize()    */
      
      
     }
}

  const setClassList = clas => {
    setSearch(clas);
    setDisplay(false);
  };
>>>>>>> 2a9a95d807f931f2814b2cbf139aded06bb8a05b

      </div>

<<<<<<< HEAD
=======
function App() {
  return (<body>
    <div class="leftside">
      <div class="search">
      <p>Search Classes</p>
      <Auto />
      </div>
      <div class="roster"><p>Class Roster</p></div>
    </div>
    <div id="calendar" class="calendar"></div>
    </body>
>>>>>>> 2a9a95d807f931f2814b2cbf139aded06bb8a05b
  )
}


export default App;
