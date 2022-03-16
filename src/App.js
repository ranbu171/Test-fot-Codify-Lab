
import { useEffect } from "react";
import { useState } from "react";
import List from '@mui/material/List';
import axios from 'axios';
import TaskElement from "./components/classes/TaskElement";
import StateContext from "./State.context";
import InputForTask from "./components/classes/InputForTask";
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(0);
  
// function to post changes to localStorage
  function saveTasksBase (tasks) {
    localStorage.tasks = JSON.stringify(tasks);
    setTasks([...tasks]);
  }

  useEffect(() => {
    localStorage.tasks? setTasks(JSON.parse(localStorage.tasks))
    :
    axios.get(`https://jsonplaceholder.typicode.com/users/1/todos`)
      .then(res => {
        saveTasksBase(res.data)
      })
  },[]);

    return (
      <StateContext.Provider value={{ tasks, saveTasksBase, taskId, setTaskId }}>
        <main className="ToDoList">
          <InputForTask />
          <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {tasks.map((task) => {
              return (
                <TaskElement key={task.id} task={task}/>
              );
            })}
          </List>
        </main>
      </StateContext.Provider>
    );
}

