
import { useEffect } from "react";
import { useState } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import TextField from "@mui/material/TextField";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Button from '@mui/material/Button';
import Task from './components/classes/classTask';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';



function App() {

  // const localTasks = [];

  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [taskId, setTaskId] = useState(0);


  useEffect(() => {
    localStorage.tasks? setTasks(JSON.parse(localStorage.tasks))
    :
    axios.get(`https://jsonplaceholder.typicode.com/users/1/todos`)
      .then(res => {
        localStorage.tasks = JSON.stringify(res.data);
        setTasks(res.data);
      })
  },[]);

// function for complete Task
  const handleToggle = (taskId) => () => {
    for(let task of tasks){
      if(task.id === taskId){
        task.completed? task.completed = false : task.completed = true;
      }
    }
    setTasks([...tasks]);
  };
  
// function for send Task to change
  const sendToChangeTask = (task) => () => {
    setTaskId(task.id);
    setInputValue(task.title);
  }

// function for save changes of Task or create
  const saveTask = () => {
    if(inputValue){
      if(!taskId){
        const newTask = new Task( Date.now(), inputValue);
        tasks.push(newTask);
      }else {
        for(let task of tasks){
          if(task.id === taskId){
            task.title = inputValue;
          }
        }
      }
      setInputValue('');
      setTaskId(0);
      setTasks([...tasks]);
    }
  }

// function for delete Task
  const deleteTask = (id) => () => {
    for(let i in tasks){
      if(tasks[i].id === id){
        tasks.splice(i, 1)
      }
    }
    setTasks([...tasks]);
  }

  
    return (
      <main className="ToDoList">
        <Stack sx={{width: '100%', marginTop: 1}} direction="row" spacing={0}>
          <TextField
          sx={{width: "100%"}}
          id="outlined-basic"
          variant="outlined"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          label="New Task"
          />
          <Button variant="contained" color="success" onClick={saveTask}>
            <BeenhereIcon fontSize="large" />
          </Button>
        </Stack>
          
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
          
          {tasks.map((task) => {
            return (
              <ListItem
                direction ="row"
                sx={{borderBottom: '1px solid black'}}
                key={task.id}
                disablePadding
              >
                <ListItemText sx={{paddingLeft: 1, wordWrap: 'break-word'}} primary={task.title} />
            
                <Stack direction="row" spacing={0}>
                  <Checkbox
                    onChange={handleToggle(task.id)}
                    checked={task.completed}
                  />

                  <IconButton
                  aria-label="delete"
                  onClick={deleteTask(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                    
                  <IconButton
                  aria-label ="mode"
                  onClick={sendToChangeTask(task)}
                  >
                    <ModeIcon id={task.id}/>
                  </IconButton>
                </Stack>
              </ListItem>
            );
          })}

        </List>
      </main>
    );
}

export default App;
