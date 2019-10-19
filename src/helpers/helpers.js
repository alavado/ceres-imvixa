import { FARMACO_APLICACION_BAÑO} from './constantes'

export const calcularNumeroDeBaños = (estrategia, medicamentos, tratamientos) => {
  return Object.keys(tratamientos[estrategia]).filter(key => {
    const { idMedicamento } = tratamientos[estrategia][key]
    const medicamento = medicamentos.find(m => m.id === idMedicamento)
    return medicamento.formaFarmaceutica === FARMACO_APLICACION_BAÑO
  }).length
}

export const checkSemanasAnteriores = (tratamientos, medicamentos, semana, principioActivo) => {
  const semanas = Object.keys(tratamientos).map(s => Number(s))
  const semanasMenores = semanas.filter(s => s > semana - 52 && s < semana)
  return semanasMenores.reduce((obj, v) => medicamentos.
  find( m =>  m.id === tratamientos[v].idMedicamento).principioActivo === principioActivo || obj, false)
}

export const calcularPTI = (medicamentos, tratamientos) => {
  const semanas = Object.keys(tratamientos).sort((a,b) => Number(a) > Number(b) ? 1 : -1)
  const pti = semanas.reduce((obj, semana, i) => {
    const {factorFarmaco, factorMetodo, principioActivo} = medicamentos.find(m => m.id === tratamientos[semana].idMedicamento)
    const factorResistencia = checkSemanasAnteriores(tratamientos, medicamentos, semana, principioActivo)? 2 : 1 
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