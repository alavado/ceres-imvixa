import entornoActions from './actions'

const initialState = {
  temperaturas: [
    { mes: 1, nombreMes: 'enero', temperatura: 13.5 },
    { mes: 2, nombreMes: 'febrero', temperatura: 13.5 },
    { mes: 3, nombreMes: 'marzo', temperatura: 13.5 },
    { mes: 4, nombreMes: 'abril', temperatura: 13.5 },
    { mes: 5, nombreMes: 'mayo', temperatura: 13.5 },
    { mes: 6, nombreMes: 'junio', temperatura: 13.5 },
    { mes: 7, nombreMes: 'julio', temperatura: 13.5 },
    { mes: 8, nombreMes: 'agosto', temperatura: 13.5 },
    { mes: 9, nombreMes: 'septiembre', temperatura: 13.5 },
    { mes: 10, nombreMes: 'octubre', temperatura: 13.5 },
    { mes: 11, nombreMes: 'noviembre', temperatura: 13.5 },
    { mes: 12, nombreMes: 'diciembre', temperatura: 13.5 },
  ]
}

const produccionReducer = (state = initialState, action) => {
  switch (action.type) {
    case entornoActions.FIJAR_TEMPERATURA: {
      const { mes, temperatura } = action.payload
      return {
        ...state,
        temperaturas: [...state.temperaturas.filter(t => t.mes !== mes), {
          mes,
          temperatura
        }]
      }
    }
    default:
      return state
  }
}

export default produccionReducer