import { useEffect, useState } from 'react';
import EventManager from './EventManager';

function App() {
  //1. most important thing: our events: 
  const [events, setEvents] = useState([]);
  //4 things: formStart, formEnd, formName, editingId (current element we're editing).
  const [formStart, setFormStart] = useState("");
  const [formEnd, setFormEnd] = useState("");
  const [formName, setFormName] = useState("");
  const [editingId, setEditingId] = useState(null); //not editing anything yet. 

  //const hourLabel:
  //returns formatted label for our labels column.
  //h can range from 0 to 23
  const hourLabel = (h) => {
    const hourSuffix = h >= 12 ? "PM" : "AM";
    const hourValue = h % 12 === 0 ? 12 : h % 12;
    return `${hourValue} ${hourSuffix}`;
  }

  const prefillForm = (h) => {
    setEditingId(null); //we aren't editing an existing event
    setFormStart(h)
    setFormEnd(h + 1 >= 24 ? 24 : h + 1); //one more hour above.
    setFormName("");
  }

  const clearForm = () => {
    setEditingId(null);
    setFormStart("");
    setFormEnd("");
    setFormName("");
  }

  const today = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const formattedDate = today.toLocaleString("en-US", options);

  function handleInput(event) {
    //we can ascertain from which input it came from here. 
    //event.target.value
  }

  return (
    <div className="app">
      {/*Presume we want today's date?*/}
      {/*Todo: we need to address the form inputs here.*/}
      <h1>{formattedDate}</h1>
      <div className="inputs">
        <input 
        name="startTime"
        type="time"
        placeholder="Start"
        onChange={handleInput}
        ></input>
        <input
        name="endTime"
        type="time"
        placeholder="End"
        onChange={handleInput}
        ></input>
        <input
        name="title"
        type="text"
        placeholder="Title"
        onChange={handleInput}
        ></input>
      </div>
      <div className="calendar" style={{display: "flex", flexDirection: "row"}}>
        {/* You can do most things with divs these days. */}
        <div className="calendar-labels">
          {
            Array.from({length: 24}, (_,h) => {
              return (
                <div key={h} style={{height: "40px", border:"2px solid gray"}}>
                  {hourLabel(h)}
                </div>
              )
            })
          }
        </div>
        <div className="calendar-selectable-columns">
          {
            Array.from({length: 24}, (_,h) => {
              return (
                <div key={h} onClick={() => prefillForm(h)} style={{height: "40px", border: "2px solid black", width:"40px"}}></div>
              )
            })
          }
        </div>
        <div className="calendar-events-columns">
          {
            events.map((event, idx) => {
              const eventHeight = 40*(event.end - event.start);
              return (
                <div key={idx} style={{height: eventHeight, border:"2px solid blue", width: "40px"}}>
                  {event.name} :  {hourLabel(event.start)} - {hourLabel(event.end)}
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;