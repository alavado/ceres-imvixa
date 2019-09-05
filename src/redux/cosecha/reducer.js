import cosechaActions from './actions'

const initialState = {
  perdidaPorAyuno : 3,
  perdidaSangre : 2,
  perdidaEntrañas : 11.5
}

const cosechaReducer = (state = initialState, action) => {
  switch (action.type) {
    case cosechaActions.FIJAR_PERDIDA_POR_AYUNO: {
      const { perdida } = action.payload
      return {
        ...state,
        perdidaPorAyuno: perdida
      }
    }
    case cosechaActions.FIJAR_PERDIDA_SANGRE: {
      const { perdida } = action.payload
      return {
        ...state,
        perdidaSangre: perdida
      }
    }
    case cosechaActions.FIJAR_PERDIDA_ENTRAÑAS: {
      const { perdida } = action.payload
      return {
        ...state,
        perdidaEntrañas: perdida
      }
    }
    default:
      return state
  }
}

export default cosechaReducer