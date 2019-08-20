import produccionActions from './actions'

const initialState = {
  numeroSmolts: 1000000
}

const produccionReducer = (state = initialState, action) => {
  switch (action.type) {
    case produccionActions.FIJAR_NUMERO_SMOLTS:
      return {
        ...state,
        numeroSmolts: action.payload
      }
    default:
      return state
  }
}

export default produccionReducer