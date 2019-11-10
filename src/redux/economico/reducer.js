import economicoActions from './actions'

const initialState = {
  costoAlimento : 1.2,
  estructuraCostos: {
    alimento: 57,
    smolts: 17,
    personal: 3,
    operaciones: 14.2,
    depreciación: 1.4,
    sanidad: 4.4,
    seguros: 2,
    otros: 1
  },
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
    case economicoActions.FIJAR_PORCENTAJE_EN_ESTRUCTURA_DE_COSTOS: {
      const { nombre, porcentaje } = action.payload
      let porcentaje_anterior = state.estructuraCostos[nombre]
      let delta_porcentaje = porcentaje_anterior - porcentaje
      if (state.estructuraCostos.otros + delta_porcentaje < 0) {
        return state
      }
      return {
        ...state,
        estructuraCostos: {
          ...state.estructuraCostos,
          [nombre]: porcentaje,
          otros: state.estructuraCostos.otros + delta_porcentaje
        }
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