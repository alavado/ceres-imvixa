import { createStore, combineReducers } from 'redux'
import reducers from './reducers.js';

let store = createStore(combineReducers(reducers))

export { store };