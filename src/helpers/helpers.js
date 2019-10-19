import { FARMACO_APLICACION_BAÑO} from './constantes'

export const calcularNumeroDeBaños = (estrategia, medicamentos, tratamientos) => {
  return Object.keys(tratamientos[estrategia]).filter(key => {
    const { idMedicamento } = tratamientos[estrategia][key]
    const medicamento = medicamentos.find(m => m.id === idMedicamento)
    return medicamento.formaFarmaceutica === FARMACO_APLICACION_BAÑO
  }).length
}

export const calcularPTI = (medicamentos, tratamientos) => {
  const principiosActivos = [...new Set(medicamentos.map(m => m.principioActivo))]
  const ptiPrincipioActivo = principiosActivos
  .reduce((suma, principioActivo) => {
    const {factorFarmaco, factorMetodo} = medicamentos.find(m => m.principioActivo === principioActivo)
    const semanas = Object.keys(tratamientos)
    const numeroDeAplicaciones = semanas.filter(s => medicamentos.find(m => m.id === tratamientos[s].idMedicamento).principioActivo === principioActivo).length
    // TODO mejorar el número de aplicaciones pq solo si son dos en 12 meses, no en el ciclo
    const factorResistencia = numeroDeAplicaciones > 1 ? 2 : 1 
    return suma + (factorResistencia * factorFarmaco * factorMetodo)},0)
  return ptiPrincipioActivo
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