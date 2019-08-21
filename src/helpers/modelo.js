import moment from 'moment'

export const obtenerCurvasDeCrecimiento = (entorno, produccion, tratamientos) => {
  const { temperaturas } = entorno
  const { fechaInicio, pesoSmolt, pesoObjetivo } = produccion
  const { tratamientosA, tratamientosB } = tratamientos
  const perdidaPorAyuno = 0.03, bFCR = 1.15, coefAlimentoComido = 0.9, escalaCrecimiento = 1.0
  let pesoA = pesoSmolt
  let pesoB = pesoSmolt
  let curva = [['x', 'Estr. A', 'Estr. B']]
  let inicio = moment(fechaInicio, 'YYYY-MM-DD')
  for (let dia = 1; pesoA < pesoObjetivo * 1.05 || pesoB < pesoObjetivo * 1.05; dia++) {
    pesoA += Math.exp(Math.random()) * 3
    pesoB += Math.exp(Math.random()) * 3
    curva.push([dia, pesoA, pesoB])
    let mes = inicio.add(dia, 'd').month()

  }
  console.log(tratamientosA);
  return curva
}