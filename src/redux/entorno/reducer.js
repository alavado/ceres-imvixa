import entornoActions from './actions'
import barrios from './barrios'

const initialState = {
  barrios,
  indiceBarrioSeleccionado: 0,
  temperaturas: {
    1: {nombreMes: 'enero', temperatura: 13.5 },
    2: {nombreMes: 'febrero', temperatura: 13.8 },
    3: {nombreMes: 'marzo', temperatura: 13.2 },
    4: {nombreMes: 'abril', temperatura: 11.8 },
    5: {nombreMes: 'mayo', temperatura: 11.2 },
    6: {nombreMes: 'junio', temperatura: 10.7 },
    7: {nombreMes: 'julio', temperatura: 10.2 },
    8: {nombreMes: 'agosto', temperatura: 10.1 },
    9: {nombreMes: 'septiembre', temperatura: 10.2 },
    10: { nombreMes: 'octubre', temperatura: 10.8 },
    11: { nombreMes: 'noviembre', temperatura: 11.7 },
    12: { nombreMes: 'diciembre', temperatura: 12.5 },
  }
}

const entornoReducer = (state = initialState, action) => {
  switch (action.type) {
    case entornoActions.FIJAR_TEMPERATURA: {
      const { mes, temperatura } = action.payload
      const nombreMes = state.temperaturas[mes].nombreMes
      return {
        ...state,
        temperaturas: {...state.temperaturas,
          [mes]: {temperatura, nombreMes}
        }
      }
    }
    case entornoActions.FIJAR_BARRIO: {
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

export default entornoReducer