import { createStore, combineReducers } from 'redux'
import reducers from './reducers.js'
import { saveState, loadState } from '../helpers/localStorage.js'
import throttle from 'lodash.throttle'
import centroActions from './centro/actions.js'

const persistedState = loadState()
const store = createStore(
  combineReducers(reducers),
  persistedState
)

var ipcRenderer = window.require('electron').ipcRenderer;
ipcRenderer.on('leer-centros', function (event, centros) {
  console.log('leer centros');
  console.log(event, centros);
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

//let store = createStore(combineReducers(reducers))

export { store };