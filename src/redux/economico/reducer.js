import economicoActions from './actions'

const initialState = {
  costoAlimento : 1.2,
  porcentajeAlimento : 47,
  valorKiloProducido : 7.6,
  costoSmolt: 2.15
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
    case economicoActions.FIJAR_PORCENTAJE_ALIMENTO: {
      const porcentajeAlimento = action.payload
      return {
        ...state,
        porcentajeAlimento
      }
    }
    case economicoActions.FIJAR_VALOR_KILO_PRODUCIDO: {
      const { valor } = action.payload
      return {
        ...state,
        valorKiloProducido: valor
      }
    }
    case economicoActions.FIJAR_COSTO_SMOLT: {
      const costoSmolt = action.payload
      return {
        ...state,
        costoSmolt
      }
    }
    default:
      return state
  }
}

export default economicoReducer