import React, { useState } from 'react';
import { connect } from 'react-redux'
import centroActions from '../../redux/centro/actions'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './Centro.css'

const Centro = props => {
  const [ posicion, setPosicion ] = useState({
    lat: -42.4521753,
    lng: -72.9928245,
    zoom: 8,
  })
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
            <label htmlFor="barrio">Barrio</label>
            <select id="barrio" onChange={e => {
              const barrioSeleccionado = props.barrios[e.target.value]
              setPosicion({
                ...posicion,
                ...barrioSeleccionado.posicion
              })
              props.fijarBarrio(barrioSeleccionado.nombre)
            }}>
              {props.barrios.map((barrio, i) => (
                <option
                  key={`option-barrio-${i}`}
                  value={i}
                >
                  {barrio.nombre}
                </option>
              ))}
            </select>
            <label htmlFor="nombre-centro">Centro</label>
            <input id="nombre-centro" />
          </div>
        </div>
      </div>        
      <div className="contenido-secundario">
        <div className="titulo-contenido-secundario">
          <h1>Ubicación</h1>
        </div>
        <div style={{padding: 16}}>
          <Map center={posicion} zoom={posicion.zoom} style={{height: 500}}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={posicion}>
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
  barrios: state.centro.barrios
})

const mapDispatchToProps = dispatch => ({
  fijarTemperatura: (mes, grados) => dispatch(centroActions.fijarTemperatura(mes, grados)),
  fijarBarrio: nombre => dispatch(centroActions.fijarBarrio(nombre)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Centro);