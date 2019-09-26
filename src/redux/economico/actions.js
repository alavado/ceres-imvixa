const economicoActions = {
  FIJAR_COSTO_ALIMENTO: 'FIJAR_COSTO_ALIMENTO',
  FIJAR_PORCENTAJE_ALIMENTO: 'FIJAR_PORCENTAJE_ALIMENTO',
  FIJAR_VALOR_KILO_PRODUCIDO: 'FIJAR_VALOR_KILO_PRODUCIDO',
  FIJAR_COSTO_SMOLT: 'FIJAR_COSTO_SMOLT',

  fijarCostoAlimento: costo => ({
    type: economicoActions.FIJAR_COSTO_ALIMENTO,
    payload: { costo }
  }),
  fijarPorcentajeAlimento: costo => ({
    type: economicoActions.FIJAR_PORCENTAJE_ALIMENTO,
    payload: costo
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