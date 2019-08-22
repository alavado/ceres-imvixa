const porcentajeComidaDiaria = (peso, temperatura) => {
  if (temperatura > 18) {
    return 0 // los peces no comen cuando tienen calor
  }
  if (peso < 200) {
    return escalaComida([1.5, 1.9, 2.2, 2.8], temperatura)
  }
  if (peso < 300) {
    return escalaComida([1.3, 1.9, 2.3, 2.6], temperatura)
  }
  if (peso < 500) {
    return escalaComida([1.2, 1.7, 2.0, 2.3], temperatura)
  }
  if (peso < 775) {
    return escalaComida([1.0, 1.4, 1.7, 2.0], temperatura)
  }
  if (peso < 1000) {
    return escalaComida([0.8, 1.0, 1.5, 1.8], temperatura)
  }
  if (peso < 1250) {
    return escalaComida([0.7, 1.0, 1.3, 1.5], temperatura)
  }
  if (peso < 1500) {
    return escalaComida([0.6, 0.9, 1.2, 1.4], temperatura)
  }
  if (peso < 2000) {
    return escalaComida([0.5, 0.7, 1.1, 1.2], temperatura)
  }
  if (peso < 3000) {
    return escalaComida([0.5, 0.7, 0.9, 1.1], temperatura)
  }
  return escalaComida([.5, .6, .9, 1.0], temperatura)
}

const escalaComida = (porcentajeComida, temperatura) => {
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

export default porcentajeComidaDiaria;