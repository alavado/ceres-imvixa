import economicoActions from './actions'

const initialState = {
  costoAlimento : 1.5,
  costoNoAlimento : 70,
  valorKiloProducido : 4.5
}

const economicoReducer = (state = initialState, action) => {
  switch (action.type) {
    case economicoActions.FIJAR_COSTO_ALIMENTO: {
      const { costo } = action.payload
      return {
        ...state,
        costoAlimento: costo
      }
    }
    case economicoActions.FIJAR_COSTO_NO_ALIMENTO: {
      const { costo } = action.payload
      return {
        ...state,
        costoNoAlimento: costo
      }
    }
    case economicoActions.FIJAR_VALOR_KILO_PRODUCIDO: {
      const { valor } = action.payload
      return {
        ...state,
        valorKiloProducido: valor
      }
    }
    default:
      return state
  }
}

export default economicoReducer