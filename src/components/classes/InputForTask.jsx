import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Button from '@mui/material/Button';
import { useState, useContext } from 'react';
import Task from './classTask';
import StateContext from './../../State.context';
import { useEffect } from 'react';

export default function InputForTask () {
  const { tasks, saveTasksBase, taskId, setTaskId } = useContext(StateContext);
  const [inputValue, setInputValue] = useState('');
  
  useEffect(() => {
    if(taskId) {
      const taskToChange = tasks.find((task) => task.id === taskId);
      setInputValue(taskToChange.title);
    }
  },[taskId])

// function to save changes of Task or creacte new Task
  const saveTask = () => {
    if(inputValue){
      if(!taskId){
        const newTask = new Task(Date.now(), inputValue);
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
      saveTasksBase(tasks);
    }
  }

  return (
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
  )
}