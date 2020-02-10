import tratamientosActions from './actions'
import { FARMACO_APLICACION_BAÑO, FARMACO_APLICACION_ORAL, COSTO_OPERACIONAL_BAÑO } from '../../helpers/constantes'

const initialState = {
  medicamentos: [
    {
      id: 1,
      nombre: 'Purisan',
      empresa: 'Fish Vet Group SPA',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Azametifos',
      unidad: 'kg',
      costoUnitario: 620,
      costoOperacional: COSTO_OPERACIONAL_BAÑO,    
      unidadDosis: 'mg/m3',
      cantidadPorJaula: 200,
      duracion: 4,
      mortalidad: 0.06,
      color: '#EF5350',
      activo: false,
      aplicaciones: 1, // cuantas veces seguidas se repite el tratamiento
      factorFarmaco: 6,
      factorMetodo: 1,
      presentacion: 50,
      esImvixa: false
    },
    {
      id: 2,
      nombre: 'Slice',
      empresa: 'Intervet Chile Ltda.',
      formaFarmaceutica: FARMACO_APLICACION_ORAL,
      diasDeAdministracion: 1,
      principioActivo: 'Emamectina',
      unidad: 'kg',
      costoUnitario: 180,
      costoOperacional: 0,
      dosis: 175, // dosis practica (mg/kg). dosis real: 50 microgramos/kg al 0.2% 
      unidadDosis: 'mg/kg',
      duracion: 8,
      mortalidad: 0,
      color: '#BA68C8',
      activo: false,
      aplicaciones: 1,
      factorFarmaco: 4,
      factorMetodo: 0.8,
      presentacion: 0.2,
      esImvixa: false
    },
    {
      id: 3,
      nombre: 'AMX',
      empresa: 'FAV S.A.',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Deltametrina',
      unidad: 'lt',
      costoUnitario: 960,
      costoOperacional: COSTO_OPERACIONAL_BAÑO,
      unidadDosis: 'ml/m3',
      cantidadPorJaula: 0.3,
      duracion: 3,
      mortalidad: 0.06,
      color: '#6D4C41',
      activo: false,
      aplicaciones: 1,
      factorFarmaco: 6,
      factorMetodo: 1,
      presentacion: 1000,
      esImvixa: false
    },
    {
      id: 4,
      nombre: 'Paramove',
      empresa: 'Solvay Peróxidos de Los Andes Industrial y Comercial Ltda.',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Peróxido de hidrógeno',
      unidad: 'kg',
      costoUnitario: 1.5,
      costoOperacional: COSTO_OPERACIONAL_BAÑO,
      unidadDosis: 'mg/m3',
      cantidadPorJaula: 800000,
      duracion: 4,
      mortalidad: 0.06,
      color: '#1E88E5',
      activo: false,
      aplicaciones: 1,
      factorFarmaco: 0,
      factorMetodo: 0.2,
      presentacion: 50,
      esImvixa: false
    },
    // {
    //   id: 5,
    //   nombre: 'Betamax',
    //   empresa: 'Eli Lilly Interamérica Inc. y Cía. Ltda.',
    //   formaFarmaceutica: FARMACO_APLICACION_BAÑO,
    //   principioActivo: 'Cipermetrina',
    //   unidad: 'lt',
    //   costoUnitario: 1000,
    //   costoOperacional: COSTO_OPERACIONAL_BAÑO,
    //  
    //   cantidadPorJaula: 1.35,
    //   duracion: 3,
    //   mortalidad: 0.06,
    //   color: '#827717',
    //   activo: false,
    //   aplicaciones: 1,
    //   factorFarmaco: 4,
    //   factorMetodo: 1,
    //   presentacion: 5
    // },
    {
      id: 6,
      nombre: 'Imvixa',
      empresa: 'Eli Lilly Interamérica Inc. y Cía. Ltda.',
      formaFarmaceutica: FARMACO_APLICACION_ORAL,
      diasDeAdministracion: 1,
      principioActivo: 'Lufenurón',
      unidad: 'kg',
      costoUnitario: 9000,
      costoOperacional: 0,
      dosis: 350, // mg/kg
      unidadDosis: 'mg/kg',
      duracion: 28,
      mortalidad: 0,
      color: '#EF7B10',
      activo: true,
      aplicaciones: 1,
      factorFarmaco: 4,
      factorMetodo: 0.8,
      presentacion: 10,
      esImvixa: true
    },
    {
      id: 7,
      nombre: 'Alpha Flux',
      empresa: 'Pharmaq AS Chile Ltda.',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Hexaflumurón',
      unidad: 'lt',
      costoUnitario: 700,
      costoOperacional: COSTO_OPERACIONAL_BAÑO,
      unidadDosis: 'ml/m3',
      cantidadPorJaula: 20,
      duracion: 16,
      mortalidad: 0.12,
      color: '#000066',
      activo: false,
      aplicaciones: 1,
      factorFarmaco: 6,
      factorMetodo: 1,
      presentacion: 10000,
      esImvixa: false
    },
    // {
    //   id: 8,
    //   nombre: 'Emamectina 0,2%',
    //   empresa: 'Intervet Chile Ltda.',
    //   formaFarmaceutica: FARMACO_APLICACION_ORAL,
    //   diasDeAdministracion: 1,
    //   principioActivo: 'Emamectina',
    //   unidad: 'kg',
    //   costoUnitario: 180,
    //   costoOperacional: 0,
    //   dosis: 0.05, // (mg/kg)
    //   unidadDosis: 'mg/kg',
    //   duracion: 8,
    //   mortalidad: 0,
    //   color: '#BA68C8',
    //   activo: false,
    //   aplicaciones: 1,
    //   factorFarmaco: 4,
    //   factorMetodo: 0.8,
    //   presentacion: 0.2
    // },
    {
      id: 9,
      nombre: 'Deltafav',
      empresa: 'FAV S.A.',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Deltametrina',
      unidad: 'lt',
      costoUnitario: 500,
      costoOperacional: COSTO_OPERACIONAL_BAÑO,
      unidadDosis: 'ml/m3',
      cantidadPorJaula: 0.3,
      duracion: 3,
      mortalidad: 0.06,
      color: '#6D4C41',
      activo: false,
      aplicaciones: 1,
      factorFarmaco: 6,
      factorMetodo: 1,
      presentacion: 1,
      esImvixa: false
    },
    {
      id: 10,
      nombre: 'CalFree',
      empresa: 'FAV S.A.',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Azametifos',
      unidad: 'kg',
      costoUnitario: 560,
      costoOperacional: COSTO_OPERACIONAL_BAÑO,
      unidadDosis: 'mg/m3',
      cantidadPorJaula: 200,
      duracion: 4,
      mortalidad: 0.06,
      color: '#EF5350',
      activo: false,
      aplicaciones: 1,
      factorFarmaco: 6,
      factorMetodo: 1,
      presentacion: 50,
      esImvixa: false
    },
    {
      id: 11,
      nombre: 'Azasure',
      empresa: 'Centrovet Ltda.',
      formaFarmaceutica: FARMACO_APLICACION_BAÑO,
      principioActivo: 'Azametifos',
      unidad: 'kg',
      costoUnitario: 650,
      costoOperacional: COSTO_OPERACIONAL_BAÑO,
      unidadDosis: 'mg/m3',
      cantidadPorJaula: 200,
      duracion: 4,
      mortalidad: 0.06,
      color: '#EF5350',
      activo: false,
      aplicaciones: 1,
      factorFarmaco: 6,
      factorMetodo: 1,
      presentacion: 50,
      esImvixa: false
    }
  ],
  tratamientos: {
    tradicional: {
    },
    imvixa: {
      // 0: {
      //   idMedicamento: 6,
      //   duracion: 34
      // }
    },
  },
  medicamentosFueronSeleccionados: false
}

const tratamientosReducer = (state = initialState, action) => {
  switch (action.type) {
    case tratamientosActions.AGREGAR_TRATAMIENTO: {
      const { idMedicamento, semana, pesoDeAplicacion, dia, estrategia, duracion, aplicaciones } = action.payload
      return {
        ...state,
        medicamentos: [
          ...state.medicamentos.filter(m => m.id !== idMedicamento),
          {
            ...state.medicamentos.find(m => m.id === idMedicamento),
            duracion,
            aplicaciones
          }
        ],
        tratamientos: {
          ...state.tratamientos,
          [estrategia]: {
            ...state.tratamientos[estrategia],
            ...[...Array(aplicaciones).keys()].reduce((obj, i) => ({...obj, [semana + i * duracion]: {
              pesoDeAplicacion,
              idMedicamento,
              dia,
              duracion
            }}), {})
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
    case tratamientosActions.REPLICAR_ESTRATEGIA: {
      const { base, objetivo, semanas } = action.payload
      const semanaPrimerBaño = Object.keys(state.tratamientos[base]).find(semana => {
        const idMedicamento = state.tratamientos[base][semana].idMedicamento
        const medicamento = state.medicamentos.find(({ id }) => id === idMedicamento)
        return medicamento.formaFarmaceutica === FARMACO_APLICACION_BAÑO
      })
      const duracionTratamientoBase = Number(semanaPrimerBaño)
      const duracionComidaObjetivo = (state.tratamientos[objetivo][0] && state.medicamentos.find(m => m.id === state.tratamientos[objetivo][0].idMedicamento).duracion) || 1
      const semanasTratamientosOralesObjetivo = Object.keys(state.tratamientos[objetivo]).filter(semana => {
        const idMedicamento = state.tratamientos[objetivo][semana].idMedicamento
        const medicamento = state.medicamentos.find(({ id }) => id === idMedicamento)
        return medicamento.formaFarmaceutica === FARMACO_APLICACION_ORAL
      })
      return {
        ...state,
        tratamientos: {
          ...state.tratamientos,
          [objetivo]: {
            ...semanasTratamientosOralesObjetivo.reduce((obj, semana) => ({...obj, [semana]: state.tratamientos[objetivo][semana]}), {}),
            ...Object.keys(state.tratamientos[base]) 
              .filter(semana => Number(semana) >= duracionTratamientoBase && (Number(semana) + duracionComidaObjetivo - duracionTratamientoBase) <= semanas)
              .reduce((obj, semana) => ({...obj, [Number(semana) + duracionComidaObjetivo - duracionTratamientoBase]: state.tratamientos[base][semana]}), {})
          }
        }
      }
    }
    case tratamientosActions.AGREGAR_MEDICAMENTO: {
      const medicamento = action.payload
      console.log('AGREGAR', {medicamento})
      return {
        ...state,
        medicamentos: [
          ...state.medicamentos,
          {
            id: state.medicamentos.sort((m1, m2) => m1.id < m2.id ? 1 : -1)[0].id + 1,
            empresa: '',
            unidad: medicamento.formaFarmaceutica === FARMACO_APLICACION_BAÑO ? 'lt' : 'kg',
            unidadDosis: medicamento.formaFarmaceutica === FARMACO_APLICACION_BAÑO ? 'mg/m3' : 'mg/kg',
            duracion: 4,
            color: '#b1006a',
            activo: false,
            aplicaciones: 1,
            factorFarmaco: 0,
            factorMetodo: 0,
            ...medicamento
          }
        ]
      }
    }
    case tratamientosActions.ELIMINAR_TODOS_LOS_TRATAMIENTOS: {
      const estrategia = action.payload
      return {
        ...state,
        tratamientos: {
          ...state.tratamientos,
          [estrategia] : {}
        },
      }
    }
  }
}

export default tratamientosReducer