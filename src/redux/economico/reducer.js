import economicoActions from './actions'

const initialState = {
  costoAlimento : 1.4,
  estructuraCostos: {
    alimento: 63,
    smolts: 13.6,
    personal: 1,
    operaciones: 15,
    depreciación: 1.4,
    salud: 4.0,
    seguros: 2,
    otros: 0
  },
  valorKiloProducido : 7.6,
  costoSmolt: 2.15,
  valorDolar: {
    valor: 789,
    fecha: '2019-11-25'
  }
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
    case economicoActions.FIJAR_VALOR_DOLAR: {
      const valorDolar = action.payload
      return {
        ...state,
        valorDolar
      }
    }
    default:
      return state
  }
}

export default economicoReducer