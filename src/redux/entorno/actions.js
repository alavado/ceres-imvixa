const entornoActions = {
  FIJAR_TEMPERATURA: 'FIJAR_TEMPERATURA',
  fijarTemperatura: (mes, grados) => ({
    type: entornoActions.FIJAR_TEMPERATURA,
    payload: { mes, grados }
  }),
}

export default entornoActions