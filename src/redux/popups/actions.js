const popupsActions = {
  ACEPTAR_USO_SOFTWARE: 'ACEPTAR_USO_SOFTWARE',
  ACEPTAR_INGRESAR_DATOS: 'ACEPTAR_INGRESAR_DATOS',
  aceptarUsoSoftware: () => ({
    type: popupsActions.ACEPTAR_USO_SOFTWARE,
    payload: true
  }),
  aceptarIngresarDatos: () => ({
    type: popupsActions.ACEPTAR_INGRESAR_DATOS,
    payload: true
  })
}

export default popupsActions