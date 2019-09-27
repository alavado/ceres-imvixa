import moment from 'moment'
import { OBJETIVO_PESO, OBJETIVO_FECHA } from './constantes';
import modelosCrecimientoPorMacrozona from './modelos_crecimiento_macrozonas.json'
import temperaturasMensuales from './temperaturas.json'

export const curvaMortalidad = (modelo, dias) => {
  let curva = []
  for (let dia = 1; dia < dias; dia++) {
    let vars = [1, dia, dia * dia]
    curva.push(modelo.coefs.reduce((sum, v, i) => sum + vars[i] * v, 0) + modelo.intercepto)
  }
  return curva
}

const evaluarModeloDeltaCrecimiento = (macrozona, peso, uta) => {
  // No había suficientes datos para las macrozonas 1 y 2
  if (macrozona === '1' || macrozona === '2') {
    macrozona = '3'
  }
  const modelo = modelosCrecimientoPorMacrozona[macrozona]
  const x = peso, y = uta
  const vars = [1, x, y, x*x, x*y, y*y]
  return Math.round(modelo.coefs.reduce((sum, v, i) => sum + vars[i] * v, 0) + modelo.intercepto)
}

const crecimientoSinComida = (macrozona, peso, uta) => 0// evaluarModeloDeltaCrecimiento(modelo, peso, uta) / 14.0

export const curvaCrecimientoPorPeso = (macrozona, fechaInicio, pesoIngreso, tipoObjetivo, objetivo, tratamientos) => {
  let fechaCiclo = moment(fechaInicio, 'YYYY-MM-DD')
  let curva = [[1, pesoIngreso]]
  let pesoActual = pesoIngreso
  let semana = 1 / 7.0
  let diasAyunoRestante = 0
  let tratamientosAplicados = {}
  let uta = temperaturasMensuales[fechaCiclo.month() + 1] * 7
  for (let dia = 2; (tipoObjetivo === OBJETIVO_PESO && pesoActual < objetivo) || (tipoObjetivo === OBJETIVO_FECHA && fechaCiclo < moment(objetivo, 'YYYY-MM-DD')); dia++) {
    semana += 1 / 7.0
    fechaCiclo.add(1, 'days')
    uta += temperaturasMensuales[fechaCiclo.month() + 1]
    if (`${Math.ceil(semana)}` in tratamientos && !(`${Math.ceil(semana)}` in tratamientosAplicados)) {
      diasAyunoRestante = 3
      tratamientosAplicados[`${Math.ceil(semana)}`] = 1
    }
    if (diasAyunoRestante <= 0) {
      pesoActual += evaluarModeloDeltaCrecimiento(macrozona, pesoActual, uta) / 7.0
    }
    else {
      pesoActual += crecimientoSinComida(macrozona, pesoActual, uta)
    }
    diasAyunoRestante--
    curva.push([dia, pesoActual])
  }
  return curva
}