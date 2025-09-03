import { useState } from 'react';

import './index.css';


function Todos() {
  const [todos, setTodos] = useState([])
  const [todoInput, setTodoInput] = useState("");

  function handleInputChange(event) {
    setTodoInput(event.target.value);
  }

  function addTodo(input) {
    if(input.trim()) {
      setTodos([...todos, input]);
    }
    setTodoInput("");
  }

  function deleteTodo(idx) {
    //we can naturally destructure by index:
    //const updatedTodos = todos.filter((element, index) => idx !== index);
    const updatedTodos = todos.filter((_, index) => idx !== index);
    setTodos(updatedTodos);
  }

  function updateTodo(idx) {
    const newTitle = prompt("What's your new title?");
    if(newTitle && newTitle.trim()) {
      const updatedTodos = todos.map((element, index) => (
        //ternary operator:
         index === idx ? newTitle : element
      ));

      setTodos(updatedTodos);
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
              <span>{todo}</span>
              {/*So the button doesn't click on load re-renders*/}
              <button onClick={() => deleteTodo(index)}>X</button>
              <button onClick={() => updateTodo(index)}>Update</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Todos;