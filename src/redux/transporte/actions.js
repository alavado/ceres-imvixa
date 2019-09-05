const transporteActions = {
  AGREGAR_DESTINO: 'AGREGAR_DESTINO',
  ELIMINAR_DESTINO: 'ELIMINAR_DESTINO',
  agregarDestino: nombre => ({
    type: transporteActions.AGREGAR_DESTINO,
    payload: nombre
  }),
  eliminarDestino: nombre => ({
    type: transporteActions.ELIMINAR_DESTINO,
    payload: nombre
  })
}

export default transporteActions