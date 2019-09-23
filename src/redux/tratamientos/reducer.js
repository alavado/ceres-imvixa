import tratamientosActions from './actions'

const initialState = {
  medicamentos: [
    { id: 1, nombre: 'Azametifos' },
    { id: 2, nombre: 'Emamectina' },
    { id: 3, nombre: 'Deltametrina'  },
    { id: 4, nombre: 'Peróxido de hidrógeno' },
    { id: 5, nombre: 'Cipermetrina' },
    { id: 6, nombre: 'Imvixa' },
    //{ id: 7, nombre: 'Alpha Flux' },
  ],
  tratamientos: {
    imvixa: {
      0: {
        idMedicamento: 6,
        duracion: 34
      }
    },
    tradicional: {}
  }
}

const tratamientosReducer = (state = initialState, action) => {
  switch (action.type) {
    case tratamientosActions.AGREGAR_TRATAMIENTO: {
      const { idMedicamento, semana, dia, estrategia, duracion } = action.payload
      return {
        ...state,
        tratamientos: {
          ...state.tratamientos,
          [estrategia]: {
            ...state.tratamientos[estrategia],
            [semana]: {
              idMedicamento,
              dia,
              duracion
            }
          }
        }
      }
    }
    case tratamientosActions.ELIMINAR_TRATAMIENTO: {
      //const { semana, estrategia } = action.payload
      return state
    }
    default:
      return state
  }
}

export default tratamientosReducer