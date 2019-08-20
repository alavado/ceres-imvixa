const produccionActions = {
  FIJAR_NUMERO_SMOLTS: 'FIJAR_NUMERO_SMOLTS',

  fijarNumeroSmolts: n => ({
    type: produccionActions.FIJAR_NUMERO_SMOLTS,
    payload: n
  })
  
}

export default produccionActions