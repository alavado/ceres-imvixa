import popupsActions from './actions'

const initialState = {
  aceptaUsarSoftware: false,
  aceptaIngresarDatos: false
}

const popupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case popupsActions.ACEPTAR_USO_SOFTWARE: {
      return {
        ...state,
        aceptaUsarSoftware: action.payload
      }
    }
    case popupsActions.ACEPTAR_INGRESAR_DATOS: {
      return {
        ...state,
        aceptaIngresarDatos: action.payload
      }
    }
    default:
      return state
  }
}

export default popupsReducer