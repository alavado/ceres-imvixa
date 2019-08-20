import produccionActions from './actions'

const initialState = {
  pesoSmolts: 170,
  numeroSmolts: 1000000
}

const produccionReducer = (state = initialState, action) => {
  switch (action.type) {
    case produccionActions.FIJAR_NUMERO_SMOLTS:
      return {
        ...state,
        numeroSmolts: action.payload
      }
    case produccionActions.FIJAR_PESO_SMOLTS:
      return {
        ...state,
        pesoSmolts: action.payload
      }
    default:
      return state
  }
}

export default produccionReducer