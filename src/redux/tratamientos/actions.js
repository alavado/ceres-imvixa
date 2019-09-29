const tratamientosActions = {
  AGREGAR_TRATAMIENTO: 'AGREGAR_TRATAMIENTO',
  ELIMINAR_TRATAMIENTO: 'ELIMINAR_TRATAMIENTO',
  agregarTratamiento: (idMedicamento, semana, dia, estrategia, duracion) => ({
    type: tratamientosActions.AGREGAR_TRATAMIENTO,
    payload: { idMedicamento, semana, dia, estrategia, duracion }
  }),
  eliminarTratamiento: (estrategia, semana) => ({
    type: tratamientosActions.ELIMINAR_TRATAMIENTO,
    payload: { estrategia, semana }
  }),
}

export default tratamientosActions