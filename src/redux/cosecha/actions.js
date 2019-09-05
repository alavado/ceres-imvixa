const cosechaActions = {
  FIJAR_PERDIDA_POR_AYUNO: 'FIJAR_PERDIDA_POR_AYUNO',
  FIJAR_PERDIDA_SANGRE: 'FIJAR_PERDIDA_SANGRE',
  FIJAR_PERDIDA_ENTRAÑAS: 'FIJAR_PERDIDA_ENTRAÑAS',
  fijarPerdidaPorAyuno: perdida => ({
    type: cosechaActions.FIJAR_PERDIDA_POR_AYUNO,
    payload: { perdida }
  }),
  fijarPerdidaSangre: perdida => ({
    type: cosechaActions.FIJAR_PERDIDA_SANGRE,
    payload: { perdida }
  }),
  fijarPerdidaEntrañas: perdida => ({
    type: cosechaActions.FIJAR_PERDIDA_ENTRAÑAS,
    payload: { perdida }
  }),
}

export default cosechaActions