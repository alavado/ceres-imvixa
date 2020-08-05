import React from 'react'
import './DialogoDisclaimer.css';
const DialogoDisclaimer = props => {

  const esconderDisclaimer = () => {
    var disclaimer = document.getElementById('DialogoDisclaimer__fondo')
    disclaimer.style.display = 'none'
  }

  return (
    <div
      id="DialogoDisclaimer__fondo" 
    >
      <div
        className="DialogoDisclaimer__mensaje"
        onClick={e => e.stopPropagation()}
      >
        <p>
          La información que está por introducir puede ser información confidencial o sensible. 
        </p>
        <p>
          Elanco en ningún caso guardará la información que Ud. voluntariamente ingresa en esta aplicación. 
        </p>
      </div> 
      <button
        className="DialogoDisclaimer__boton" 
        onClick={esconderDisclaimer}
      >
        Aceptar
      </button>
    </div>
  )
}

export default DialogoDisclaimer
