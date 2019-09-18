import React from 'react';
import { connect } from 'react-redux'
import centroActions from '../../redux/centro/actions'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './Centro.css'

const Centro = props => {
  const { datos } = props
  const position = {
    lat: -42.4521753,
    lng: -72.9928245,
    zoom: 8,
  }
  return (
    <>
      <div className="contenido">
        <div className="barra-superior-contenido">
          <div className="titulo-contenido">
            Centro productivo
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
        </div>
      </div>        
      <div className="contenido-secundario">
        <div className="titulo-contenido-secundario">
          <h1>Ubicación</h1>
        </div>
        <div style={{padding: 16}}>
          <Map center={position} zoom={position.zoom} style={{height: 500}}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </Map>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  datos: state.centro
})

const mapDispatchToProps = dispatch => ({
  fijarTemperatura: (mes, grados) => dispatch(centroActions.fijarTemperatura(mes, grados)),
  fijarBarrio: nombre => dispatch(centroActions.fijarBarrio(nombre)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Centro);