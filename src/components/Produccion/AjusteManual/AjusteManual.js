import React, { useEffect } from 'react'
import CampoNumerico from '../CampoNumerico'
import './AjusteManual.css'
import { connect } from 'react-redux'
import produccionActions from '../../../redux/produccion/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const AjusteManual = props => {

  const pesosBase = props.curvaCrecimiento.filter((v, i) => i > 0 && i % 30 === 0)

  useEffect(() => {
    props.fijarPesosBase(pesosBase)
  }, [])

  return (
    <div id="contenedor-ajuste-manual">
      <h2>Ajuste manual de curva de crecimiento</h2>
      {pesosBase.map((v, i) => (
        <div className="input-ajuste" key={`ajuste-${i}`}>
          <label htmlFor={`input-ajuste-${i}`}>Peso al final del mes {i + 1}</label> 
          <CampoNumerico
            id={`input-ajuste-${i}`}
            value={v + props.ajustes[i]}
            suffix={' g'}
            decimalScale={0}
            onValueChange={e => props.fijarAjuste(i, v, e.floatValue)}
          />
        </div>
      ))}
      <div id="contenedor-acciones-tratamientos">
        <button
          id="boton-volver-tratamientos"
          onClick={() => props.setMostrandoAjusteManual(false)}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="sm" />
          Atrás
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  ajustes: state.produccion.ajustesPesos,
})

const mapDispatchToProps = dispatch => ({
  fijarPesosBase: pesos => {
    dispatch(produccionActions.fijarPesosBase(pesos))
  },
  fijarAjuste: (mes, pesoBase, nuevoPeso) => {
    dispatch(produccionActions.fijarAjuste(mes, nuevoPeso - pesoBase))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AjusteManual)

