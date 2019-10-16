import tratamientosActions from './actions'
import { FARMACO_APLICACION_BAÑO, FARMACO_APLICACION_ORAL } from '../../helpers/constantes'

const initialState = {
  medicamentos: [
    {
      id: 1,
      nombre: 'Purisan',
      empresa: 'Fish Vet Group SPA',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Azametifos',
      unidad: 'kg',
      costoUnitario: 770,
      costoOperacional: 1,
      dosisBaño: 0.2,
      cantidadPorJaula: 0.7,
      duracion: 4,
      mortalidad: 0.06,
      color: '#EF5350',
      activo: false,
    },
    {
      id: 2,
      nombre: 'Slice',
      empresa: 'Intervet Chile Ltda.',
      formaFarmaceutica: FARMACO_APLICACION_ORAL,
      principioActivo: 'Emamectina',
      unidad: 'dosis',
      costoUnitario: 0.0144,
      costoOperacional: 0,
      dosisBaño: '',
      cantidadPorJaula: 0,
      duracion: 8,
      mortalidad: 0,
      color: '#BA68C8',
      activo: true
    },
    {
      id: 3,
      nombre: 'AMX',
      empresa: 'FAV S.A.',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Deltametrina',
      unidad: 'lts',
      costoUnitario: 750,
      costoOperacional: 1,
      dosisBaño: 0.3,
      cantidadPorJaula: 1.08,
      duracion: 3,
      mortalidad: 0.06,
      color: '#6D4C41',
      activo: false
    },
    {
      id: 4,
      nombre: 'Paramove',
      empresa: 'Solvay Peróxidos de Los Andes Industrial y Comercial Ltda.',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Peróxido de hidrógeno',
      unidad: 'lts',
      costoUnitario: 1420,
      costoOperacional: 1,
      dosisBaño: 1250,
      cantidadPorJaula: 4500,
      duracion: 4,
      mortalidad: 0,
      color: '#1E88E5',
      activo: false
    },
    {
      id: 5,
      nombre: 'Betamax',
      empresa: 'Eli Lilly Interamérica Inc. y Cía. Ltda.',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Cipermetrina',
      unidad: 'lts',
      costoUnitario: 1000,
      costoOperacional: 1,
      dosisBaño: 0.375,
      cantidadPorJaula: 1.35,
      duracion: 3,
      mortalidad: 0.06,
      color: '#827717',
      activo: false
    },
    {
      id: 6,
      nombre: 'Imvixa',
      empresa: 'Eli Lilly Interamérica Inc. y Cía. Ltda.',
      formaFarmaceutica: FARMACO_APLICACION_ORAL,
      principioActivo: 'Lufenurón',
      unidad: 'dosis',
      costoUnitario: 0.37,
      costoOperacional: 0,
      dosisBaño: '',
      cantidadPorJaula: 0,
      duracion: 34,
      mortalidad: 0,
      color: '#FF8A65',
      activo: true
    },
    {
      id: 7,
      nombre: 'Alpha Flux',
      empresa: 'Pharmaq AS Chile Ltda.',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Hexaflumuron',
      unidad: 'lt',
      costoUnitario: 0.37,  // no hay que buscarlo qele qe aksd
      costoOperacional: 1,
      dosisBaño: 20,
      cantidadPorJaula: 72000,
      duracion: 16,
      mortalidad: 0.06,
      color: '#FF8A65',
      activo: false
    },
    {
      id: 8,
      nombre: 'Emamectina 0,2%',
      empresa: 'Intervet Chile Ltda.',
      formaFarmaceutica: FARMACO_APLICACION_ORAL,
      principioActivo: 'Emamectina',
      unidad: 'dosis',
      costoUnitario: 0.0144,
      costoOperacional: 0,
      dosisBaño: '',
      cantidadPorJaula: 0,
      duracion: 8,
      mortalidad: 0,
      color: '#BA68C8',
      activo: false
    },
    {
      id: 9,
      nombre: 'Deltafav',
      empresa: 'FAV S.A.',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Deltametrina',
      unidad: 'lts',
      costoUnitario: 750,
      costoOperacional: 1,
      dosisBaño: 0.3,
      cantidadPorJaula: 1.08,
      duracion: 3,
      mortalidad: 0.06,
      color: '#6D4C41',
      activo: false
    },
    {
      id: 10,
      nombre: 'CalFree',
      empresa: 'FAV S.A.',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Azametifos',
      unidad: 'kg',
      costoUnitario: 770,
      costoOperacional: 1,
      dosisBaño: 0.2,
      cantidadPorJaula: 0.7,
      duracion: 4,
      mortalidad: 0.06,
      color: '#EF5350',
      activo: false,
    },
    {
      id: 11,
      nombre: 'Azasure',
      empresa: 'Centrovet Ltda.',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Azametifos',
      unidad: 'kg',
      costoUnitario: 770,
      costoOperacional: 1,
      dosisBaño: 0.2,
      cantidadPorJaula: 0.7,
      duracion: 4,
      mortalidad: 0.06,
      color: '#EF5350',
      activo: false,
    }
  ],
  tratamientos: {
    tradicional: {},
    imvixa: {
      0: {
        idMedicamento: 6,
        duracion: 34
      }
    },
  },
  medicamentosFueronSeleccionados: false
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
    case tratamientosActions.MARCAR_MEDICAMENTOS_FUERON_SELECCIONADOS: {
      const valor = action.payload
      return {
        ...state,
        medicamentosFueronSeleccionados: valor
      }
    }
    default:
      return state
  }
}

export default tratamientosReducer