import moment from 'moment'
import porcentajeComidaDiaria from './escalaComida'

const crecimientoConAyuno = (peso, perdidaPorAyuno) => {
  return peso - peso * perdidaPorAyuno
}

const crecimientoConComida = (peso, temperatura, dia, constanteDeCrecimiento) => {
  const perdidaPorAyuno = 0.03, bFCR = 1.15, coefAlimentoComido = 0.9, escalaCrecimiento = 1.0, numdays = 365 * 2
  const pcd = porcentajeComidaDiaria(peso, temperatura)
  if (pcd === 0){
    return crecimientoConAyuno(peso, perdidaPorAyuno)
  }
  const factorDeCrecimiento = constanteDeCrecimiento * numdays/(dia+1)
  peso += peso * coefAlimentoComido * pcd / (100 * bFCR * factorDeCrecimiento)
  return peso
}

export const obtenerCurvasDeCrecimiento = (entorno, produccion, tratamientos) => {
  const { temperaturas } = entorno
  const { fechaInicio, pesoSmolt, pesoObjetivo } = produccion
  const { tratamientosA, tratamientosB } = tratamientos
  const perdidaPorAyuno = 0.03, bFCR = 1.15, coefAlimentoComido = 0.9, escalaCrecimiento = 1.0, numdays = 365 * 2
  const escalaDeCrecimiento = 1.0
  const constanteDeCrecimiento = 0.23 / escalaDeCrecimiento

  let pesoA = pesoSmolt
  let pesoB = pesoSmolt
  let curva = [['x', 'Estr. A', 'Estr. B']]
  let inicio = moment(fechaInicio, 'YYYY-MM-DD')

  let diasAyunoA = 0
  let diasAyunoB = 0
  for (let dia = 1; pesoA < pesoObjetivo * 1.05 || pesoB < pesoObjetivo * 1.05; dia++) {
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
      pesoA = crecimientoConComida(pesoA, temperatura, dia, constanteDeCrecimiento)
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
      pesoB = crecimientoConComida(pesoB, temperatura, dia, constanteDeCrecimiento)
    }
    curva.push([dia, pesoA, pesoB])
  }
  return curva
}