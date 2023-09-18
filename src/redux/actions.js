export const ADD_TASK = 'ADD_TASK'
export const ADD_PERSON = 'ADD_PERSON'
export const COMPLETE_TASK = 'COMPLETE_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const SET_TASKS = 'SET_TASKS'
export const UPDATE_TASK = 'UPDATE_TASK'

export function addTask(newTask) {
  return {
    type: ADD_TASK,
    payload: newTask,
  }
}

export const removeTask = (id) => ({
  type: REMOVE_TASK,
  payload: id,
})

export function completeTask(id) {
  return {
    type: COMPLETE_TASK,
    payload: id,
  }
}

export function setTasks(newTasks) {
  return {
    type: SET_TASKS,
    payload: newTasks,
  }
}

export const updateTask = (id, updatedTask) => {
  return {
    type: UPDATE_TASK,
    payload: { id, updatedTask },
  }
}

export function addPerson(newPerson) {
  return {
    type: ADD_PERSON,
    payload: newPerson,
  }
}
