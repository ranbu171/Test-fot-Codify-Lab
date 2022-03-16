import { createContext } from "react";


  const initialState = {
    tasks: [],
    saveTasksBase: () => null,
    taskId: 0,
    setTaskId: () => null,
  }


const StateContext = createContext(initialState);
export default StateContext