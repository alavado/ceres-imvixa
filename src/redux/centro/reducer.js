import centroActions from './actions'
import barrios from './barrios'

const initialState = {
  barrios,
  indiceBarrioSeleccionado: 0,
  titular: barrios[0].centros[0].titular,
  indiceCentroSeleccionado: 0
}

const centroReducer = (state = initialState, action) => {
  switch (action.type) {
    case centroActions.FIJAR_MACROZONA: {
      const macrozona = action.payload
      const indiceBarrioSeleccionado = state.barrios.findIndex(barrio => barrio.macrozona === macrozona)
      return {
        ...state,
        indiceBarrioSeleccionado,
        titular: state.barrios[indiceBarrioSeleccionado].centros[0].titular,
        indiceCentroSeleccionado: 0
      }
    }
    case centroActions.FIJAR_BARRIO: {
      const nombre = action.payload
      const indiceBarrioSeleccionado = state.barrios.findIndex(barrio => barrio.nombre === nombre)
      return {
        ...state,
        indiceBarrioSeleccionado,
        titular: state.barrios[indiceBarrioSeleccionado].centros[0].titular,
        indiceCentroSeleccionado: 0
      }
    }
    case centroActions.FIJAR_TITULAR: {
      const titular = action.payload
      const barrioSeleccionado = state.barrios[state.indiceBarrioSeleccionado]
      return {
        ...state,
        titular,
        indiceCentroSeleccionado: barrioSeleccionado.centros.findIndex(c => c.titular === titular)
      }
    }
    case centroActions.FIJAR_CENTRO: {
      const barrioSeleccionado = state.barrios[state.indiceBarrioSeleccionado]
      const codigo = action.payload
      let indiceCentroSeleccionado = barrioSeleccionado.centros.findIndex(c => c.codigo === codigo)
      if (!indiceCentroSeleccionado) {
        indiceCentroSeleccionado = 0
      }
      return {
        ...state,
        indiceCentroSeleccionado
      }
    }
    default:
      return state
  }
}

export default centroReducer