import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { initialColumns, initialTeam } from '../data'

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    tasks: initialColumns,
    team: initialTeam,
  },
})

export default store
