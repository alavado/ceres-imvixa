const ventasActions = {
  FIJAR_PORCENTAJE_VENTAS: 'FIJAR_PORCENTAJE_VENTAS',
  fijarPorcentajeVentas: (nombre, porcentaje) => ({
    type: ventasActions.FIJAR_PORCENTAJE_VENTAS,
    payload: { nombre, porcentaje }
  })
}

export default ventasActions