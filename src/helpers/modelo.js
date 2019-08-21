export const obtenerCurvasDeCrecimiento = (entorno, produccion, tratamientos) => {
  const { temperaturas } = entorno
  const { fechaInicio, pesoSmolt, pesoObjetivo } = produccion
  const { tratamientoA, tratamientoB } = tratamientos
  const perdidaPorAyuno = 0.03, bFCR = 1.15, coefAlimentoComido = 0.9, escalaCrecimiento = 1.0
  let pesoA = pesoSmolt
  let pesoB = pesoSmolt
  let curva = [['x', 'Estr. A', 'Estr. B']]
  for (let dia = 1; pesoA < pesoObjetivo || pesoB < pesoObjetivo; dia++) {
    pesoA += Math.exp(Math.random()) * 3
    pesoB += Math.exp(Math.random()) * 3
    curva.push([dia, pesoA, pesoB])
  }
  return curva
}