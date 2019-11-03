import { FARMACO_APLICACION_BAÑO} from './constantes'

export const calcularNumeroDeBaños = (estrategia, medicamentos, tratamientos) => {
  return Object.keys(tratamientos[estrategia]).filter(key => {
    const { idMedicamento } = tratamientos[estrategia][key]
    const medicamento = medicamentos.find(m => m.id === idMedicamento)
    return medicamento.formaFarmaceutica === FARMACO_APLICACION_BAÑO
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
      const costoProducto = (medicamento.costoUnitario / 1000) * medicamento.dosisBaño * Number(numeroDeJaulas) * Number(volumenJaula)
      const costoBaño = costoProducto + (Number(medicamento.costoOperacional) * Number(numeroDeJaulas))
      return suma + costoBaño
    }
    return suma
  }, 0)
}

export const calcularCostoEmamectina = (medicamentos, tratamientos, numeroDeSmoltsInicial, curvaMortalidadAcumulada) => {
  return Object.keys(tratamientos).reduce((suma, semana) => {
    const { idMedicamento } = tratamientos[semana]
    const medicamento = medicamentos.find(m => m.id === idMedicamento)
    if (medicamento.principioActivo === 'Emamectina') {
      if (semana === '0'){
        return suma + (medicamento.costoUnitario * numeroDeSmoltsInicial)
      }
      const numeroDeSmoltsActual = numeroDeSmoltsInicial * (1-curvaMortalidadAcumulada[Number(semana)*4])
      return suma + (medicamento.costoUnitario * numeroDeSmoltsActual)
    }
    return suma
  }, 0)
}

export const calcularCostoImvixa = (medicamentos, tratamientos, numeroDeSmoltsInicial, curvaMortalidadAcumulada) => {
  return Object.keys(tratamientos).reduce((suma, semana) => {
    const { idMedicamento } = tratamientos[semana]
    const medicamento = medicamentos.find(m => m.id === idMedicamento)
    if (medicamento.nombre === 'Imvixa') {
      if (semana === '0'){
        return suma + (medicamento.costoUnitario * numeroDeSmoltsInicial)
      }
      const numeroDeSmoltsActual = numeroDeSmoltsInicial * (1-curvaMortalidadAcumulada[Number(semana)*4])
      return suma + (medicamento.costoUnitario * numeroDeSmoltsActual)
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