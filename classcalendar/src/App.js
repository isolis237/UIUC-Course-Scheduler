import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import EventCalendar from './component/EventCalendar.js';
import './component/EventCalendar.js';
import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';

const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const classes = [];
    const promises = new Array(20)
      .fill()
      .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));
    Promise.all(promises).then((classesArr) => {
      return classesArr.map(res => res.json().then(({ name, sprites: { front_default: sprite } }) => {
        return classes.push({ name, sprite });

      })
      );
    });
    setOptions(classes);
  }, []);

useEffect(() => {
  document.addEventListener("mousedown", handleClickOutside)
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);



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

  return (
    <div class="fit" ref={wrapperRef}> 
    <input 
    class="searchbar"
    id="auto" 
    onClick={() => setDisplay(true)} 
    onChange={event => setSearch(event.target.value)}
    placeholder="Find Class" 
    value={search} 
    />
    {display && (
      <div class="results">
      {options
      .filter(({name}) => name.indexOf(search.toLowerCase()) > -1)
      .map((v, i) => {
          return ( 
            <div 
            class="result" 
            onClick={() => setClassList(v.name)} 
            key={i} 
            tabIndex="0">
            <span>{v.name}</span>
            <img class="right" 
            onClick="addClass()"
            src="https://cdn.pixabay.com/photo/2016/12/21/17/11/signe-1923369_960_720.png" 
            width="22" 
            height="22" 
            alt="classes" 
            />
          </div>);
        })}
      </div>
    )}
    </div>
  );
}


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
  )
}

export default App;
