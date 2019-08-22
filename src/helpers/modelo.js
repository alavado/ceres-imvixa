import moment from 'moment'
import porcentajeComidaDiaria from './escalaComida'

const crecimientoConAyuno = (peso, perdidaPorAyuno) => {
  return peso - peso * perdidaPorAyuno
}

const crecimientoConComida = (peso, temperatura, dia, escalaDeCrecimiento) => {
  const perdidaPorAyuno = 0.03, bFCR = 1.15, coefAlimentoComido = 0.9, numdays = 365 * 2
  const pcd = porcentajeComidaDiaria(peso, temperatura)
  if (pcd === 0){
    return crecimientoConAyuno(peso, perdidaPorAyuno)
  }
  const factorDeCrecimiento = escalaDeCrecimiento * Math.pow(dia+1, 1.1) / 28000 // factor de crecimiento lineal
  peso += peso * factorDeCrecimiento * coefAlimentoComido * pcd / bFCR
  return peso
}

export const obtenerCurvasDeCrecimiento = (entorno, produccion, tratamientos) => {
  const { temperaturas } = entorno
  const { fechaInicio, pesoSmolt, pesoObjetivo } = produccion
  const { tratamientosA, tratamientosB } = tratamientos
  const perdidaPorAyuno = 0.03, bFCR = 1.15, coefAlimentoComido = 0.7, escalaDeCrecimiento = 1.0, numdays = 365 * 2

  let pesoA = pesoSmolt
  let pesoB = pesoSmolt
  let curva = [['x', 'Estr. A', 'Estr. B']]
  let inicio = moment(fechaInicio, 'YYYY-MM-DD')

  let diasAyunoA = 0
  let diasAyunoB = 0
  for (let dia = 1; pesoA < pesoObjetivo * 1 || pesoB < pesoObjetivo * 1; dia++) {
    let mes = inicio.add(dia, 'd').month() + 1
    let temperatura = temperaturas[mes].temperatura
    // crecimiento tratamiento B
    if (tratamientosA[dia] || diasAyunoA > 0) {
      if (tratamientosA[dia]) {
        diasAyunoA = tratamientosA[dia].diasAyuno
      }
      diasAyunoA--
      pesoA = crecimientoConAyuno(pesoA, perdidaPorAyuno)
    }
    else {
      pesoA = crecimientoConComida(pesoA, temperatura, dia, escalaDeCrecimiento)
    }
    // crecimiento tratamiento B
    if (tratamientosB[dia] || diasAyunoB > 0) {
      if (tratamientosB[dia]) {
        diasAyunoB = tratamientosB[dia].diasAyuno
      }
      diasAyunoB--
      pesoB = crecimientoConAyuno(pesoB, perdidaPorAyuno)
    }
    else {
      pesoB = crecimientoConComida(pesoB, temperatura, dia, escalaDeCrecimiento)
    }
    curva.push([dia, pesoA, pesoB])
  }
  return curva
}