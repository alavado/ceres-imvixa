const tratamientosActions = {
  AGREGAR_TRATAMIENTO: 'AGREGAR_TRATAMIENTO',
  ELIMINAR_TRATAMIENTO: 'ELIMINAR_TRATAMIENTO',
  agregarTratamiento: (id, semana, estrategia) => ({
    type: tratamientosActions.AGREGAR_TRATAMIENTO,
    payload: { id, semana, estrategia }
  }),
  eliminarTratamiento: (semana, estrategia) => ({
    type: tratamientosActions.ELIMINAR_TRATAMIENTO,
    payload: { semana, estrategia }
  }),
}

export default tratamientosActions