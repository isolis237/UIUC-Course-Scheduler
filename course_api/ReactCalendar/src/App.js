import ReactCalendar from "./components/ReactCalendar";
import ClassSearchBar from "./components/ClassSearchBar";
import Roster from "./components/roster";
import AddClasses from "./components/AddClasses"
import FunctionalCalendar from "./components/FunctionalCalendar"

import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

import './App.css';
import React from "react";

function App() {
  return (
      <body>
        <FunctionalCalendar/>
      </body>
  );
}

export default App;
