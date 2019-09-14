const centroActions = {
  FIJAR_TEMPERATURA: 'FIJAR_TEMPERATURA',
  FIJAR_BARRIO: 'FIJAR_BARRIO',
  fijarTemperatura: (mes, grados) => ({
    type: centroActions.FIJAR_TEMPERATURA,
    payload: { mes, grados }
  }),
  fijarBarrio: nombre => ({
    type: centroActions.FIJAR_BARRIO,
    payload: { nombre }
  }),
}

export default centroActions