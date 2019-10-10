import tratamientosActions from './actions'

const initialState = {
  medicamentos: [
    {
      id: 1,
      nombre: 'Purisan',
      principioActivo: 'Azametifos',
      unidad: 'kg',
      costoUnitario: 770,
      dosisBaño: 0.2,
      cantidadPorJaula: 0.7,
      duracion: 4,
      mortalidad: 0.1,
      color: '#EF5350',
    },
    {
      id: 2,
      nombre: 'Slice',
      principioActivo: 'Emamectina',
      unidad: 'dosis',
      costoUnitario: 0.0144,
      dosisBaño: '',
      cantidadPorJaula: 0,
      duracion: 8,
      mortalidad: 0,
      color: '#BA68C8'
    },
    {
      id: 3,
      nombre: 'AMX',
      principioActivo: 'Deltametrina',
      unidad: 'lts',
      costoUnitario: 750,
      dosisBaño: 0.3,
      cantidadPorJaula: 1.08,
      duracion: 3,
      mortalidad: 0.1,
      color: '#6D4C41'
    },
    {
      id: 4,
      nombre: 'Paramove',
      principioActivo: 'Peróxido de hidrógeno',
      unidad: 'lts',
      costoUnitario: 1420,
      dosisBaño: 1250,
      cantidadPorJaula: 4500,
      duracion: 4,
      mortalidad: 0,
      color: '#1E88E5'
    },
    {
      id: 5,
      nombre: 'Betamax',
      principioActivo: 'Cipermetrina',
      unidad: 'lts',
      costoUnitario: 1000,
      dosisBaño: 0.375,
      cantidadPorJaula: 1.35,
      duracion: 3,
      mortalidad: 0.1,
      color: '#827717'
    },
    {
      id: 6,
      nombre: 'Imvixa',
      principioActivo: 'Lufenurón',
      unidad: 'dosis',
      costoUnitario: 0.37,
      dosisBaño: '',
      cantidadPorJaula: 0,
      duracion: 34,
      mortalidad: 0,
      color: '#FF8A65'
    },
    {
      id: 7,
      nombre: 'Alpha Flux',
      principioActivo: 'Hexaflumuron',
      unidad: 'lt',
      costoUnitario: 0.37,  // no hay que buscarlo qele qe aksd
      dosisBaño: 20,
      cantidadPorJaula: 72000,
      duracion: 16,
      mortalidad: 0,
      color: '#FF8A65'
    }
  ],
  tratamientos: {
    tradicional: {},
    imvixa: {
      0: {
        idMedicamento: 6,
        duracion: 34
      }
    }
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
    case tratamientosActions.EDITAR_MEDICAMENTO: {
      const { id, propiedad, valor } = action.payload
      return {
        ...state,
        medicamentos: [...state.medicamentos.filter(m => m.id !== id),
          {
            ...state.medicamentos.find(m => m.id === id),
            [propiedad]: valor
          }
        ]
      }
    }
    default:
      return state
  }
}

export default tratamientosReducer