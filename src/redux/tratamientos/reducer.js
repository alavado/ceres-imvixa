import tratamientosActions from './actions'

const initialState = {
  tratamientosA: {
    [30*7]: { diasAyuno: 3, mortalidad: 0.001 },
    [34*7]: { diasAyuno: 3, mortalidad: 0.001 },
    [38*7]: { diasAyuno: 3, mortalidad: 0.002 },
    [41*7]: { diasAyuno: 3, mortalidad: 0.002 },
    [45*7]: { diasAyuno: 3, mortalidad: 0.002 },
    [49*7]: { diasAyuno: 3, mortalidad: 0.002 },
  },
  tratamientosB : {
    [7*7]: { diasAyuno: 3, mortalidad: 0.002 },
    [11*7]: { diasAyuno: 3, mortalidad: 0.002 },
    [15*7]: { diasAyuno: 3, mortalidad: 0.002 },
    [19*7]: { diasAyuno: 3, mortalidad: 0.002 },
    [23*7]: { diasAyuno: 3, mortalidad: 0.002 },
    [27*7]: { diasAyuno: 3, mortalidad: 0.002 },
    [31*7]: { diasAyuno: 3, mortalidad: 0.002 },
    [35*7]: { diasAyuno: 3, mortalidad: 0.002 },
    [39*7]: { diasAyuno: 3, mortalidad: 0.002 },
    [42*7]: { diasAyuno: 3, mortalidad: 0.002 },
    [46*7]: { diasAyuno: 3, mortalidad: 0.002 },
    [49*7]: { diasAyuno: 3, mortalidad: 0.002 }
  }
}

const tratamientosReducer = (state = initialState, action) => {
  switch (action.type) {
    case tratamientosActions.AGREGAR_TRATAMIENTO: {
      const { tratamiento, estrategia } = action.payload
      if (estrategia === 'a') {
        return {
          ...state,
          tratamientosA: [...state.tratamientosA, tratamiento]
        }
      }
      else {
        return {
          ...state,
          tratamientosB: [...state.tratamientosB, tratamiento]
        }
      }
    }
    default:
      return state
  }
}

export default tratamientosReducer