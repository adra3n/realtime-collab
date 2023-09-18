import { combineReducers } from 'redux'
const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload]
    case 'COMPLETE_TASK':
      return state.map((task) =>
        task.id === action.payload ? { ...task, status: 'done' } : task
      )
    case 'REMOVE_TASK':
      return state.filter((task) => task.id !== action.payload)
    case 'SET_TASKS':
      return action.payload

    case 'UPDATE_TASK':
      const { id, updatedTask } = action.payload
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        ),
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
