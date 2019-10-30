import { FARMACO_APLICACION_BAÑO, dias } from './constantes'

export const calcularMortalidadTotal = (mortalidad, numeroSmolts, numeroJaulas, curvaMortalidadAcumulada, medicamentos, tratamientos) => {
  const numeroPecesMuertos = Object.keys(tratamientos).reduce((sum, semana) => {
    if (semana === '0'){
      return sum
    }
    const { idMedicamento, dia } = tratamientos[semana]
    const medicamento = medicamentos.find(m => m.id === idMedicamento)
    const diaDeAplicacion = (Number(semana) - 1) * 7 + dias.indexOf(dia)
    if (medicamento.mortalidad >= 1){
      return sum + medicamento.mortalidad * numeroJaulas
    }
    const numeroPecesAlDia = numeroSmolts * (1 - curvaMortalidadAcumulada[diaDeAplicacion]) - sum
    return sum + numeroPecesAlDia * medicamento.mortalidad
  }, 0)
  return mortalidad + numeroPecesMuertos / numeroSmolts
}