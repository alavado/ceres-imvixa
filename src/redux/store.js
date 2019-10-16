import { createStore, combineReducers } from 'redux'
import reducers from './reducers.js'
import { saveState, loadState } from '../helpers/localStorage.js'
import throttle from 'lodash.throttle'

const persistedState = loadState()
const store = createStore(
  combineReducers(reducers),
  persistedState
)

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000))

//let store = createStore(combineReducers(reducers))

export { store };