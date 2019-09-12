const tratamientosActions = {
  AGREGAR_TRATAMIENTO: 'AGREGAR_TRATAMIENTO',
  ELIMINAR_TRATAMIENTO: 'ELIMINAR_TRATAMIENTO',
  agregarTratamiento: (id, semana, dia, estrategia, duracion) => ({
    type: tratamientosActions.AGREGAR_TRATAMIENTO,
    payload: { id, semana, dia, estrategia, duracion }
  }),
  eliminarTratamiento: (semana, estrategia) => ({
    type: tratamientosActions.ELIMINAR_TRATAMIENTO,
    payload: { semana, estrategia }
  }),
}

export default tratamientosActions