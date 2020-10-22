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

      /**
       <body>
       <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20}}>
       <div>
       <aside className="search">
       <h>Search Classes</h>
       <ClassSearchBar/>
       <div className="roster"><p>Class Roster</p></div>
       </aside>
       </div>
       <div>
       <main id="calendar" className="calendar"></main>
       </div>
       </div>
       </body>
       */


      /**
      <h>
        <div id="calendar" class="calendar"></div>
        <div class="leftside">
          <div class="search">
            <p>Search Classes</p>
            <div
              <ClassSearchBar/>
            </div>
          <div class="roster"><p>Class Roster</p></div>
        </div>
    </h>
       */
  )
}


export default App;
