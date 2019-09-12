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

const evaluarModelo = (modelo, a, b, c) => {
  const x = [1, a, b, c, a*a, a*b, a*c, b*b, b*c, c*c, a**3, a*a*b, a*a*c, a*b*b, a*b*c, a*c*c, b**3, b*b*c, b*c*c, c**3]
  return Math.round(modelo.coef.reduce((sum, v, i) => sum + x[i] * v, 0) + modelo.intercepto)
}

// 1 a 2 semanas entre sin imbixa y con imvixa, 250 g mas o menos de diferencia al mismo corte
export const obtenerCurvasDeCrecimiento = (entorno, produccion, tratamientos) => {
  const { fechaInicio, pesoSmolt, pesoObjetivo } = produccion
  let inicio = moment(fechaInicio, 'YYYY-MM-DD')
  let curva = [['x', 'Estr. A', 'Estr. B']]
  let pesoA = pesoSmolt
  let pesoB = pesoSmolt
  let semana = inicio.week()
  for (let dia = 1; pesoA < pesoObjetivo || pesoB < pesoObjetivo; dia++) {
    let mes = inicio.add(1, 'days').month() + 1
    semana += 1 / 7.0
    pesoA = evaluarModelo(entorno.barrios[entorno.indiceBarrioSeleccionado].modeloCrecimiento, dia, semana, pesoSmolt)
    pesoB = evaluarModelo(entorno.barrios[entorno.indiceBarrioSeleccionado].modeloCrecimiento, dia, semana, pesoSmolt)
    curva.push([dia, pesoA, pesoB])
  }
  return curva
}