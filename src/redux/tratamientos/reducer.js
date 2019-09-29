import tratamientosActions from './actions'

const initialState = {
  medicamentos: [
    {
      id: 1,
      nombre: 'Azametifos',
      duracion: 4,
      mortalidad: 0.1
    },
    {
      id: 2,
      nombre: 'Emamectina',
      duracion: 4,
      mortalidad: 0.1
    },
    {
      id: 3,
      nombre: 'Deltametrina',
      duracion: 3,
      mortalidad: 0.1
    },
    {
      id: 4,
      nombre: 'Peróxido de hidrógeno',
      duracion: 4,
      mortalidad: 0
    },
    {
      id: 5,
      nombre: 'Cipermetrina',
      duracion: 3,
      mortalidad: 0.1
    },
    {
      id: 6,
      nombre: 'Imvixa',
      duracion: 34,
      mortalidad: 0
    },
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
        medicamentos: [
          ...state.medicamentos.filter(m => m.id !== idMedicamento),
          {
            ...state.medicamentos.find(m => m.id === idMedicamento),
            duracion
          }
        ],
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
      const { estrategia, semana } = action.payload
      if (state.tratamientos[estrategia][semana]) {
        return {
          ...state,
          tratamientos:  {
            ...state.tratamientos,
            [estrategia]: Object.keys(state.tratamientos[estrategia]).reduce((object, key) => {
              if (Number(key) !== semana) {
                object[key] = state.tratamientos[estrategia][key]
              }
              return object
            }, {})
          }
        }
      }
      return state
    }
    default:
      return state
  }
}

export default tratamientosReducer