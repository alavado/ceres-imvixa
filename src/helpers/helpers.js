import { FARMACO_APLICACION_BAÑO} from './constantes'

export const calcularNumeroDeBaños = (estrategia, medicamentos, tratamientos, curvaCrecimiento) => {
  return Object.keys(tratamientos[estrategia]).filter(key => {
    const { idMedicamento } = tratamientos[estrategia][key]
    const medicamento = medicamentos.find(m => m.id === idMedicamento)
    return medicamento.formaFarmaceutica === FARMACO_APLICACION_BAÑO && key < 1 + Math.floor(curvaCrecimiento.length / 7)
  }).length
}

export const obtenerBaños = (tratamientos, medicamentos) => {
  const semanas = Object.keys(tratamientos).filter(key => {
    const { idMedicamento } = tratamientos[key]
    const medicamento = medicamentos.find(m => m.id === idMedicamento)
    return medicamento.formaFarmaceutica === FARMACO_APLICACION_BAÑO
  })
  return semanas.reduce((obj, s) => ({...obj, [s]: tratamientos[s]}), {})
}

export const calcularCostoBaños = (medicamentos, tratamientos, numeroDeJaulas, volumenJaula) => {
  return Object.keys(tratamientos).reduce((suma, key) => {
    const { idMedicamento } = tratamientos[key]
    const medicamento = medicamentos.find(m => m.id === idMedicamento)
    if (medicamento.formaFarmaceutica === FARMACO_APLICACION_BAÑO) {
      const costoProducto = medicamento.costoUnitario * medicamento.dosisBaño * Number(numeroDeJaulas) * Number(volumenJaula)
      const costoBaño = costoProducto + (Number(medicamento.costoOperacional) * Number(numeroDeJaulas))
      return suma + costoBaño
    }
    return suma
  }, 0)
}

export const calcularCostoTratamientoOral = (principioActivo, medicamentos, tratamientos, numeroDeSmoltsInicial, curvaMortalidadAcumulada, curvaCrecimiento, bFCR) => {
  return Object.keys(tratamientos).reduce((suma, semana) => {
    const numSemana = Number(semana)
    const { idMedicamento } = tratamientos[semana]
    const m = medicamentos.find(m => m.id === idMedicamento)
    if (m.principioActivo === principioActivo) { 
      const costoGramos = m.costoUnitario / 1000 
      let pesoPromedio, diferenciaPeso, cantidadComida
      if (semana === '0'){
        const bFCRInicial = tratamientos[semana].pesoDeAplicacion < 100 ? 1.001 : (bFCR + 1) / 2
        pesoPromedio = tratamientos[semana].pesoDeAplicacion / 1000
        diferenciaPeso = pesoPromedio * 0.2 
        cantidadComida = diferenciaPeso * numeroDeSmoltsInicial / (1000 * bFCRInicial)
        return suma + ( costoGramos * m.dosis * pesoPromedio * numeroDeSmoltsInicial) + cantidadComida * m.costoOperacional
      }
      const numeroDeSmoltsActual = numeroDeSmoltsInicial * (1-curvaMortalidadAcumulada[numSemana * 4])
      const diasSemana = [0,1,2,4,5,6].map(i => numSemana * 7 + i)
      const pesosSemana = curvaCrecimiento.filter((v, i) => diasSemana.includes(i))
      pesoPromedio = pesosSemana.reduce((prev, current) => current += prev, 0) / (pesosSemana.length * 1000)
      diferenciaPeso = curvaCrecimiento(numSemana * 7 + 6) - curvaCrecimiento[numSemana * 7 - 1]
      cantidadComida = diferenciaPeso * numeroDeSmoltsActual / (1000000 * bFCR)
      return suma + (costoGramos * m.dosis * pesoPromedio * numeroDeSmoltsActual) + cantidadComida * m.costoOperacional
    }
    return suma
  }, 0)
}

export const calcularCostoImvixa = (medicamentos, tratamientos, numeroDeSmoltsInicial, curvaMortalidadAcumulada, curvaCrecimiento, bFCR) => {
  return Object.keys(tratamientos).reduce((suma, semana) => {
    const numSemana = Number(semana)
    const { idMedicamento } = tratamientos[semana]
    const m = medicamentos.find(m => m.id === idMedicamento)
    if (m.nombre === 'Imvixa') {
      let pesoPromedio, diferenciaPeso, cantidadComida
      const costoGramos = m.costoUnitario / 1000
      if (semana === '0'){
        const bFCRInicial = tratamientos[semana].pesoDeAplicacion < 100 ? 1.001 : (bFCR + 1) / 2
        pesoPromedio = tratamientos[semana].pesoDeAplicacion / 1000
        diferenciaPeso = pesoPromedio * 0.2 
        cantidadComida = diferenciaPeso * numeroDeSmoltsInicial / (1000 * bFCRInicial)
        console.log(cantidadComida);
        return suma + ( costoGramos * m.dosis * pesoPromedio * numeroDeSmoltsInicial) + cantidadComida * m.costoOperacional
      }
      const numeroDeSmoltsActual = numeroDeSmoltsInicial * (1-curvaMortalidadAcumulada[numSemana * 4])
      const diasSemana = [0,1,2,4,5,6].map(i => numSemana * 7 + i)
      const pesosSemana = curvaCrecimiento.filter((v, i) => diasSemana.includes(i))
      pesoPromedio = pesosSemana.reduce((prev, current) => current += prev, 0) / (pesosSemana.length * 1000)
      diferenciaPeso = curvaCrecimiento(numSemana * 7 + 6) - curvaCrecimiento[numSemana * 7 - 1]
      cantidadComida = diferenciaPeso * numeroDeSmoltsActual / (1000000 * bFCR)
      return suma + (costoGramos * m.dosis * pesoPromedio * numeroDeSmoltsActual) + cantidadComida * m.costoOperacional
    }
    return suma
  }, 0)
}

export const checkTratamientoEnSemanasAnteriores = (tratamientos, medicamentos, semana, principioActivo) => {
  const semanas = Object.keys(tratamientos).map(s => Number(s))
  const semanasMenores = semanas.filter(s => s > semana - 52 && s < semana)
  return semanasMenores.reduce((obj, v) => medicamentos.
  find( m =>  m.id === tratamientos[v].idMedicamento).principioActivo === principioActivo || obj, false)
}

export const calcularPTI = (medicamentos, tratamientos) => {
  const semanas = Object.keys(tratamientos).sort((a,b) => Number(a) > Number(b) ? 1 : -1)
  const pti = semanas.reduce((obj, semana, i) => {
    const {factorFarmaco, factorMetodo, principioActivo} = medicamentos.find(m => m.id === tratamientos[semana].idMedicamento)
    const factorResistencia = checkTratamientoEnSemanasAnteriores(tratamientos, medicamentos, semana, principioActivo)? 2 : 1 
    let calculoParcial = factorResistencia * factorFarmaco * factorMetodo
    return {
      ...obj,
      suma: obj.suma + (semana === '0' ? 0 : calculoParcial),
      trataciones: [...obj.trataciones, {
        i,
        semana,
        principioActivo,
        factorResistencia,
        factorFarmaco,
        factorMetodo,
        pTI: semana === '0' ? '-' : calculoParcial 
      }] 
    }},{suma: 0, trataciones: []})
  return pti
}

export const calcularCantidadDeProductosVertidos = (medicamentos, tratamientos) => {
  const principiosActivos = [...new Set(medicamentos.filter(m => m.formaFarmaceutica === FARMACO_APLICACION_BAÑO).map(m => m.principioActivo))]
  const estrategias = Object.keys(tratamientos)
  const productosVertidos = principiosActivos
    .map(principioActivo => {
      const {cantidadPorJaula, unidad} = medicamentos.find(m => m.principioActivo === principioActivo)
      return {
        principioActivo,
        unidad,
        ...estrategias.reduce((obj, estrategia) => {
          const semanas = Object.keys(tratamientos[estrategia])
          return {
            ...obj,
            [estrategia]: semanas.filter(k => medicamentos.find(m => m.id === tratamientos[estrategia][k].idMedicamento).principioActivo === principioActivo).length * cantidadPorJaula
          }
        }, {})}
    })
    .filter(p => estrategias.reduce((v, e) => v || p[e] > 0, false))
    .sort((p1, p2) => p1.principioActivo > p2.principioActivo ? 1 : -1)
  
  return productosVertidos
}

export const obtenerFechaActualBonita = () => {
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  const f = new Date();
  return f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
}

export const redondear = (numero, cifrasSignificativas = 1) => {
  return (Math.round(numero * 10 ** cifrasSignificativas) / 10 ** cifrasSignificativas)
    .toLocaleString(undefined, { minimumFractionDigits: cifrasSignificativas, maximumFractionDigits: cifrasSignificativas})
}