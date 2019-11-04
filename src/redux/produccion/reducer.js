import produccionActions from './actions'
import { OBJETIVO_PESO, OBJETIVO_FECHA } from '../../helpers/constantes'

const initialState = {
  fechaInicio: `${new Date().toISOString().slice(0,10)}`,
  numeroSmolts: 1E6,
  pesoSmolt: 170,
  mortalidad: 10,
  ajusteCrecimiento: 1,
  bFCR: 1.4,
  eFCR: 1.5,
  objetivos: [OBJETIVO_PESO],
  pesoObjetivo: 5000,
  mesesObjetivo: 14,
  numeroJaulas: 20,
  volumenJaula: 1800
}

const produccionReducer = (state = initialState, action) => {
  switch (action.type) {
    case produccionActions.FIJAR_FECHA_INICIO:
      return {
        ...state,
        fechaInicio: action.payload
      }
    case produccionActions.FIJAR_NUMERO_SMOLTS:
      return {
        ...state,
        numeroSmolts: action.payload
      }
    case produccionActions.FIJAR_PESO_SMOLT:
      return {
        ...state,
        pesoSmolt: action.payload
      }
    case produccionActions.FIJAR_COSTO_SMOLT:
      return {
        ...state,
        costoSmolt: action.payload
      }
    case produccionActions.FIJAR_MORTALIDAD:
      return {
        ...state,
        mortalidad: action.payload
      }
    case produccionActions.FIJAR_PESO_OBJETIVO:
      return {
        ...state,
        pesoObjetivo: action.payload
      }
    case produccionActions.FIJAR_AJUSTE_CRECIMIENTO:
      return {
        ...state,
        ajusteCrecimiento: action.payload
      }
    case produccionActions.FIJAR_BFCR:
      return {
        ...state,
        bFCR: action.payload
      }
    case produccionActions.FIJAR_EFCR:
      return {
        ...state,
        eFCR: action.payload
      }
    case produccionActions.FIJAR_COSTO_ALIMENTO:
      return {
        ...state,
        costoAlimento: action.payload
      }
    case produccionActions.FIJAR_OBJETIVO:
      const { objetivo, valor } = action.payload
      let objetivos = valor ? [...state.objetivos, objetivo] : state.objetivos.filter(o => o !== objetivo)
      if (objetivos.length === 0) {
        objetivos = [objetivo === OBJETIVO_PESO ? OBJETIVO_FECHA : OBJETIVO_PESO]
      }
      return {
        ...state,
        objetivos
      }
    case produccionActions.FIJAR_MESES_OBJETIVO:
      return {
        ...state,
        mesesObjetivo: action.payload
      }
      case produccionActions.FIJAR_NUMERO_JAULAS:
        return {
          ...state,
          numeroJaulas: action.payload
        }
      case produccionActions.FIJAR_VOLUMEN_JAULA:
        return {
          ...state,
          volumenJaula: action.payload
        }
    default:
      return state
  }
}

export default produccionReducer