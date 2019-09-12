import tratamientosActions from './actions'

const initialState = {
  tratamientos: [
    { id: 2, nombre: 'Tratamiento 2', color: '#ff0000' },
    { id: 3, nombre: 'Tratamiento 3', color: '#ff0000'  },
    { id: 4, nombre: 'Tratamiento 4', color: '#ff0000'  },
    { id: 5, nombre: 'Tratamiento 5', color: '#ff0000'  },
    { id: 1, nombre: 'Imvixa', color: '#ff0000'  },
  ],
  tratamientosA: {},
  tratamientosB : {}
}

const tratamientosReducer = (state = initialState, action) => {
  switch (action.type) {
    case tratamientosActions.AGREGAR_TRATAMIENTO: {
      const { id, semana, estrategia } = action.payload
      return {
        ...state,
        [`tratamientos${estrategia}`]: {...state[`tratamientos${estrategia}`], [semana]: id}
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