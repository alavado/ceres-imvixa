import moment from 'moment'
import { OBJETIVO_PESO, OBJETIVO_FECHA } from './constantes';

export const curvaMortalidad = (modelo, dias) => {
  let curva = []
  for (let dia = 1; dia < dias; dia++) {
    let vars = [1, dia, dia * dia]
    curva.push(modelo.coefs.reduce((sum, v, i) => sum + vars[i] * v, 0) + modelo.intercepto)
  }
  return curva
}

const evaluarModeloCrecimiento = (modelo, diaCiclo, semanaAño, pesoIngreso) => {
  const x = diaCiclo, y = semanaAño, z = pesoIngreso
  const vars = [1, x, y, z, x*x, x*y, x*z, y*y, y*z, z*z, x**3, x*x*y, x*x*z, x*y*y, x*y*z, x*z*z, y**3, y*y*z, y*z*z, z**3]
  return Math.round(modelo.coef.reduce((sum, v, i) => sum + vars[i] * v, 0) + modelo.intercepto)
}

const evaluarModeloDeltaCrecimiento = (modelo, peso) => {
  const vars = [1, peso, peso ** 2, peso ** 3, peso ** 4]
  return Math.round(modelo.coefs.reduce((sum, v, i) => sum + vars[i] * v, 0) + modelo.intercepto)
}

export const curvaCrecimiento = (fechaInicio, pesoIngreso, tipoObjetivo, objetivo, tratamientos, modelo) => {
  let fechaCiclo = moment(fechaInicio, 'YYYY-MM-DD')
  let curva = [[1, pesoIngreso]]
  let pesoActual = pesoIngreso
  let semana = fechaCiclo.week() + 1 / 7.0
  let diasAyunoRestante = 0
  let diasAyunoTotal = 0
  let tratamientosAplicados = {}
  for (let dia = 2; (tipoObjetivo === OBJETIVO_PESO && pesoActual < objetivo) || (tipoObjetivo === OBJETIVO_FECHA && fechaCiclo < moment(objetivo, 'YYYY-MM-DD')); dia++) {
    semana += 1 / 7.0
    fechaCiclo.add(1, 'days')
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

const obtenerModelo = (modelos, fecha) => {
  const trimestre = 1 + (Number(fecha.substring(4, 2)) - 1) / 3
  return modelos[trimestre] ? modelos[trimestre] : modelos[Object.keys(modelos).sort((m1, m2) => Math.abs(m1 - trimestre) < Math.abs(m2 - trimestre) ? -1 : 1)[0]]
}

export const curvaCrecimientoPorPeso = (fechaInicio, pesoIngreso, tipoObjetivo, objetivo, tratamientos, modelos) => {
  let fechaCiclo = moment(fechaInicio, 'YYYY-MM-DD')
  let curva = [[1, pesoIngreso]]
  let pesoActual = pesoIngreso
  let semana = fechaCiclo.week() + 1 / 7.0
  let diasAyunoRestante = 0
  let tratamientosAplicados = {}
  for (let dia = 2; (tipoObjetivo === OBJETIVO_PESO && pesoActual < objetivo) || (tipoObjetivo === OBJETIVO_FECHA && fechaCiclo < moment(objetivo, 'YYYY-MM-DD')); dia++) {
    semana += 1 / 7.0
    fechaCiclo.add(1, 'days')
    if (`${Math.ceil(semana)}` in tratamientos && !(`${Math.ceil(semana)}` in tratamientosAplicados)) {
      diasAyunoRestante = 3
      tratamientosAplicados[`${Math.ceil(semana)}`] = 1
    }
    if (diasAyunoRestante <= 0) {
      pesoActual += evaluarModeloDeltaCrecimiento(obtenerModelo(modelos, fechaInicio), pesoActual) / 7.0
    }
    else {
      pesoActual += evaluarModeloDeltaCrecimiento(obtenerModelo(modelos, fechaInicio), pesoActual) / 14.0
    }
    diasAyunoRestante--
    curva.push([dia, pesoActual])
  }
  return curva
}