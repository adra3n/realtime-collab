import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { initialTasks, initialTeam } from '../data'

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    tasks: initialTasks,
    team: initialTeam,
  },
})

export default store
