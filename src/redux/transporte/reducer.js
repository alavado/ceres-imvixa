import transporteActions from './actions'

const initialState = {
  destinos: []
}

const transporteReducer = (state = initialState, action) => {
  switch (action.type) {
    case transporteActions.AGREGAR_DESTINO: {
      return {
        ...state,
        destinos: [...state.destinos, {
          nombre: action.payload,
          costo: 0,
          porcentaje: 0
        }]
      }
    }
    case transporteActions.ELIMINAR_DESTINO: {
      return {
        ...state,
        destinos: state.destinos.filter(destino => destino.nombre !== action.payload)
      }
    }
    default:
      return state
  }
}

export default transporteReducer
