import tratamientosActions from './actions'

const initialState = {
  tratamientos: [
    { id: 1, nombre: 'Azametifos', color: '#ff0000' },
    { id: 2, nombre: 'Benzoato de emamectina', color: '#ff0000' },
    { id: 3, nombre: 'Deltametrina', color: '#ff0000'  },
    { id: 4, nombre: 'Peróxido de hidrógeno', color: '#ff0000'  },
    { id: 5, nombre: 'Imvixa', color: '#ff0000'  },
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