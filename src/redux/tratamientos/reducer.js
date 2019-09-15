import tratamientosActions from './actions'

const initialState = {
  tratamientos: [
    { id: 1, nombre: 'Azametifos' },
    { id: 2, nombre: 'Emamectina' },
    { id: 3, nombre: 'Deltametrina'  },
    { id: 4, nombre: 'Peróxido de hidrógeno' },
    { id: 5, nombre: 'Cipermetrina' },
    { id: 6, nombre: 'Imvixa' },
    { id: 7, nombre: 'Alpha Flux' },
  ],
  tratamientosA: {},
  tratamientosB : {}
}

const tratamientosReducer = (state = initialState, action) => {
  switch (action.type) {
    case tratamientosActions.AGREGAR_TRATAMIENTO: {
      const { id, semana, dia, estrategia, duracion } = action.payload
      return {
        ...state,
        [`tratamientos${estrategia}`]:{...state[`tratamientos${estrategia}`], [semana]: {
          id,
          dia,
          duracion
        }}
      }
    }
    case tratamientosActions.ELIMINAR_TRATAMIENTO: {
      const { semana, estrategia } = action.payload
      const claveTratamientos = `tratamientos${estrategia}`
      return {
        ...state,
        [claveTratamientos]: Object.keys(state[claveTratamientos])
          .reduce((object, key) => {
            if (Number(key) !== semana) {
              object[key] = state[claveTratamientos][key]
            }
            return object
        }, {})
      }
    }
    default:
      return state
  }
}

export default tratamientosReducer