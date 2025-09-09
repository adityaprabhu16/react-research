import { useRef, useState } from 'react';

//we'll use useRef to keep track of IDs.

function App() {
  const options = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  }
  const currentDate = (new Date()).toLocaleString("en-US", options);

  const [events, setEvents] = useState([]);
  const [formStart, setFormStart] = useState("");
  const [formEnd, setFormEnd] = useState("");
  const [formName, setFormName] = useState("");
  const [editingId, setEditingId] = useState(null); 
  var currIdRef = useRef(-1);

  const hourLabel = (h) => {
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 == 0 ? 12 : h % 12;
    return `${hour}:00 ${suffix}`
  }

  //We'll prefill the form for a potential new entry :)
  const prefillFormNew = (h) => {
    setFormStart(h);
    setFormEnd(h + 1 >= 24 ? 24 : h+1);
    setFormName(""); //user hasn't chosen it yet.
    setEditingId(null); //user hasn't created entry yet.
  }

  const prefillFormExisting = (event) => {
    setFormStart(event.start);
    setFormEnd(event.end);
    setFormName(event.name);
    setEditingId(event.id);
  }

  const saveEvent = () => {
    //If editing ID is not specified, we're adding a new event. 
    const start = parseInt(formStart);
    const end = parseInt(formEnd);
    const name = formName.trim();

    //Error handling / data validation
    if (isNaN(start) || isNaN(end) || !name) {
      return;
    }

    if (!editingId) {
      //we can get everything we need from our state variables.
      const newEvent = {id: currIdRef++, start, end, name};
      setEvents([...events, newEvent]);
    }
    //we have an existing Id, so update.
    else {
      const updatedEvents = events.map((event, idx) => {
        //effectively overwrite. 
        return editingId === idx ? {...event, start, end, name} : event
      });
      setEvents(updatedEvents);
    }
  }

  const deleteEvent = () => {
    if (!editingId) throw new Error("No ID is specified!");
    const updatedEvents = events.filter((event) => event.id !== editingId);
    setEvents(updatedEvents);
  }

  return (
    <div className="app">
      <h1> Day {currentDate}</h1>
      <div className="inputs">
        <label>
          Start
          <select onChange={(event) => setFormStart(event.target.value)}>
            <option value={formStart}>-</option>
            {
              Array.from({length: 24}, (_,h) => {
                return (
                  <option key={h}>{hourLabel(h)}</option>
                )
              })
            }
          </select>
        </label>

        <label>
          End
          <select onChange={(event) => setFormEnd(event.target.value)}>
            <option value={formEnd}>-</option>
            {
              Array.from({length: 24}, (_,h) => {
                return (
                  <option key={h}>{hourLabel(h)}</option>
                )
              })
            }
          </select>
        </label>

        <label>
          Name
          <input type="text" value={formName} onChange={(event) => setFormName(event.target.value)}></input>
        </label>

        <button onClick={() => saveEvent()}>Save</button> {/*This will be both edit and add*/}
        {editingId !== null && <button onClick={() => deleteEvent()}>Delete</button>}

      </div>
      <div className="calendar" style={{display: "flex", flexDirection: "row"}}>
        <div className="calendar-labels" style={{border:"1px solid red"}}>
          {
            Array.from({length: 24}, (_,h) => {
              return (
                <div key={h}>{hourLabel(h)}</div>
              )
            })
          }
        </div>
        <div className="calendar-selections" style={{position:"relative", border:"1px solid green"}}>
          {/*Selection grid cells*/}
          {
            Array.from({length: 24}, (_,h) => {
              return (
                <div key={h} onClick={() => prefillFormNew(h)} style={{ height: 40, border:"1px solid black" }}></div>
              )
            })
          }

          {/*Selection overlay cells on the events.*/}
          {
            events.map((event, idx) => {
              const eventSpan = 40 * (event.end - event.start);
              return (
                <div 
                key={idx} 
                onClick={() => prefillFormExisting(event)}
                style={{ 
                  position: "absolute",
                  top: 40 * event.start,
                  left: 0,
                  right: 0,
                  height: eventSpan,
                  border: "1px solid blue",
                  width: 64
                 }}>
                  {event.name}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;