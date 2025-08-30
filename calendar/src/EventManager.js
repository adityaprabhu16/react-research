//Create a class model:

//use the constructor to keep track of the event IDs.
//event model:
// {title: "", startTime: "", endTime: ""}

class EventManager {
    constructor() {
        this.events = [];
        this.currId = -1;
    }

    //addEvent
    addEvent(title, startTime, endTime) {
        this.currId += 1;
        const newEvent = {id: this.currId, title, startTime, endTime};
        this.events.push(newEvent);
        return newEvent;
    }

    //editEvent
    editEvent(id, updates) {
        if (id === -1) throw new Error("Event not found");
        //{ title } -> destructured: { title: title  }
        this.events[id] = {...this.events[id], ...updates};
        return this.events[id];
    }

    //deleteEvent
    deleteEvent(id) {
        const event = this.events.find(e => e.id === id);
        if (id === -1) throw new Error("Event not found");
        //returns all events that are not this index.
        this.events = this.events.filter(e => e.id !== id);
        return event;
    }

    //getEvents - get's the current state of our events.
    getEvents() {
        //return a copy for safety.
        return [...this.events];
    }
}

//export default EventManager;  //comment this out when testing.
module.exports = { EventManager }