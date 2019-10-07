const tratamientosActions = {
  AGREGAR_TRATAMIENTO: 'AGREGAR_TRATAMIENTO',
  ELIMINAR_TRATAMIENTO: 'ELIMINAR_TRATAMIENTO',
  EDITAR_MEDICAMENTO: 'EDITAR_MEDICAMENTO',
  agregarTratamiento: (idMedicamento, semana, dia, estrategia, duracion) => ({
    type: tratamientosActions.AGREGAR_TRATAMIENTO,
    payload: { idMedicamento, semana, dia, estrategia, duracion }
  }),
  eliminarTratamiento: (estrategia, semana) => ({
    type: tratamientosActions.ELIMINAR_TRATAMIENTO,
    payload: { estrategia, semana }
  }),
  editarMedicamento: (id, propiedad, valor) => ({
    type: tratamientosActions.EDITAR_MEDICAMENTO,
    payload: { id, propiedad, valor }
  })
}

export default tratamientosActions