const centroActions = {
  FIJAR_BARRIO: 'FIJAR_BARRIO',
  fijarBarrio: nombre => ({
    type: centroActions.FIJAR_BARRIO,
    payload: { nombre }
  }),
}

export default centroActions