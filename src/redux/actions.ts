import { Task, TeamMember } from '../types'

export const ADD_TASK = 'ADD_TASK'
export const ADD_PERSON = 'ADD_PERSON'
export const COMPLETE_TASK = 'COMPLETE_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'

export function addTask(newTask: Task) {
  return {
    type: ADD_TASK,
    payload: newTask,
  }
}

export const removeTask = (id: number) => ({
  type: REMOVE_TASK,
  payload: id,
})

export function completeTask(id: string | number) {
  return {
    type: COMPLETE_TASK,
    payload: id,
  }
}

export const updateTask = (id: string | number, updatedTask: Task) => {
  return {
    type: UPDATE_TASK,
    payload: { id, updatedTask },
  }
}

export function addPerson(newPerson: TeamMember) {
  return {
    type: ADD_PERSON,
    payload: newPerson,
  }
}
