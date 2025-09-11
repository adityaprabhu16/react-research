
import { useState, useRef } from 'react';

function App() {
  //{id: _, start: , end: , name: }
  const [events, setEvents] = useState([]);
  const [formStart, setFormStart] = useState("");
  const [formEnd, setFormEnd] = useState("");
  const [formName, setFormName] = useState("");

  const [editingId, setEditingId] = useState(null);

  var currId = useRef(0);

  const hourLabel = (h) => {
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:00 ${suffix}`
  };

  //CRUD
  //Create / Edit
  const saveEvent = () => {
    //Data validation
    const start = parseInt(formStart);
    const end = parseInt(formEnd);
    const name = formName.trim();

    if (!start || !end || !name) {
      return;
    }

    //Edit new event
    if (editingId !== null) {
      const updatedEvents = events.map((event, idx) => {
        return event.id === editingId ? {...event, start, end, name} : event;
      })
      setEvents(updatedEvents);
    }
    //Create new event
    else {
      const newEvent = {id: currId++, start, end, name}
      setEvents(newEvent);
    }
    clearForm();
  }

  const deleteEvent = () => {
  
  }

  const clearForm = () => {
    setFormStart("");
    setFormEnd("");
    setFormName("");
    setEditingId(null);
  }

  // Empty grid cell, no events on this grid
  const prefillFormNew = (h) => {
    setFormStart(h);
    setFormEnd(h + 1 >= 24 ? 24 : h + 1);
    setFormName("");
    setEditingId(null);
  }

  //{id: _, start: , end: , name: }
  //there is an event overlaid on this part of the grid.
  const prefillFormExisting = (event) => {
    //error handling
    if(editingId !== null) throw new Error("Invalid ID");
    setFormStart(event.start);
    setFormEnd(event.end);
    setFormName(event.name);
    setEditingId(event.id);
  }

  return (

    <div className="app" style={{display: "flex", flexDirection:"column"}}>
      {
      /*
       Hours      | Selectors
       ___labels. | click me!
       ___labels. | click me!
      */ 
      }
      <div className="inputs">
        <label>
          Start
          <select value={formStart}>
            <option value={formStart}>{formStart}</option>
            {
              Array.from({length: 24}, (_,h) => {
                return (
                  <option key={h} onClick={() => setFormStart(h)}>{hourLabel(h)}</option>
                )
              })
            }
          </select>
        </label>
        <label>
          End
          <select value={formEnd}>
            <option value={formEnd}>{formEnd}</option>
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
          <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)}>
          </input>
        </label>

        <button onClick={() => saveEvent()}>Save</button>
        {editingId !== null && <button onClick={() => deleteEvent()}>Delete</button>}

      </div>
      <div className="calendar-view" style={{display: "flex", flexDirection:"row"}}>
        <div className="calendar-labels" style={{height: 48, width: 48}}>
        {
          Array.from({length: 24}, (_,h) => {
            return (
              <div key={h}>{hourLabel(h)}</div>
            )
          })
        }
      </div>
      <div className="calendar-selectors" style={{position: "relative", width:48}}>
        {
          /*
           Open selector: prefillFormNew()
          */
        }
        {
          Array.from({length: 24}, (_,h) => {
            return (
              <div key={h} onClick={() => prefillFormNew(h)}
              style={{
                height: 48,
                border: "1px solid blue"
              }}
              ></div>
            )
          })
        }

        {
           /*
           Events.map: define a div
           Event selector: prefillFormExisting()
           */
        }
        {
          events.map((event, idx) => {
            const eventHeight = 48 * (event.end - event.start);

            return (
              <div key={event.id} onClick={() => prefillFormExisting(event)}
               style={{
                position: "absolute",
                height: eventHeight,
                top: formStart,
                left: 0,
                right: 0,
                border: "4px solid red"
               }}
              >
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
