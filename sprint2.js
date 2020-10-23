import React from 'react';
import './App.css';
import {Button, Dropdown} from 'react-bootstrap';


function App() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Departments
      </Dropdown.Toggle>

    <Dropdown.Menu>
        <Dropdown href="#/action-1">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            CS
          </Dropdown.Toggle>
        </Dropdown>
        <Dropdown href="#/action-2">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            MATH
          </Dropdown.Toggle>
        </Dropdown>
        <Dropdown href="#/action-3">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            STAT
          </Dropdown.Toggle>
        </Dropdown>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default App;