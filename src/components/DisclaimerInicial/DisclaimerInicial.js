import React from 'react'
import './DisclaimerInicial.css'

const DisclaimerInicial = () => {

  const esconderDisclaimer = () => {
    var disclaimer = document.getElementById('DisclaimerInicial')
    disclaimer.style.display = 'none'
  }

  return (
    <div id="DisclaimerInicial">
      <div className="DisclaimerInicial__formulario">
        <div className="DisclaimerInicial__mensaje">
          <p>
            Al iniciar sesión, confirmo que entiendo que éste no es un dispositivo médico y que sus resultados en ningún caso reemplazan la prescripción médica veterinaria. 
          </p>
          <p>
            Esta herramienta de simulación utiliza los datos que usted voluntariamente decida incorporar. Elanco no archiva ni guarda información alguna que haya sido incluida por usted o respecto de las simulaciones que usted desee realizar junto al representante de ventas o técnico de Elanco.
          </p>
        </div>
        <div className="DisclaimerInicial__botones">
          <button className="DisclaimerInicial__botones_continuar" onClick={() => esconderDisclaimer()}>
            Continuar
          </button>
          <button className="DisclaimerInicial__botones_cancelar" onClick={() => window.close()}>
            Cancelar
          </button>
        </div>
      </div> 
    </div>
  )
}

export default DisclaimerInicial
