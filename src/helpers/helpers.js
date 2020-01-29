import { FARMACO_APLICACION_BAÑO, FARMACO_APLICACION_ORAL} from './constantes'

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
      let volumen = volumenJaula
      if (medicamento.volumen !== undefined) {
        volumen = medicamento.volumen
      }
      const factorM3 = medicamento.unidadDosis.slice(-2) === 'lt' ? 1000 : 1
      const factorKg = medicamento.unidadDosis.slice(0, 2) === 'ml' ? 1000 : 1000000
      const dosisKgPorM3 = factorM3 * medicamento.cantidadPorJaula / factorKg // / 1000 para pasar de mg a kg
      const costoProducto = medicamento.costoUnitario * volumen * dosisKgPorM3
      const costoBaño = (costoProducto + Number(medicamento.costoOperacional)) * Number(numeroDeJaulas)
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
      const costoMiligramos = m.costoUnitario / 1000000 
      const dosisPractica = m.dosis // (m.dosis / (m.presentacion / 100))
      let pesoPromedio, diferenciaPeso, cantidadComida
      if (semana === '0'){
        const bFCRInicial = tratamientos[semana].pesoDeAplicacion < 100 ? 1.001 : (bFCR + 1) / 2
        pesoPromedio = tratamientos[semana].pesoDeAplicacion / 1000
        diferenciaPeso = pesoPromedio * 0.2 
        cantidadComida = diferenciaPeso * numeroDeSmoltsInicial / (1000 * bFCRInicial)
        return suma + (costoMiligramos * dosisPractica * pesoPromedio * numeroDeSmoltsInicial) + cantidadComida * m.costoOperacional
      }
      const numeroDeSmoltsActual = numeroDeSmoltsInicial * (1-curvaMortalidadAcumulada[numSemana * 4])
      const diasSemana = [0,1,2,4,5,6].map(i => numSemana * 7 + i)
      const pesosSemana = curvaCrecimiento.filter((v, i) => diasSemana.includes(i))
      pesoPromedio = pesosSemana.reduce((prev, current) => current += prev, 0) / (pesosSemana.length * 1000)
      const diaMaximoPeso = numSemana * 7 + 6 < curvaCrecimiento.length ? numSemana * 7 + 6 : curvaCrecimiento.length -1
      diferenciaPeso = (curvaCrecimiento[diaMaximoPeso] - curvaCrecimiento[numSemana * 7 - 1]) / 1000
      cantidadComida = diferenciaPeso * numeroDeSmoltsActual / (1000 * bFCR)
      return suma + (costoMiligramos * dosisPractica * pesoPromedio * numeroDeSmoltsActual) + cantidadComida * m.costoOperacional
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
      const costoMiligramos = m.costoUnitario / 1000000
      const dosisPractica = m.dosis //(m.dosis / (m.presentacion / 100))
      if (semana === '0'){
        const bFCRInicial = tratamientos[semana].pesoDeAplicacion < 100 ? 1.001 : (bFCR + 1) / 2
        pesoPromedio = tratamientos[semana].pesoDeAplicacion / 1000
        diferenciaPeso = pesoPromedio * 0.2 
        cantidadComida = diferenciaPeso * numeroDeSmoltsInicial / (1000 * bFCRInicial)
        return suma + ( costoMiligramos * dosisPractica * pesoPromedio * numeroDeSmoltsInicial) + cantidadComida * m.costoOperacional
      }
      const numeroDeSmoltsActual = numeroDeSmoltsInicial * (1-curvaMortalidadAcumulada[numSemana * 4])
      const diasSemana = [0,1,2,4,5,6].map(i => numSemana * 7 + i)
      const pesosSemana = curvaCrecimiento.filter((v, i) => diasSemana.includes(i))
      pesoPromedio = pesosSemana.reduce((prev, current) => current += prev, 0) / (pesosSemana.length * 1000)
      const diaMaximoPeso = numSemana * 7 + 6 < curvaCrecimiento.length ? numSemana * 7 + 6 : curvaCrecimiento.length -1
      diferenciaPeso = curvaCrecimiento[diaMaximoPeso] - curvaCrecimiento[numSemana * 7 - 1]
      cantidadComida = diferenciaPeso * numeroDeSmoltsActual / (1000000 * bFCR)
      return suma + (costoMiligramos * dosisPractica * pesoPromedio * numeroDeSmoltsActual) + cantidadComida * m.costoOperacional
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

export const calcularProductosVertidosOrales = (medicamentos, tratamientos, numeroDeSmoltsInicial, curvas) => {
  const { curvaMortalidadAcumulada, curvaCrecimiento } = curvas
  const semanas = Object.keys(tratamientos)
  .filter(semana => semana !== '0')
  return semanas.reduce((productosVertidos, semana) => {
    const numSemana = Number(semana)
    const { idMedicamento } = tratamientos[semana]
    const m = medicamentos.find(m => m.id === idMedicamento)
    if (m.formaFarmaceutica !== FARMACO_APLICACION_ORAL) {
      return productosVertidos
    }
    const dosisPractica = m.dosis 
    const numeroDeSmoltsActual = numeroDeSmoltsInicial * (1-curvaMortalidadAcumulada[numSemana * 4])
    const diasSemana = [0,1,2,4,5,6].map(i => numSemana * 7 + i)
    const pesosSemana = curvaCrecimiento.filter((v, i) => diasSemana.includes(i))
    const pesoPromedio = pesosSemana.reduce((prev, current) => current += prev, 0) / (pesosSemana.length * 1000)
    return productosVertidos.concat([{
      principioActivo : m.principioActivo,
      cantidad: dosisPractica * pesoPromedio * numeroDeSmoltsActual
    }])}, [])
}

export const calcularProductosVertidosBaños = (aplicaciones, medicamentos, volumenJaula, numeroDeJaulas) => {
  return aplicaciones.reduce((productosVertidos, idMedicamento) => {
    const medicamento = medicamentos.find(m => m.id === idMedicamento)
    if (medicamento.formaFarmaceutica !== FARMACO_APLICACION_BAÑO) {
      return productosVertidos
    }
    let volumenEnM3 = volumenJaula
    if (medicamento.volumen !== undefined) {
      volumenEnM3 = medicamento.volumen
    }
    let dosisPorM3 = medicamento.cantidadPorJaula
    const [numeradorDosis, denominadorDosis] = medicamento.unidadDosis.split('/')
    if (denominadorDosis === 'lt') {
      dosisPorM3 *= 1000
    }
    if (numeradorDosis === 'mg') {
      dosisPorM3 /= 1E6
    }
    else if (numeradorDosis === 'ml') {
      dosisPorM3 /= 1000
    }
    const cantidadPorJaula = dosisPorM3 * volumenEnM3
    return productosVertidos.concat([{
      principioActivo: medicamento.principioActivo,
      cantidad: cantidadPorJaula * numeroDeJaulas
    }])
  }, [])
}

export const calcularProductosVertidos = (medicamentos, tratamientos, volumenJaula, numeroDeJaulas, numeroDeSmoltsInicial, curvas) => {
  const aplicaciones = Object.keys(tratamientos)
  .map(semana => tratamientos[semana].idMedicamento)
  return calcularProductosVertidosOrales(medicamentos, tratamientos, numeroDeSmoltsInicial, curvas)
  .concat(calcularProductosVertidosBaños(aplicaciones, medicamentos, volumenJaula, numeroDeJaulas))
}

export const agruparProductosVertidos = (medicamentos, tratamientos, volumenJaula, numeroDeJaulas, numeroDeSmoltsInicial, curvas) => {
  const principiosActivos = [...new Set(medicamentos.filter(m => m.formaFarmaceutica === FARMACO_APLICACION_BAÑO).map(m => m.principioActivo))]
  const estrategias = Object.keys(tratamientos)
  const productosVertidos = {
    tradicional : calcularProductosVertidos(medicamentos, tratamientos.tradicional, volumenJaula, numeroDeJaulas, numeroDeSmoltsInicial, curvas.tradicional),
    imvixa : calcularProductosVertidos(medicamentos, tratamientos.imvixa, volumenJaula, numeroDeJaulas, numeroDeSmoltsInicial, curvas.imvixa)
  } 
  return principiosActivos
    .map(principioActivo => {
      const medicamento = medicamentos.find(m => m.principioActivo === principioActivo)
      return {
        principioActivo,
        unidad: medicamento.unidad,
        ...estrategias.reduce((obj, estrategia) => {
          return {
            ...obj,
            [estrategia]: productosVertidos[estrategia]
            .filter(m => m.principioActivo === principioActivo)
            .reduce((p, v)=> p + v.cantidad, 0)
          }
        }, {})}
    })
    .filter(p => estrategias.reduce((v, e) => v || p[e] > 0, false))
    .sort((p1, p2) => p1.principioActivo > p2.principioActivo ? 1 : -1)
}

export const obtenerFechaActualBonita = (fecha = null) => {
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  let f = new Date()
  if (fecha !== null) {
    var dateParts = fecha.split('-')
    f = new Date(+dateParts[0], dateParts[1] - 1, +dateParts[2]);
  }
  return f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
}

export const redondear = (numero, cifrasSignificativas = 1) => {
  return (Math.round(numero * 10 ** cifrasSignificativas) / 10 ** cifrasSignificativas)
}

export const redondearYAString = (numero, cifrasSignificativas = 1) => {
  return redondear(numero, cifrasSignificativas)
    .toLocaleString('de-DE', { minimumFractionDigits: cifrasSignificativas, maximumFractionDigits: cifrasSignificativas})
}