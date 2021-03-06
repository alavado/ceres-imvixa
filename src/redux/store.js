import { createStore, combineReducers } from 'redux'
import reducers from './reducers.js'
import { saveState, loadState } from '../helpers/localStorage.js'
import throttle from 'lodash.throttle'
import centroActions from './centro/actions.js'

// para release, descomentar linea 9 y comentar de la 10 a la 14

const store = createStore(combineReducers(reducers))
// const persistedState = loadState()
// const store = createStore(
//   combineReducers(reducers),
//   persistedState
// )

var ipcRenderer = window.require('electron').ipcRenderer;
ipcRenderer.on('leer-centros', function (event, centros) {
  const centrosFormateados = centros.map(centro => ({
    codigo: Number(centro.cod_centro),
    titular: centro.titular,
    rut: centro.rut,
    barrio: centro.barrio,
    posicion: { lng: -Number(centro.coords.split(',')[0]), lat: -Number(centro.coords.split(',')[1]) }
  }))
  store.dispatch(centroActions.fijarBarrios(centrosFormateados))
})

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000))

export { store };