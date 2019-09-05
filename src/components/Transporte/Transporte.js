import React, { useState } from 'react';
import { connect } from 'react-redux'
import transporteActions from '../../redux/transporte/actions'
import './Transporte.css'

const Transporte = props => {

  const [nuevoDestino, setNuevoDestino] = useState('')

  return (
    <div className="contenido">
      <div className="barra-superior-contenido">
        <div className="titulo-contenido">
          Parámetros de transporte
        </div>
      </div>
      <div className="contenido-contenido">
        <div id="contenedor-nuevo-destino">
          <label htmlFor="nuevo-destino">Destino</label>
          <input name="nuevo-destino" onChange={e => setNuevoDestino(e.target.value)} />
          <button onClick={() => props.agregarDestino(nuevoDestino)}>Agregar</button>
        </div>
        <div id="contenedor-destinos">
          {props.datos.destinos.map(destino => (
            <div className="contenedor-destino">
              <p>{destino.nombre}</p>
              <label htmlFor={`destino-costo-${destino.nombre}`}>Costo transporte por kg (USD)</label>
              <input defaultValue={destino.costo} id={`destino-${destino.nombre}`} />
              <label htmlFor={`destino-porcentaje-${destino.nombre}`}>Porcentaje de la producción</label>
              <input defaultValue={destino.porcentaje} id={`destino-${destino.porcentaje}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  datos: state.transporte
})

const mapDispatchToProps = dispatch => ({
  agregarDestino: nombre => dispatch(transporteActions.agregarDestino(nombre)),
  eliminarDestino: nombre => dispatch(transporteActions.eliminarDestino(nombre)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Transporte);