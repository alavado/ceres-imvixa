const produccionActions = {
  FIJAR_FECHA_INICIO: 'FIJAR_FECHA_INICIO',
  FIJAR_NUMERO_SMOLTS: 'FIJAR_NUMERO_SMOLTS',
  FIJAR_PESO_SMOLT: 'FIJAR_PESO_SMOLT',
  FIJAR_COSTO_SMOLT: 'FIJAR_COSTO_SMOLT',
  FIJAR_MORTALIDAD: 'FIJAR_MORTALIDAD',
  FIJAR_OBJETIVO: 'FIJAR_OBJETIVO',
  FIJAR_PESO_OBJETIVO: 'FIJAR_PESO_OBJETIVO',
  FIJAR_FACTOR_CRECIMIENTO: 'FIJAR_FACTOR_CRECIMIENTO',
  FIJAR_BFCR: 'FIJAR_BFCR',
  FIJAR_EFCR: 'FIJAR_EFCR',
  FIJAR_COSTO_ALIMENTO: 'FIJAR_COSTO_ALIMENTO',
  FIJAR_MESES_OBJETIVO: 'FIJAR_MESES_OBJETIVO',
  FIJAR_NUMERO_JAULAS: 'FIJAR_NUMERO_JAULAS',
  FIJAR_VOLUMEN_JAULA: 'FIJAR_VOLUMEN_JAULA',
  FIJAR_PESOS_BASE: 'FIJAR_PESOS_BASE',
  FIJAR_AJUSTE: 'FIJAR_AJUSTE',

  fijarFechaInicio: fecha => ({
    type: produccionActions.FIJAR_FECHA_INICIO,
    payload: fecha
  }),
  fijarNumeroSmolts: n => ({
    type: produccionActions.FIJAR_NUMERO_SMOLTS,
    payload: n
  }),
  fijarPesoSmolt: peso => ({
    type: produccionActions.FIJAR_PESO_SMOLT,
    payload: peso
  }),
  fijarCostoSmolt: usd => ({
    type: produccionActions.FIJAR_COSTO_SMOLT,
    payload: usd
  }),
  fijarMortalidad: tasa => ({
    type: produccionActions.FIJAR_MORTALIDAD,
    payload: tasa
  }),
  fijarPesoObjetivo: g => ({
    type: produccionActions.FIJAR_PESO_OBJETIVO,
    payload: g
  }),
  fijarFactorCrecimiento: tasa => ({
    type: produccionActions.FIJAR_FACTOR_CRECIMIENTO,
    payload: tasa
  }),
  fijarBFCR: valor => ({
    type: produccionActions.FIJAR_BFCR,
    payload: valor
  }),
  fijarEFCR: valor => ({
    type: produccionActions.FIJAR_EFCR,
    payload: valor
  }),
  fijarCostoAlimento: usd => ({
    type: produccionActions.FIJAR_COSTO_ALIMENTO,
    payload: usd
  }),
  fijarObjetivo: (objetivo, valor) => ({
    type: produccionActions.FIJAR_OBJETIVO,
    payload: {objetivo, valor}
  }),
  fijarMesesObjetivo: meses => ({
    type: produccionActions.FIJAR_MESES_OBJETIVO,
    payload: meses
  }),
  fijarNumeroJaulas: numero => ({
    type: produccionActions.FIJAR_NUMERO_JAULAS,
    payload: numero
  }),
  fijarVolumenJaula: numero => ({
    type: produccionActions.FIJAR_VOLUMEN_JAULA,
    payload: numero
  }),
  fijarPesosBase: pesos => ({
    type: produccionActions.FIJAR_PESOS_BASE,
    payload: pesos
  }),
  fijarAjuste: (mes, peso) => ({
    type: produccionActions.FIJAR_AJUSTE,
    payload: {mes, peso}
  })
}

export default produccionActions