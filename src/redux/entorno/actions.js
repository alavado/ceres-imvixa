const entornoActions = {
  FIJAR_TEMPERATURA: 'FIJAR_TEMPERATURA',
  FIJAR_BARRIO: 'FIJAR_BARRIO',
  fijarTemperatura: (mes, grados) => ({
    type: entornoActions.FIJAR_TEMPERATURA,
    payload: { mes, grados }
  }),
  fijarBarrio: nombre => ({
    type: entornoActions.FIJAR_BARRIO,
    payload: { nombre }
  }),
}

export default entornoActions