import ReactCalendar from "./components/ReactCalendar";
import ClassSearchBar from "./components/ClassSearchBar";
import Roster from "./components/roster";
<<<<<<< HEAD
import AddClasses from "./components/AddClasses"
import FunctionalCalendar from "./components/FunctionalCalendar"

import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
=======
>>>>>>> 911e8183e4b8940e3a65b43650809d966fa9f708

import './App.css';
import React from "react";

function App() {
  return (
      <body>
<<<<<<< HEAD
        <FunctionalCalendar/>
=======
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
>>>>>>> 911e8183e4b8940e3a65b43650809d966fa9f708
      </body>
  );
}

export default App;
