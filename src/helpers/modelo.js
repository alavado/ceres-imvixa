import moment from 'moment'
import { OBJETIVO_PESO, OBJETIVO_FECHA, MAXIMOS_DIAS_CICLO, DIAS_AYUNO_BAÑO } from './constantes';
import modelosCrecimientoPorMacrozona from './modelos_crecimiento_macrozonas.json'
import temperaturasMensuales from './temperaturas.json'

export const obtenerCurvaMortalidadAcumulada = (modelo, dias, mortalidadTotal) => {
  let curva = []
  for (let dia = 0; dia < dias; dia++) {
    let vars = [1, dia, dia * dia]
    curva.push(modelo.coefs.reduce((sum, v, i) => sum + vars[i] * v, 0) + modelo.intercepto)
  }
  const factorEscala = (mortalidadTotal / 100.0) / curva[curva.length - 1]
  return curva.map(mortalidad => mortalidad * factorEscala)
}

export const obtenerCurvaBiomasaPerdida = (curvaMortalidad, curvaCrecimiento, numeroSmolts, intervalo) => {
  let curva = []
  let dia
  for (dia = 0; dia < curvaCrecimiento.length; dia += intervalo) {
    curva.push(obtenerBiomasaPerdida(curvaMortalidad, curvaCrecimiento, numeroSmolts, dia, dia + intervalo))
  }
  curva.push(obtenerBiomasaPerdida(curvaMortalidad, curvaCrecimiento, numeroSmolts, dia - intervalo, curvaCrecimiento.length - 1))
  return curva
}

export const obtenerBiomasaPerdida = (curvaMortalidad, curvaCrecimiento, numeroSmolts, diaInicio, diaFin) => {
  let bioMasaPerdida = 0
  for (let dia = diaInicio + 1; dia < diaFin; dia++) {
    const deltaMortalidad = (curvaMortalidad[dia] - curvaMortalidad[dia - 1]) / 100.0
    const pesoAyer = curvaCrecimiento[dia - 1]
    if (deltaMortalidad){
      bioMasaPerdida += deltaMortalidad * pesoAyer * numeroSmolts
    }
  }
  return bioMasaPerdida
}

export const obtenerCurvaBiomasa = (curvaMortalidad, curvaCrecimiento, numeroSmolts, intervalo) => {
  let curva = []
  for (let dia = intervalo; dia < curvaCrecimiento.length; dia += intervalo) {
    curva.push(obtenerBiomasa(curvaMortalidad, curvaCrecimiento, numeroSmolts, dia))
  }
  curva.push(obtenerBiomasa(curvaMortalidad, curvaCrecimiento, numeroSmolts, curvaCrecimiento.length - 1))
  return curva
}

export const obtenerBiomasa = (curvaMortalidad, curvaCrecimiento, numeroSmolts, dia) => {
  return ((1 - curvaMortalidad[dia]) / 100.0) * curvaCrecimiento[dia] * numeroSmolts / 10
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

const crecimientoSinComida = (macrozona, peso, uta) => -0.0025 * peso//evaluarModeloDeltaCrecimiento(macrozona, peso, uta) / 14.0

export const obtenerCurvaCrecimientoPorPeso = (macrozona, fechaInicio, pesoIngreso, tiposObjetivos, objetivoPeso, objetivoFecha, tratamientos, factorCrecimiento, ajustesPesos = []) => {
  let fechaCiclo = moment(fechaInicio, 'YYYY-MM-DD')
  let curva = [pesoIngreso]
  let pesoActual = pesoIngreso
  let semana = 1 / 7.0
  let diasAyunoRestante = 0
  let tratamientosAplicados = {}
  let uta = temperaturasMensuales[fechaCiclo.month() + 1] * 7
  let diaFinal = objetivoFecha * 30
  const DIAS_AYUNO_BAÑO_ALPHA_FLUX = 4
  if (tiposObjetivos.includes(OBJETIVO_PESO) && tiposObjetivos.includes(OBJETIVO_FECHA)) {
    for (let dia = 2; dia <= MAXIMOS_DIAS_CICLO && dia <= diaFinal; dia++) {
      semana += 1 / 7.0
      fechaCiclo.add(1, 'days')
      uta += temperaturasMensuales[fechaCiclo.month() + 1]
      if (`${Math.ceil(semana)}` in tratamientos && !(`${Math.ceil(semana)}` in tratamientosAplicados)) {
        diasAyunoRestante = 3
        tratamientosAplicados[`${Math.ceil(semana)}`] = 1
        diaFinal += tratamientos[`${Math.ceil(semana)}`].idMedicamento === 7 ? DIAS_AYUNO_BAÑO_ALPHA_FLUX : DIAS_AYUNO_BAÑO
      }
      if (diasAyunoRestante <= 0) {
        pesoActual += evaluarModeloDeltaCrecimiento(macrozona, pesoActual, uta) / 7.0
      }
      else {
        pesoActual += crecimientoSinComida(macrozona, pesoActual, uta)
      }
      diasAyunoRestante--
      curva.push(pesoActual)
    }
    return curva.map(v => v * objetivoPeso / curva.slice(-1)[0])
  }
  else {
    for (let dia = 2; dia <= MAXIMOS_DIAS_CICLO && ((tiposObjetivos.includes(OBJETIVO_PESO) && pesoActual < objetivoPeso) || (tiposObjetivos.includes(OBJETIVO_FECHA) && dia <= diaFinal)); dia++) {
      semana += 1 / 7.0
      fechaCiclo.add(1, 'days')
      uta += temperaturasMensuales[fechaCiclo.month() + 1]
      if (`${Math.ceil(semana)}` in tratamientos && !(`${Math.ceil(semana)}` in tratamientosAplicados)) {
        diasAyunoRestante = tratamientos[`${Math.ceil(semana)}`].idMedicamento === 7 ? DIAS_AYUNO_BAÑO_ALPHA_FLUX : DIAS_AYUNO_BAÑO
        tratamientosAplicados[`${Math.ceil(semana)}`] = 1
        //diaFinal += DIAS_AYUNO_BAÑO
      }
      if (diasAyunoRestante <= 0) {
        pesoActual += evaluarModeloDeltaCrecimiento(macrozona, pesoActual, uta) / 7.0
      }
      else {
        pesoActual += crecimientoSinComida(macrozona, pesoActual, uta)
      }
      diasAyunoRestante--
      curva.push(pesoActual)
    }
  }
  curva = curva.map(v => v * factorCrecimiento)
  if (ajustesPesos.length > 0) {
    for (let mes = 0; mes * 30 < curva.length; mes++) {
      const base = mes > 0 ? ajustesPesos[mes - 1] : 0
      const delta = (ajustesPesos[mes] - base) / 30
      for (let dia = 30 * mes; dia < 30 * (mes + 1); dia++) {
        if (dia >= curva.length) {
          break
        }
        curva[dia] += (mes > 0 ? base : 0) + delta * (dia - 30 * mes)
      }
    }
  }
  return curva.filter(v => !tiposObjetivos.includes(OBJETIVO_PESO) || (tiposObjetivos.includes(OBJETIVO_PESO) && v < objetivoPeso))
}
