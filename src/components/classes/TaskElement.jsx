
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import Checkbox from '@mui/material/Checkbox';
import { useContext } from 'react';
import StateContext from './../../State.context';

export default function TaskElement ({ task={} }) {
  const { tasks, saveTasksBase, setTaskId } = useContext(StateContext);

// function for complete Task
  const handleToggle = (taskId) => () => {
    for(let task of tasks){
      if(task.id === taskId){
        task.completed? task.completed = false : task.completed = true;
      }
    }
    saveTasksBase(tasks)
  };
  
// function for send Task to change
  const sendToChangeTask = (id) => () => {
    setTaskId(id);
  }



// function for delete Task
  const deleteTask = (id) => () => {
    for(let i in tasks){
      if(tasks[i].id === id){
        tasks.splice(i, 1)
      }
    }
    saveTasksBase(tasks);
  }

  return (
      <ListItem
      direction ="row"
      sx={{borderBottom: '1px solid black'}}
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
          onClick={sendToChangeTask(task.id)}
          >
            <ModeIcon/>
          </IconButton>
        </Stack>
      </ListItem>
  )
}