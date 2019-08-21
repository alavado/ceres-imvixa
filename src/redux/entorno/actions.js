const entornoActions = {
  FIJAR_TEMPERATURA: 'FIJAR_TEMPERATURA',
  fijarFechaInicio: (mes, grados) => ({
    type: entornoActions.FIJAR_TEMPERATURA,
    payload: { mes, grados }
  }),
}

export default entornoActions