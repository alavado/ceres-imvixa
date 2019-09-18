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

export const curvaMortalidad = (dias, mortalidad) => {
  let curva = []
  for (let dia = 1; dia < dias; dia++) {
    curva.push(1.0 * mortalidad / dias)
  }
  return curva
}

const evaluarModeloCrecimiento = (modelo, diaCiclo, semanaAño, pesoIngreso) => {
  const x = diaCiclo, y = semanaAño, z = pesoIngreso
  const vars = [1, x, y, z, x*x, x*y, x*z, y*y, y*z, z*z, x**3, x*x*y, x*x*z, x*y*y, x*y*z, x*z*z, y**3, y*y*z, y*z*z, z**3]
  return Math.round(modelo.coef.reduce((sum, v, i) => sum + vars[i] * v, 0) + modelo.intercepto)
}

export const curvaCrecimiento = (estrategia, fechaInicio, pesoIngreso, pesoObjetivo, tratamientos, modelo) => {
  console.log({tratamientos});
  let inicio = moment(fechaInicio, 'YYYY-MM-DD')
  let curva = [[1, pesoIngreso]]
  let pesoActual = pesoIngreso
  let semana = inicio.week() + 1 / 7.0
  let diasAyunoRestante = 0
  let diasAyunoTotal = 0
  let tratamientosAplicados = {}
  let dia
  for (dia = 2; pesoActual < pesoObjetivo; dia++) {
    semana += 1 / 7.0
    if (`${Math.ceil(semana)}` in tratamientos && !(`${Math.ceil(semana)}` in tratamientosAplicados)) {
      diasAyunoRestante = 3
      diasAyunoTotal += 3
      tratamientosAplicados[`${Math.ceil(semana)}`] = 1
    }
    if (diasAyunoRestante <= 0) {
      pesoActual = evaluarModeloCrecimiento(modelo, dia - diasAyunoTotal, semana, pesoIngreso)
    }
    diasAyunoRestante--
    curva.push([dia, pesoActual])
  }
  return curva
}