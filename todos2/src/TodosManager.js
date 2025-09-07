
class TodosManager {
    constructor () {
        this.todos = [];
        this.currId = -1;
    }

    addTodo(title) {
        this.currId += 1;
        const newTodo = {id: this.currId, title: title};
        this.todos.push(newTodo);
        //helpful for unit testing.
        return newTodo;
    }

    //if we have multiple updates, this would work perfectly.
    //updates = {title}, so ...{title} = {title: title}
    updateTodo(id, updates) {
        //confirm id safe
        if (id === -1) throw new Error("Invalid todo id!");
        //updates will take precedence here. 
        this.todos[id] = {...this.todos[id], ...updates}; 
        //useful for unit testing: confirm we updated correctly.
        return this.todos[id];
    }

    deleteTodo(id) {
        if (id === -1) throw new Error("Invalid todo id");
        //we'll use find so we can grab deletedTodo for unit testing
        const deletedTodo = this.todos.find((t) => t.id === id);
        this.todos = this.todos.filter((t) => t.id !== id);
        return deletedTodo;
    }

    getTodos() {
        return [...this.todos];
    }
}

//export default TodosManager;
module.exports = { TodosManager };