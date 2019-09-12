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
          Parámetros del centro
        </div>
      </div>
      <div className="contenido-contenido">
        <div id="contenedor-barrio">
          <label htmlFor="nombre-empresa">Empresa</label>
          <input id="nombre-empresa" />
          <label htmlFor="nombre-centro">Centro</label>
          <input id="nombre-centro" />
          <label htmlFor="barrio">Barrio</label>
          <select id="barrio" onChange={e => props.fijarBarrio(e.target.value)}>
            {datos.barrios.map(barrio => (
              <option
                key={`option-barrio-${barrio.nombre}`}
                value={barrio.nombre}
                onChange={e => props.fijarBarrio(e.target.value)}
              >
                {barrio.nombre}
              </option>
            ))}
          </select>
        </div>
        {/*<h2 id="titulo-temperaturas">Temperaturas medias</h2>
        <div id="contenedor-temperaturas">
          {Object.keys(datos.temperaturas).map(mes => (
            <div className="input-temperatura" key={`input-mes-${mes}`}>
              <label htmlFor="mortalidad">{datos.temperaturas[mes].nombreMes}</label>
              <input
                id="mortalidad"
                name="mortalidad"
                type="number" min="-10" step="0.1"
                value={datos.temperaturas[mes].temperatura}
                onChange={e => props.fijarTemperatura(mes, e.target.value)}
              />
            </div>
          ))}
          </div>*/}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  datos: state.entorno
})

const mapDispatchToProps = dispatch => ({
  fijarTemperatura: (mes, grados) => dispatch(entornoActions.fijarTemperatura(mes, grados)),
  fijarBarrio: nombre => dispatch(entornoActions.fijarBarrio(nombre)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Entorno);