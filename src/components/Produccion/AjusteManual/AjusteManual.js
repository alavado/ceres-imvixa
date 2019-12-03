import React from 'react'
import CampoNumerico from '../CampoNumerico'
import './AjusteManual.css'

const AjusteManual = ({curvaCrecimiento}) => {
  console.log(curvaCrecimiento)
  return (
    <div id="contenedor-ajuste-manual">
      <h2>Ajuste manual de curva de crecimiento</h2>
      {curvaCrecimiento.filter((v, i) => i > 0 && i % 30 === 0).map((v, i) => (
        <div className="input-ajuste" key={`ajuste-${i}`}>
          <label htmlFor={`input-ajuste-${i}`}>Peso al final del mes {i + 1}</label> 
          <CampoNumerico
            id={`input-ajuste-${i}`}
            value={v}
            suffix={' g'}
            decimalScale={0}
          />
        </div>
      ))}
    </div>
  )
}

export default AjusteManual

