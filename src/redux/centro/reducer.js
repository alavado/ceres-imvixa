import centroActions from './actions'
import barrios from './barrios'

const initialState = {
  barrios,
  indiceBarrioSeleccionado: 0,
}

const centroReducer = (state = initialState, action) => {
  switch (action.type) {
    case centroActions.FIJAR_BARRIO: {
      const { nombre } = action.payload
      return {
        ...state,
        indiceBarrioSeleccionado: state.barrios.findIndex(barrio => barrio.nombre === nombre)
      }
    }
    default:
      return state
  }
}

export default centroReducer