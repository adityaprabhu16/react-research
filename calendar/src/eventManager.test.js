//CommonJS format
const { EventManager } = require("./EventManager");

describe("EventManager", () => {
    let manager;

    beforeEach(() => {
        manager = new EventManager();
        /*Added a couple events for testing*/
        manager.addEvent("Test 1", "09-01-2025", "09-16-2025");
        manager.addEvent("Bananas", "09-01-2025", "09-16-2025");
    });

    test("add and read events test", () => {
        //see if events were added correctly after beforeEach runs.
        expect(manager.getEvents().length).toBe(2);
        expect(manager.getEvents()[0].title).toBe("Test 1");
    });

    test("edit events test", () => {
        //first index would be id 0, not 1 based on how we added the elements.
        const updated = manager.editEvent(0, { title: "Updated Meeting" });
        expect(updated.title).toBe("Updated Meeting"); //ensures we're returning correctly.
        expect(manager.getEvents()[0].title).toBe("Updated Meeting"); //confirm stored correctly in array.
    });

    test("delete events test", () => {
        const deleted = manager.deleteEvent(0);
        expect(deleted.title).toBe("Test 1");
        expect(manager.getEvents().length).toBe(1);
        expect(manager.getEvents()[0].id).not.toBe(0);
    });
});