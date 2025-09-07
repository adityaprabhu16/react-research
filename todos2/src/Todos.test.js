const { TodosManager } = require('./TodosManager');

let todosManager;

describe("Tests for our todos", () => {
    beforeEach(() => {
        todosManager = new TodosManager();
        todosManager.addTodo("Test 1");
        todosManager.addTodo("Test 2");
    });

    test("add and get todos", () => {
        expect(todosManager.getTodos().length).toBe(2);
        expect(todosManager.getTodos()[0].title).toBe("Test 1");
        expect(todosManager.getTodos()[1].title).toBe("Test 2");        
    });

    test("update todo", () => {
        const title = "Testing"; //{title} ...{title} => {title: title}
        const updatedTodo = todosManager.updateTodo(0, {title});
        expect(updatedTodo.title).toBe("Testing");
        expect(todosManager.getTodos()[0].title).toBe("Testing");
    });

    test("delete todo", () => {
        const deletedTodo = todosManager.deleteTodo(0);
        expect(deletedTodo.title).toBe("Test 1");
        expect(todosManager.getTodos().length).toBe(1);
        expect(todosManager.getTodos()[0].title).toBe("Test 2");
    });
});