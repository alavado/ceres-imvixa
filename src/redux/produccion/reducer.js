import asistenciaActions from './actions'

const initialState = {
  clases: [],
  alumnos: []
}

const asistenciaReducer = (state = initialState, action) => {
  switch (action.type) {
    case asistenciaActions.FIJAR_CLASES:
      return {
        ...state,
        clases: action.payload
      }
      case asistenciaActions.FIJAR_ALUMNOS:
        return {
          ...state,
          alumnos: action.payload
        }
    default:
      return state
  }
}

export default asistenciaReducer