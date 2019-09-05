import ventasActions from './actions'

const initialState = {
  gradoSuperior : 93,
  gradoOrdinario : 3,
  gradoProduccion : 4,
  precioSuperior: 7.68,
  precioOrdinario: 7.60,
  precioProduccion: 6.33,
}

const ventasReducer = (state = initialState, action) => {
  switch (action.type) {
    case ventasActions.FIJAR_PORCENTAJE_VENTAS: {
      const { nombre, porcentaje } = action.payload
      return {
        ...state,
        [nombre] : porcentaje
      }
    }
    default:
      return state
  }
}

export default ventasReducer
