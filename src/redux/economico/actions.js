const economicoActions = {
  FIJAR_COSTO_ALIMENTO: 'FIJAR_COSTO_ALIMENTO',
  FIJAR_PORCENTAJE_EN_ESTRUCTURA_DE_COSTOS: 'FIJAR_PORCENTAJE_EN_ESTRUCTURA_DE_COSTOS',
  FIJAR_VALOR_KILO_PRODUCIDO: 'FIJAR_VALOR_KILO_PRODUCIDO',
  FIJAR_COSTO_SMOLT: 'FIJAR_COSTO_SMOLT',

  fijarCostoAlimento: costo => ({
    type: economicoActions.FIJAR_COSTO_ALIMENTO,
    payload: { costo }
  }),
  fijarPorcentajeEnEstructuraDeCostos: (nombre, porcentaje) => ({
    type: economicoActions.FIJAR_PORCENTAJE_EN_ESTRUCTURA_DE_COSTOS,
    payload: { nombre, porcentaje }
  }),
  fijarValorKiloProducido: valor => ({
    type: economicoActions.FIJAR_VALOR_KILO_PRODUCIDO,
    payload: { valor }
  }),
  fijarCostoSmolt: valor => ({
    type: economicoActions.FIJAR_COSTO_SMOLT,
    payload: valor
  })
}

export default economicoActions