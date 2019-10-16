import { FARMACO_APLICACION_BAÑO} from './constantes'

export const calcularNumeroDeBaños = (estrategia, medicamentos, tratamientos) => {
  return Object.keys(tratamientos[estrategia]).filter(key => {
    const { idMedicamento } = tratamientos[estrategia][key]
    const medicamento = medicamentos.find(m => m.id === idMedicamento)
    return medicamento.formaFarmaceutica === FARMACO_APLICACION_BAÑO
  }).length
}

export const calcularCantidadDeProductosVertidos = (medicamentos, tratamientos) => {
  const medicamentosBaños = medicamentos.filter(m => m.formaFarmaceutica === FARMACO_APLICACION_BAÑO)
  const productosVertidos = medicamentosBaños.map(m => ({
    principioActivo: m.principioActivo,
    ...Object.keys(tratamientos).reduce((obj, estrategia) => ({
      ...obj, [estrategia]: Object.keys(tratamientos[estrategia]).filter(k => tratamientos[estrategia][k].idMedicamento === m.id).length
    }), {})
  }))

  console.log({productosVertidos});
  
  // // recorrer tratamientos
  // Object.keys(tratamientos).map(estrategia => {
  //   let semanas = Object.keys(tratamientos[estrategia])
  //   console.log(semanas);
  //   for (let i=0; i+=1; i<semanas.length){
  //     let semana = semanas[i]
  //     let { idMedicamento } = tratamientos[estrategia][semana]
  //     let medicamento = medicamentos.find(m => m.id === idMedicamento)
  //     // seleccionar tratamientos que sean baños
  //     if ( medicamento.formaFarmaceutica === FARMACO_APLICACION_BAÑO){
  //       // guardar por principio activo ambas estrategias
  //       productosVertidos[medicamento.principioActivo] = {
  //         ...productosVertidos[medicamento.principioActivo],
  //         estrategia: productosVertidos[medicamento.principioActivo][estrategia]+medicamento.cantidadPorJaula 
  //       }
  //     }
  //   }
  //   })
  
  return productosVertidos
}