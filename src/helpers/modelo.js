export const obtenerCurvasDeCrecimiento = (parametrosEntorno, parametrosProductivos, tratamientos) => {
  const { temperaturasPorMes } = parametrosEntorno
  const { fechaInicio, pesoSmolt, pesoObjetivo } = parametrosProductivos
  const { tratamientoA, tratamientoB } = tratamientos
  let perdidaPorAyuno, bFCR, coefAlimentoComido, escalaCrecimiento // estos hay que definirlos
  let pesoA = pesoSmolt
  let pesoB = pesoSmolt
  let curva = [['x', 'Estr. A', 'Estr. B']]
  for (let dia = 1; pesoA < pesoObjetivo || pesoB < pesoObjetivo; dia++) {
    pesoA += Math.exp(Math.random() * 5) + Math.exp(Math.random() * 5) + Math.exp(Math.random() * 5) + Math.exp(Math.random() * 5)
    pesoB += Math.exp(Math.random() * 5) + Math.exp(Math.random() * 5) + Math.exp(Math.random() * 5) + Math.exp(Math.random() * 5)
    curva.push([dia, pesoA, pesoB])
  }
  return curva
}