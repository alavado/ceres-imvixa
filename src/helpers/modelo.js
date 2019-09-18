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

const evaluarModelo = (modelo, diaCiclo, semanaAño, pesoIngreso) => {
  const x = diaCiclo, y = semanaAño, z = pesoIngreso
  const vars = [1, x, y, z, x*x, x*y, x*z, y*y, y*z, z*z, x**3, x*x*y, x*x*z, x*y*y, x*y*z, x*z*z, y**3, y*y*z, y*z*z, z**3]
  return Math.round(modelo.coef.reduce((sum, v, i) => sum + vars[i] * v, 0) + modelo.intercepto)
}

export const curvaCrecimiento = (estrategia, fechaInicio, pesoIngreso, pesoObjetivo, tratamientos, modelo) => {
  let inicio = moment(fechaInicio, 'YYYY-MM-DD')
  let curva = [[1, pesoIngreso]]
  let pesoActual = pesoIngreso
  let semana = inicio.week() + 1 / 7.0
  let pausaA = 0
  let pausasA = 0
  let tratamientosAplicados = {}
  for (let dia = 2; pesoActual < pesoObjetivo; dia++) {
    semana += 1 / 7.0
    if (`${Math.ceil(semana)}` in tratamientos && !(`${Math.ceil(semana)}` in tratamientosAplicados)) {
      pausaA = 3
      pausasA += 3
      tratamientosAplicados[`${Math.ceil(semana)}`] = 1
    }
    if (pausaA <= 0) {
      pesoActual = evaluarModelo(modelo, dia - pausasA, semana, pesoIngreso)
    }
    pausaA--
    curva.push([dia, pesoActual])
  }
  return curva
}

// 1 a 2 semanas entre sin imbixa y con imvixa, 250 g mas o menos de diferencia al mismo corte
export const obtenerCurvasDeCrecimiento = (centro, produccion, tratamientos) => {
  const { fechaInicio, pesosSmolt, pesoObjetivo } = produccion
  const tratamientosA = tratamientos.tratamientos.imvixa
  const tratamientosB = tratamientos.tratamientos.tradicional
  let inicio = moment(fechaInicio, 'YYYY-MM-DD')
  let curva = [[1, pesosSmolt.imvixa, pesosSmolt.tradicional]]
  let pesoA = pesosSmolt.imvixa
  let pesoB = pesosSmolt.tradicional
  let semana = inicio.week() + 1 / 7.0
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
      pesoA = evaluarModelo(modelo, dia - pausasA, semana, pesosSmolt.imvixa)
    }
    if (`${Math.ceil(semana)}` in tratamientosB && !(`${Math.ceil(semana)}` in tratamientosAplicadosB)) {
      pausaB = 3
      pausasB += 3
      tratamientosAplicadosB[`${Math.ceil(semana)}`] = 1
    }
    if (pausaB <= 0) {
      pesoB = evaluarModelo(modelo, dia - pausasB, semana, pesosSmolt.tradicional)
    }
    pausaA--
    pausaB--
    curva.push([dia, pesoA, pesoB])
  }
  return curva
}