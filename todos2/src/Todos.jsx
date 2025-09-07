import { useState } from 'react';

import TodosManager from './TodosManager';

import './index.css';

const todosManager = new TodosManager();

function Todos() {
  const [todos, setTodos] = useState(todosManager.getTodos())
  const [todoInput, setTodoInput] = useState("");

  function handleInputChange(event) {
    setTodoInput(event.target.value);
  }

  function addTodo(title) {
    if(title.trim()) {
      todosManager.addTodo(title);
      setTodos(todosManager.getTodos());
    }
    setTodoInput("");
  }

  function deleteTodo(idx) {
    //we can naturally destructure by index:
    //const updatedTodos = todos.filter((element, index) => idx !== index);
    todosManager.deleteTodo(idx);
    setTodos(todosManager.getTodos()); 
  }

  function updateTodo(idx) {
    const title = prompt("What's your new title?");
    if(title && title.trim()) {
      todosManager.updateTodo(idx, {title})
      setTodos(todosManager.getTodos());
    }
  }

  return(
    <div className="container">
      <div>
        <input name="todo" type="text" value={todoInput} placeholder="Enter todo here" onChange={handleInputChange} />
        <button onClick={() => addTodo(todoInput)}>Add Todo</button>
      </div>
      <br />
      <ul>
        {
          todos.map((todo, index) => (
            <li key={index}>
              <span>{todo.title}</span>
              {/*So the button doesn't click on load re-renders*/}
              <button onClick={() => deleteTodo(todo.id)}>X</button>
              <button onClick={() => updateTodo(todo.id)}>Update</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Todos;