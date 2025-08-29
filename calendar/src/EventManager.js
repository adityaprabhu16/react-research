//Create a class model:

//use the constructor to keep track of the event IDs.
//event model:
// {title: "", startTime: "", endTime: ""}

class EventManager {
    constructor() {
        this.events = [];
        this.nextId = 1;
    }

    //addEvent
    addEvent(title, startTime, endTime) {
        const newEvent = {id: this.nextId++, title, startTime, endTime};
        this.events.push(newEvent);
        return newEvent;
    }

    //editEvent
    editEvent(id, updates) {
        const idx = this.events.findIndex(e => e.id == id);
        if (idx == -1) throw new Error("Event not found");
        this.events[idx] = {...this.events[idx], ...updates};
        return this.events[idx];
    }

    //deleteEvent
    deleteEvent(id) {
        const idx = this.events.findIndex(e => e.id == id);
        const event = this.events.find(e => e.id == id);
        if (idx == -1) throw new Error("Event not found");
        //returns all events that are not this index.
        this.events = this.events.filter(e => e.id !== idx);
        return event;
    }

    //getEvents - get's the current state of our events.
    getEvents() {
        //return a copy for safety.
        return [...this.events];
    }
}

export default EventManager;