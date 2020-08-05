import React from 'react'
import './DialogoDisclaimer.css';
import { connect } from 'react-redux'
import popupsActions from '../../../../redux/popups/actions'

const DialogoDisclaimer = props => {

  return props.aceptaIngresarDatos ? '' :
  (
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
        onClick={e => props.aceptarIngresarDatos()}
      >
        Aceptar
      </button>
    </div>
  )
}

const mapStateToProps = state => ({
  aceptaIngresarDatos: state.popups.aceptaIngresarDatos,
})

const mapDispatchToProps = dispatch => ({
  aceptarIngresarDatos: () => dispatch(popupsActions.aceptarIngresarDatos()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogoDisclaimer);
