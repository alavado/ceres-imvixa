import economicoActions from './actions'

const initialState = {
  costoAlimento : 1.2,
  estructuraCostos: {
    alimento: 57,
    smolts: 16,
    personal: 3,
    operaciones: 14.2,
    depreciación: 1.4,
    sanidad: 4.4,
    seguros: 2,
    otros: 2
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
      let { nombre, porcentaje } = action.payload
      const otros = 100.0 - porcentaje - Object.keys(state.estructuraCostos).filter(k => k !== 'otros' && k !== nombre).reduce((sum, k) => sum + state.estructuraCostos[k], 0)
      return {
        ...state,
        estructuraCostos: {
          ...state.estructuraCostos,
          [nombre]: porcentaje,
          otros
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