const tratamientosActions = {
  AGREGAR_TRATAMIENTO: 'AGREGAR_TRATAMIENTO',
  ELIMINAR_TRATAMIENTO: 'ELIMINAR_TRATAMIENTO',
  EDITAR_MEDICAMENTO: 'EDITAR_MEDICAMENTO',
  MARCAR_MEDICAMENTOS_FUERON_SELECCIONADOS: 'MARCAR_MEDICAMENTOS_FUERON_SELECCIONADOS',
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
  }),
  marcarMedicamentosFueronSeleccionados: valor => ({
    type: tratamientosActions.MARCAR_MEDICAMENTOS_FUERON_SELECCIONADOS,
    payload: valor
  })
}

export default tratamientosActions