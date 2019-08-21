import tratamientosActions from './actions'

const initialState = {
  tratamientosA: [
    { dia: 30*7, diasAyuno: 3, mortalidad: 0.001 },
    { dia: 34*7, diasAyuno: 3, mortalidad: 0.001 },
    { dia: 38*7, diasAyuno: 3, mortalidad: 0.002 },
    { dia: 41*7, diasAyuno: 3, mortalidad: 0.002 },
    { dia: 45*7, diasAyuno: 3, mortalidad: 0.002 },
    { dia: 49*7, diasAyuno: 3, mortalidad: 0.002 },
  ],
  tratamientosB : [
    { dia: 7*7, diasAyuno: 3, mortalidad: 0.002 },
    { dia: 11*7, diasAyuno: 3, mortalidad: 0.002 },
    { dia: 15*7, diasAyuno: 3, mortalidad: 0.002 },
    { dia: 19*7, diasAyuno: 3, mortalidad: 0.002 },
    { dia: 23*7, diasAyuno: 3, mortalidad: 0.002 },
    { dia: 27*7, diasAyuno: 3, mortalidad: 0.002 },
    { dia: 31*7, diasAyuno: 3, mortalidad: 0.002 },
    { dia: 35*7, diasAyuno: 3, mortalidad: 0.002 },
    { dia: 39*7, diasAyuno: 3, mortalidad: 0.002 },
    { dia: 42*7, diasAyuno: 3, mortalidad: 0.002 },
    { dia: 46*7, diasAyuno: 3, mortalidad: 0.002 },
    { dia: 49*7, diasAyuno: 3, mortalidad: 0.002 }
  ]
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