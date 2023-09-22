import { combineReducers } from 'redux'
import { initialColumns } from '../data'

const tasksReducer = (state = initialColumns, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const { newTask } = action.payload
      return {
        ...state,
        ['todo']: {
          ...state['todo'],
          tasks: [...state['todo'].tasks, newTask],
        },
      }

    case 'REMOVE_TASK':
      const { taskId: taskIdRemove } = action.payload
      //i fixed the state mutation error by creating a newState
      const newState = {}

      for (const columnId in state) {
        const column = { ...state[columnId] }

        column.tasks = column.tasks.filter((task) => task.id !== taskIdRemove)
        newState[columnId] = column
      }

      return newState

    case 'UPDATE_TASK':
      const { taskId: taskIdUpdate, updatedTask } = action.payload

      //source column id
      const sourceColumnId = Object.keys(state).find((columnId) =>
        state[columnId].tasks.find((task) => task.id === taskIdUpdate)
      )
      //destination column id
      const destColumnId = updatedTask.column

      const sourceTasks = [...state[sourceColumnId].tasks]
      const destTasks = [...state[destColumnId].tasks]

      //using find since for the task id since its only 1
      const taskToUpdate = sourceTasks.find((task) => task.id === taskIdUpdate)
      //im removing the task from the old (source) column
      sourceTasks.splice(sourceTasks.indexOf(taskToUpdate), 1)
      //im adding it to new column
      destTasks.push(updatedTask)

      console.log(destTasks, updatedTask, sourceTasks, taskToUpdate)

      //update state
      return {
        ...state,
        [sourceColumnId]: {
          ...state[sourceColumnId],
          tasks: sourceTasks,
        },
        [destColumnId]: {
          ...state[destColumnId],
          tasks: destTasks,
        },
      }

    case 'UPDATE_TASK_ORDER':
      const { columnId: columnIdOrder, sourceIndex, destIndex } = action.payload
      //getting tasks with the columnId
      const tasks = [...state[columnIdOrder].tasks]
      //removing task from the source with sourceIndex
      const [movedTask] = tasks.splice(sourceIndex, 1)
      //adding it to destIndex with splice
      tasks.splice(destIndex, 0, movedTask)

      return {
        ...state,
        [columnIdOrder]: {
          ...state[columnIdOrder],
          tasks,
        },
      }

    default:
      return state
  }
}

const teamReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PERSON':
      return [...state, action.payload]
    default:
      return state
  }
}

export default combineReducers({
  tasks: tasksReducer,
  team: teamReducer,
})
