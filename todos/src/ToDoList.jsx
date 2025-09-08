import React, { useState } from 'react';

import "./index.css";

//no parameters yet, functional component
function ToDoList() {
    //Populate this array with strings, one for each task.
    const [tasks, setTasks] = useState([]); 
    //New task state variable.
    const [newTask, setNewTask] = useState("");

    //For our textbox when we type in something
    function handleInputChange(event) {
        //allows us to see the text that's being written.
        setNewTask(event.target.value);
    }

    //After hitting the add button, this function gets called. 
    //In this method, we'll use the spread operator.
    function addTask() {
        //to prevent adding an empty task, we'll wrap everything in an if statement:
        //if after stripping white space, we still have a nonempty task, we'll continue.
        if (newTask.trim() !== "") {
            setTasks(previousTasks => [...previousTasks, newTask]);
            setNewTask(""); //clear from the input section
        }
    }

    //index of list item we'd like to delete
    function deleteTask(index) {
        //given an incoming index, compare with indices in tasks.
        //if we have a don't have a match, we'll store in updatedTasks
        //you can either do (element, idx) or (_, idx).
        const updatedTasks = tasks.filter((element, idx) => idx !== index);
        setTasks(updatedTasks); 
    }

    //index of list item we'd like to move up.
    function moveTaskUp(index) {
        //Note, if index = 0 (already at the top), don't perform this operation.
        if (index > 0) {
            //create a copy of current tasks before we manipulate.
            const updatedTasks = [...tasks];
            //in order to move up, we simply swap with adjacent element above it (index-1), using destructuring.
            [updatedTasks[index-1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index-1]]
            //Now we'll set our tasks:
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        //if index is already at the last task, don't want to move down.
        if (index < tasks.length - 1) {
            //use spread operator to copy tasks, and const because we won't be updating them again.
            const updatedTasks = [...tasks];
            //Destructuring and swap adjacent elements.
            [updatedTasks[index], updatedTasks[index+1]] = [updatedTasks[index+1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    /* return a fragment for now. */
    return (
        <div className="to-do-list">
            <h1>To-Do-List</h1>

            {/* Since these are within the same div, they'll be displayed side by side. */}
            <div>
                <input type="text" 
                placeholder="Enter a task..." 
                value={newTask} 
                onChange={handleInputChange}/>

                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>

            <ol>
                {/* Having an index will make it easier to keep track of tasks. */}
                {/* Arrow function prevents the call from happening right away. */}
                {tasks.map((task, index) => 
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button 
                            className="delete-button"
                            onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button 
                            className="move-button"
                            onClick={() => moveTaskUp(index)}>
                            ☝️
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(index)}
                        >
                            👇
                        </button>
                    </li>
                )}
            </ol>
        </div>
    )
}

export default ToDoList;