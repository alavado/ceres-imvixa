const produccionActions = {
  FIJAR_NUMERO_SMOLTS: 'FIJAR_NUMERO_SMOLTS',
  FIJAR_PESO_SMOLTS: 'FIJAR_PESO_SMOLTS',

  fijarNumeroSmolts: n => ({
    type: produccionActions.FIJAR_NUMERO_SMOLTS,
    payload: n
  }),

  fijarPesoSmolts: g => ({
    type: produccionActions.FIJAR_PESO_SMOLTS,
    payload: g
  })
  
}

export default produccionActions