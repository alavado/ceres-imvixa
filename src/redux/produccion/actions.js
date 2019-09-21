const produccionActions = {
  FIJAR_FECHA_INICIO: 'FIJAR_FECHA_INICIO',
  FIJAR_NUMERO_SMOLTS: 'FIJAR_NUMERO_SMOLTS',
  FIJAR_PESO_SMOLT: 'FIJAR_PESO_SMOLT',
  FIJAR_COSTO_SMOLT: 'FIJAR_COSTO_SMOLT',
  FIJAR_MORTALIDAD: 'FIJAR_MORTALIDAD',
  FIJAR_OBJETIVO: 'FIJAR_OBJETIVO',
  FIJAR_PESO_OBJETIVO: 'FIJAR_PESO_OBJETIVO',
  FIJAR_AJUSTE_CRECIMIENTO: 'FIJAR_AJUSTE_CRECIMIENTO',
  FIJAR_BFCR: 'FIJAR_BFCR',
  FIJAR_COSTO_ALIMENTO: 'FIJAR_COSTO_ALIMENTO',
  FIJAR_FECHA_OBJETIVO: 'FIJAR_FECHA_OBJETIVO',
  fijarFechaInicio: fecha => ({
    type: produccionActions.FIJAR_FECHA_INICIO,
    payload: fecha
  }),
  fijarNumeroSmolts: n => ({
    type: produccionActions.FIJAR_NUMERO_SMOLTS,
    payload: n
  }),
  fijarPesoSmolt: (estrategia, peso) => ({
    type: produccionActions.FIJAR_PESO_SMOLT,
    payload: { peso, estrategia }
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
  fijarAjusteCrecimiento: tasa => ({
    type: produccionActions.FIJAR_AJUSTE_CRECIMIENTO,
    payload: tasa
  }),
  fijarBFCR: valor => ({
    type: produccionActions.FIJAR_BFCR,
    payload: valor
  }),
  fijarCostoAlimento: usd => ({
    type: produccionActions.FIJAR_COSTO_ALIMENTO,
    payload: usd
  }),
  fijarObjetivo: objetivo => ({
    type: produccionActions.FIJAR_OBJETIVO,
    payload: objetivo
  }),
  fijarFechaObjetivo: fecha => ({
    type: produccionActions.FIJAR_FECHA_OBJETIVO,
    payload: fecha
  }),
}

export default produccionActions