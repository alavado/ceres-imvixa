const asistenciaActions = {
  FIJAR_CLASES: 'FIJAR_CLASES',
  FIJAR_ALUMNOS: 'FIJAR_ALUMNOS',

  fijarClases: clases => ({
    type: asistenciaActions.FIJAR_CLASES,
    payload: clases
  }),

  fijarAlumnos: alumnos => ({
    type: asistenciaActions.FIJAR_ALUMNOS,
    payload: alumnos
  })
}

export default asistenciaActions