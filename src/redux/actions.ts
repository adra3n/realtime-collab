export const ADD_TASK = 'ADD_TASK'
export const COMPLETE_TASK = 'COMPLETE_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const ADD_PERSON = 'ADD_PERSON'
export const UPDATE_TASK_ORDER = 'UPDATE_TASK_ORDER'

export const addTask = (newTask) => ({
  type: ADD_TASK,
  payload: {
    newTask,
  },
})

export const completeTask = (taskId, columnId) => ({
  type: COMPLETE_TASK,
  payload: {
    taskId,
    columnId,
  },
})
export const removeTask = (taskId) => ({
  type: REMOVE_TASK,
  payload: {
    taskId,
  },
})
export const updateTask = (taskId, updatedTask) => ({
  type: UPDATE_TASK,
  payload: {
    taskId,
    updatedTask,
  },
})
export const updateTaskOrder = (columnId, sourceIndex, destIndex) => ({
  type: UPDATE_TASK_ORDER,
  payload: {
    columnId,
    sourceIndex,
    destIndex,
  },
})

export const addPerson = (newPerson) => ({
  type: ADD_PERSON,
  payload: newPerson,
})
