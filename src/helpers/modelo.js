import moment from 'moment'
import { OBJETIVO_PESO, OBJETIVO_FECHA, MAXIMOS_DIAS_CICLO, DIAS_AYUNO_BAÑO, rangosTemp, umbralTemp } from './constantes';
import modelosCrecimientoPorMacrozona from './modelos_crecimiento_macrozonas.json'
import temperaturasMensuales from './temperaturas.json'
import temperaturasMensualesMagallanes from '../data/barrios_temp.json'
import tablaSGR from '../data/sgr_table.json'

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
  // curva.push(obtenerBiomasaPerdida(curvaMortalidad, curvaCrecimiento, numeroSmolts, dia - intervalo, curvaCrecimiento.length - 1))
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

const get_SGR = (peso, temp) => {
  // Quitar unidades a peso y convertir a integer
  peso = parseInt(peso / 10) * 10
  // Si es mayor que 6500 usar 6500
  if (peso > 5000) {
    peso = 5000
  }
  if (peso < 50) {
    peso = 50
  }
  const filaPeso = tablaSGR[peso.toString()]
  // Reviso por cada categoría de temperatura cual es la celda que corresponde
  for (let umbral = 0; umbral < umbralTemp.length; umbral++) {
    if (temp < umbralTemp[umbral]) {
      return filaPeso[rangosTemp[umbral]]
    }
  }
  return filaPeso[rangosTemp.slice(-1)]
}

// Calcula el aumento de peso en 7 dias
const evaluarModeloDeltaCrecimiento = (macrozona, peso, uta, mes_actual, barrio) => {
  // No había suficientes datos para las macrozonas 1 y 2
  if (macrozona === '1' || macrozona === '2') {
    macrozona = '3'
  }
  const modelo = modelosCrecimientoPorMacrozona[macrozona]
  const x = peso, y = uta
  const vars = [1, x, y, x*x, x*y, y*y]
  return Math.round(modelo.coefs.reduce((sum, v, i) => sum + vars[i] * v, 0) + modelo.intercepto)
}


const evaluarModeloDeltaCrecimientoDiarioSGR = (peso, mes_actual, barrio) => {
  const indice_mes = mes_actual - 1
  const temp = temperaturasMensualesMagallanes[barrio][indice_mes]
  const sgr = get_SGR(peso, temp)
  // elevado a 1 porque es crecimiento diario
  const peso_f = peso * (Math.pow(sgr / 100 + 1, 1))
  return Math.round(peso_f - peso)
}

const crecimientoSinComida = (macrozona, peso, uta) => -0.0025 * peso//evaluarModeloDeltaCrecimiento(macrozona, peso, uta) / 14.0

export const obtenerCurvaCrecimientoPorPeso = (macrozona, fechaInicio, pesoIngreso, tiposObjetivos, objetivoPeso, objetivoFecha, tratamientos, factorCrecimiento, ajustesPesos = [], barrio = '') => {
  let fechaCiclo = moment(fechaInicio, 'YYYY-MM-DD')
  let curva = [pesoIngreso]
  let pesoActual = pesoIngreso
  let semana = 1 / 7.0
  let diasAyunoRestante = 0
  let tratamientosAplicados = {}
  let uta = temperaturasMensuales[fechaCiclo.month() + 1] * 7
  let diaFinal = objetivoFecha * 30
  let mes_actual = 0
  const DIAS_AYUNO_BAÑO_ALPHA_FLUX = 3
  if (tiposObjetivos.includes(OBJETIVO_PESO) && tiposObjetivos.includes(OBJETIVO_FECHA)) {
    for (let dia = 2; dia <= MAXIMOS_DIAS_CICLO && dia <= diaFinal; dia++) {
      semana += 1 / 7.0
      fechaCiclo.add(1, 'days')
      mes_actual = fechaCiclo.month() + 1
      uta += temperaturasMensuales[mes_actual]
      if (`${Math.ceil(semana)}` in tratamientos && !(`${Math.ceil(semana)}` in tratamientosAplicados)) {
        diasAyunoRestante = 3
        tratamientosAplicados[`${Math.ceil(semana)}`] = 1
        diaFinal += tratamientos[`${Math.ceil(semana)}`].idMedicamento === 7 ? DIAS_AYUNO_BAÑO_ALPHA_FLUX : DIAS_AYUNO_BAÑO
      }
      if (diasAyunoRestante <= 0) {
        if (macrozona !== '9' && macrozona !== '10') {
          // Si no es magallanes uso el modelo estimado en la primera versión
          pesoActual += evaluarModeloDeltaCrecimiento(macrozona, pesoActual, uta, mes_actual, barrio) / 7.0
        } else {
          // Si es magallanes uso la formula SGR
          pesoActual += evaluarModeloDeltaCrecimientoDiarioSGR(pesoActual, mes_actual, barrio)
        }
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
      mes_actual = fechaCiclo.month() + 1
      uta += temperaturasMensuales[mes_actual]
      if (`${Math.ceil(semana)}` in tratamientos && !(`${Math.ceil(semana)}` in tratamientosAplicados)) {
        diasAyunoRestante = tratamientos[`${Math.ceil(semana)}`].idMedicamento === 7 ? DIAS_AYUNO_BAÑO_ALPHA_FLUX : DIAS_AYUNO_BAÑO
        tratamientosAplicados[`${Math.ceil(semana)}`] = 1
        //diaFinal += DIAS_AYUNO_BAÑO
      }
      if (diasAyunoRestante <= 0) {
        if (macrozona !== '9' && macrozona !== '10') {
          // Si no es magallanes uso el modelo estimado en la primera versión
          pesoActual += evaluarModeloDeltaCrecimiento(macrozona, pesoActual, uta, mes_actual, barrio) / 7.0
        } else {
          // Si es magallanes uso la formula SGR
          pesoActual += evaluarModeloDeltaCrecimientoDiarioSGR(pesoActual, mes_actual, barrio)
        }
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
