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
    // en caso de que cambie el porcentaje de alimento cambian todos los otros costos
    case economicoActions.FIJAR_PORCENTAJE_ALIMENTO_EN_ESTRUCTURA_DE_COSTOS: {
      let { porcentajeAlimento, porcentajeSmolts } = action.payload
      if (porcentajeAlimento === null){
        porcentajeAlimento = 0.01
      }
      const porcentajeAlimentoAnterior = state.estructuraCostos.alimento
      let porcentajeSmoltsNuevo = porcentajeAlimento / porcentajeAlimentoAnterior * porcentajeSmolts
      // si el nuevo porcentaje es mayor que 100 entonces reducirlo proporcionalmente a 99.9
      if (porcentajeAlimento + porcentajeSmoltsNuevo > 99.9){
        const total = porcentajeAlimento + porcentajeSmoltsNuevo
        porcentajeAlimento = porcentajeAlimento * 99.9 / total
        porcentajeSmoltsNuevo = porcentajeSmoltsNuevo * 99.9 / total
      }
      // determinar cual es el porcentaje de los otros proporcionalmente al nuevo porcentaje otros
      const porcentajeOtros = 100 - porcentajeAlimento - porcentajeSmoltsNuevo
      const porcentajeOtrosAnterior = 100 - porcentajeAlimentoAnterior - porcentajeSmolts//Object.keys(state.estructuraCostos).filter(k => (k !== 'alimento') && (k !== 'smolt')).reduce((sum, k) => sum + state.estructuraCostos[k], 0)
      const razonOtros = porcentajeOtros / porcentajeOtrosAnterior
      return {
        ...state,
        estructuraCostos: {
          ...state.estructuraCostos,
          alimento: porcentajeAlimento,
          smolts: porcentajeSmoltsNuevo,
          personal: state.estructuraCostos.personal * razonOtros,
          operaciones: state.estructuraCostos.operaciones * razonOtros,
          depreciación: state.estructuraCostos.depreciación * razonOtros,
          sanidad: state.estructuraCostos.sanidad * razonOtros,
          seguros: state.estructuraCostos.seguros * razonOtros,
          otros: state.estructuraCostos.otros * razonOtros
        }
      }

    }
    case economicoActions.FIJAR_PORCENTAJE_EN_ESTRUCTURA_DE_COSTOS: {
      let { nombre, porcentaje } = action.payload
      if (porcentaje !== porcentaje){
        porcentaje = 0
      }
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