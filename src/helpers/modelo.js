export const obtenerCurvasDeCrecimiento = (parametrosEntorno, parametrosProductivos, tratamientos) => {
  const { temperaturasPorMes } = parametrosEntorno
  const { fechaInicio,
  pesoSmolt,
  pesoObjetivo,
  perdidaPorAyuno = 0.03,
  bFCR = 1.15,
  coefAlimentoComido = 0.9,
  escalaCrecimiento = 1} = parametrosProductivos
  const { tratamientoA, tratamientoB } = tratamientos
  let pesoA = pesoSmolt
  let pesoB = pesoSmolt
  let curva = [['x', 'A', 'B']]
  for (let dia = 1; pesoA < pesoObjetivo || pesoB < pesoObjetivo; dia++) {
    pesoA += Math.exp(Math.random() * 5) + Math.exp(Math.random() * 5) + Math.exp(Math.random() * 5) + Math.exp(Math.random() * 5)
    pesoB += Math.exp(Math.random() * 5) + Math.exp(Math.random() * 5) + Math.exp(Math.random() * 5) + Math.exp(Math.random() * 5)
    curva.push([dia, pesoA, pesoB])
  }
  return curva
}