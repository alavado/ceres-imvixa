const centroActions = {
  FIJAR_BARRIO: 'FIJAR_BARRIO',
  FIJAR_MACROZONA: 'FIJAR_MACROZONA',
  FIJAR_TITULAR: 'FIJAR_TITULAR',
  FIJAR_CENTRO: 'FIJAR_CENTRO',
  FIJAR_NOMBRE_CENTRO: 'FIJAR_NOMBRE_CENTRO',
  fijarBarrio: nombre => ({
    type: centroActions.FIJAR_BARRIO,
    payload: nombre
  }),
  fijarMacrozona: macrozona => ({
    type: centroActions.FIJAR_MACROZONA,
    payload: macrozona
  }),
  fijarTitular: titular => ({
    type: centroActions.FIJAR_TITULAR,
    payload: titular
  }),
  fijarCentro: codigo => ({
    type: centroActions.FIJAR_CENTRO,
    payload: codigo
  }),
  fijarNombreCentro: nombre => ({
    type: centroActions.FIJAR_NOMBRE_CENTRO,
    payload: nombre
  }),
}

export default centroActions