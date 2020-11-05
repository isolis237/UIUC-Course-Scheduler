import ReactCalendar from "./components/ReactCalendar";
import ClassSearchBar from "./components/ClassSearchBar";
import Roster from "./components/roster";

import './App.css';
import React from "react";

function App() {
  return (
      <body>
      <div className={'leftside'}>
          <div className="roster">
              <p>Class Roster</p>
              <Roster/>

          </div>
      </div>

      <div className="search">
          <p>Add Classes</p>
          <ClassSearchBar />
      </div>
      </body>
  );
}

export default App;
