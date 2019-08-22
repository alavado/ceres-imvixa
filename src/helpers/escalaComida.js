const porcentajeComidaDiaria = (peso, temperatura) => {
    if (temperatura > 18) {
      return 0 // los peces no comen cuando tienen calor
    }
    if (peso < 200) {
      return escala_comida_0_200(temperatura)
    }
    if (peso < 300) {
      return escala_comida_200_300(temperatura)
    }
    if (peso < 500) {
      return escala_comida_300_500(temperatura)
    }
    if (peso < 775) {
      return escala_comida_500_775(temperatura)
    }
    if (peso < 1000) {
      return escala_comida_775_1000(temperatura)
    }
    if (peso < 1250) {
      return escala_comida_1000_1250(temperatura)
    }
    if (peso < 1500) {
      return escala_comida_1250_1500(temperatura)
    }
    if (peso < 2000) {
      return escala_comida_1500_2000(temperatura)
    }
    if (peso < 3000) {
      return escala_comida_2000_3000(temperatura)
    }
    else{
      return escala_comida_3000(temperatura)
    }
  }

const escala_comida = (porcentajeComida, temperatura) => {
  const grados = [4, 8, 12, 16]
  // si excede los limites retornar limites
  if (temperatura > grados.slice(-1)) {
    return porcentajeComida.slice(-1)
  }
  if (temperatura < grados[0]) {
    return porcentajeComida[0]
  } 
  // encontrar rango adecuado de temperatura
  let rangoFinal = 1
  while (temperatura < grados[rangoFinal] && rangoFinal < grados.length) {
    rangoFinal++
  }
  // encontrar recta
  let x1 = grados[rangoFinal - 1]
  let x2 = grados[rangoFinal]
  let y1 = porcentajeComida[rangoFinal - 1]
  let y2 = porcentajeComida[rangoFinal]

  const m = (y2 - y1)/(x2 - x1)
  const intercepto = y1 - (m * x1)
  return (m * temperatura) + intercepto
}
  

const escala_comida_0_200 = temperatura => {
  const porcentajeComida = [1.5, 1.9, 2.2, 2.8] 
  return escala_comida(porcentajeComida, temperatura)
}
  

const escala_comida_200_300 = temperatura => {
  const porcentajeComida = [1.3, 1.9, 2.3, 2.6] 
  return escala_comida(porcentajeComida, temperatura)
}
  

const escala_comida_300_500 = temperatura => {
  const porcentajeComida = [1.2, 1.7, 2.0, 2.3] 
  return escala_comida(porcentajeComida, temperatura)
}
  

const escala_comida_500_775 = temperatura => {
  const porcentajeComida = [1.0, 1.4, 1.7, 2.0] 
  return escala_comida(porcentajeComida, temperatura)
}
  

const escala_comida_775_1000 = temperatura => {
  const porcentajeComida = [0.8, 1.0, 1.5, 1.8] 
  return escala_comida(porcentajeComida, temperatura)
}
  

const escala_comida_1000_1250 = temperatura => {
  const porcentajeComida = [0.7, 1.0, 1.3, 1.5] 
  return escala_comida(porcentajeComida, temperatura)
}
  

const escala_comida_1250_1500 = temperatura => {
  const porcentajeComida = [0.6, 0.9, 1.2, 1.4] 
  return escala_comida(porcentajeComida, temperatura)
}
  

const escala_comida_1500_2000 = temperatura => {
  const porcentajeComida = [0.5, 0.7, 1.1, 1.2] 
  return escala_comida(porcentajeComida, temperatura)
}
  

const escala_comida_2000_3000 = temperatura => {
  const porcentajeComida = [0.5, 0.7, 0.9, 1.1] 
  return escala_comida(porcentajeComida, temperatura)
}
  

const escala_comida_3000 = temperatura => {
  const porcentajeComida = [.5, .6, .9, 1.0] 
  return escala_comida(porcentajeComida, temperatura)
}
  

export default porcentajeComidaDiaria;