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
export const obtenerCurvasDeCrecimiento = (centro, produccion, tratamientos) => {
  const { fechaInicio, pesoSmolt, pesoObjetivo } = produccion
  const { tratamientosA, tratamientosB } = tratamientos
  let inicio = moment(fechaInicio, 'YYYY-MM-DD')
  let curva = [[1, pesoSmolt, pesoSmolt]]
  let pesoA = pesoSmolt
  let pesoB = pesoSmolt
  let semana = inicio.week()
  const modelo = centro.barrios[centro.indiceBarrioSeleccionado].modeloCrecimiento
  let pausaA = 0
  let pausasA = 0
  let tratamientosAplicadosA = {}
  let pausaB = 0
  let pausasB = 0
  let tratamientosAplicadosB = {}
  for (let dia = 2; pesoA < pesoObjetivo || pesoB < pesoObjetivo; dia++) {
    semana += 1 / 7.0
    if (`${Math.ceil(semana)}` in tratamientosA && !(`${Math.ceil(semana)}` in tratamientosAplicadosA)) {
      pausaA = 3
      pausasA += 3
      tratamientosAplicadosA[`${Math.ceil(semana)}`] = 1
    }
    if (pausaA <= 0) {
      pesoA = evaluarModelo(modelo, dia - pausasA, semana, pesoSmolt)
    }
    if (`${Math.ceil(semana)}` in tratamientosB && !(`${Math.ceil(semana)}` in tratamientosAplicadosB)) {
      pausaB = 3
      pausasB += 3
      tratamientosAplicadosB[`${Math.ceil(semana)}`] = 1
    }
    if (pausaB <= 0) {
      pesoB = evaluarModelo(modelo, dia - pausasB, semana, pesoSmolt)
    }
    pausaA--
    pausaB--
    curva.push([dia, pesoA, pesoB])
  }
  return curva
}