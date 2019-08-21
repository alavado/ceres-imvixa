import entornoActions from './actions'

const initialState = {
  temperaturas: [
    { mes: 1, temperatura: 13.5 },
    { mes: 2, temperatura: 13.5 },
    { mes: 3, temperatura: 13.5 },
    { mes: 4, temperatura: 13.5 },
    { mes: 5, temperatura: 13.5 },
    { mes: 6, temperatura: 13.5 },
    { mes: 7, temperatura: 13.5 },
    { mes: 8, temperatura: 13.5 },
    { mes: 9, temperatura: 13.5 },
    { mes: 10, temperatura: 13.5 },
    { mes: 11, temperatura: 13.5 },
    { mes: 12, temperatura: 13.5 },
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