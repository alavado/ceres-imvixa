import React from 'react';
import { connect } from 'react-redux'
import entornoActions from '../../redux/entorno/actions'
import './Entorno.css'

const Entorno = props => {
  const { datos } = props
  return (
    <div className="contenido">
      <div className="barra-superior-contenido">
        <div className="titulo-contenido">
          Parámetros del entorno
        </div>
      </div>
      <div className="contenido-contenido">
        <div id="contenedor-temperaturas">
          {datos.temperaturas.map(mes => (
            <div className="input-temperatura" key={`input-mes-${mes}`}>
              <label htmlFor="mortalidad">T° media {datos.temperaturas[mes].nombreMes}</label>
              <input
                id="mortalidad"
                name="mortalidad"
                type="number" min="-10" step="0.1"
                value={datos.temperaturas[mes].temperatura}
                onChange={e => props.fijarTemperatura(mes, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  datos: state.entorno
})

const mapDispatchToProps = dispatch => ({
  fijarTemperatura: (mes, grados) => dispatch(entornoActions.fijarTemperatura(mes, grados))
})

export default connect(mapStateToProps, mapDispatchToProps)(Entorno);