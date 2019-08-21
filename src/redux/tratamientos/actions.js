const tratamientosActions = {
  AGREGAR_TRATAMIENTO: 'AGREGAR_TRATAMIENTO',
  BORRAR_TRATAMIENTO: 'BORRAR_TRATAMIENTO',
  agregarTratamiento: (tratamiento, estrategia) => ({
    type: tratamientosActions.AGREGAR_TRATAMIENTO,
    payload: { tratamiento, estrategia }
  }),
  borrarTratamiento: (tratamiento, estrategia) => ({
    type: tratamientosActions.BORRAR_TRATAMIENTO,
    payload: { tratamiento, estrategia }
  }),
}

export default tratamientosActions