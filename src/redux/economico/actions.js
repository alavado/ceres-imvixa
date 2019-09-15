const economicoActions = {
  FIJAR_COSTO_ALIMENTO: 'FIJAR_COSTO_ALIMENTO',
  FIJAR_COSTO_NO_ALIMENTO: 'FIJAR_COSTO_NO_ALIMENTO',
  FIJAR_VALOR_KILO_PRODUCIDO: 'FIJAR_VALOR_KILO_PRODUCIDO',

  fijarCostoAlimento: costo => ({
    type: economicoActions.FIJAR_COSTO_ALIMENTO,
    payload: { costo }
  }),
  fijarCostoNoAlimento: costo => ({
    type: economicoActions.FIJAR_COSTO_NO_ALIMENTO,
    payload: { costo }
  }),
  fijarValorKiloProducido: valor => ({
    type: economicoActions.FIJAR_VALOR_KILO_PRODUCIDO,
    payload: { valor }
  })
}

export default economicoActions