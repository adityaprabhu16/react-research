import { useState } from 'react';
import EventManager from "./EventManager";
import "./index.css";

const manager = new EventManager();

//Functional component
function Calendar() {
    //List of existing events
    const [events, setEvents] = useState(manager.getEvents());
    //List of current event we're populating.
    const [form, setForm] = useState({title: "", startTime: "", endTime: ""});

    function handleInputChange(event) {
        //save the change input provided by the user.
        //assign the appropriate key, value.
        setForm({...form, [event.target.name]: event.target.value})
    }

    function addEvent() {
        manager.addEvent(form.title, form.startTime, form.endTime);
        setEvents(manager.getEvents());
        //clear form.
        setForm({title: "", startTime: "", endTime: ""});
    }

    function deleteEvent(id) {
        manager.deleteEvent(id);
        //after deleting, we can getEvents.
        setEvents(manager.getEvents());
    }

    //Prompt browser API: opens a modal, with a prompt, and returns user input as a string.
    function editEvent(id) {
        const title = prompt("New title?");
        const startTime = prompt("New start date?");
        const endTime = prompt("New end date?");
        //if there is content in the title:
        if(title && title.trim()) {
            manager.editEvent(id, { title });
        }
        if (startTime && startTime.trim()) {
            manager.editEvent(id, { startTime });
        }
        if (endTime && endTime.trim()) {
            manager.editEvent(id, { endTime });
        }
        setEvents(manager.getEvents());
    }

    //return a fragmented element.
    return (
        <div className="calendar-container">
            <h1>Mini Calendar</h1>

            <input 
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleInputChange}
            />

            <input
            name="startTime"
            type="datetime-local"
            value={form.startTime}
            onChange={handleInputChange}
            />

            <input
            name="endTime"
            type="datetime-local"
            value={form.endTime}
            onChange={handleInputChange}
            />

            <button onClick={addEvent}>Add</button>

            {/*We'll display our events in an unordered list*/}
            {events.map((e) => (
                <li key={e.id}>
                    <b>{e.title}</b> ({e.startTime} to {e.endTime})
                    <button onClick={ () => editEvent(e.id)}>Edit</button>
                    <button onClick={ () => deleteEvent(e.id)}>Delete</button>
                </li>
            ))}
        </div>
    )
}

export default Calendar;