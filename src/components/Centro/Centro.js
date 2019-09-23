import React, { useState } from 'react';
import { connect } from 'react-redux'
import centroActions from '../../redux/centro/actions'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './Centro.css'

const Centro = props => {
  const [macrozona, setMacrozona] = useState(props.barrio.macrozona)
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
            <label htmlFor="macrozona">Macrozona</label>
            <select
              id="macrozona"
              defaultValue={props.barrio.macrozona}
              onChange={e => setMacrozona(e.target.value)}
            >
              {[...new Set(props.barrios.map(b => b.macrozona))].map((macrozona, i) => (
                <option
                  key={`option-macrozona-${i}`}
                  value={macrozona}
                >
                  {macrozona}
                </option>
              ))}
            </select>
            <label htmlFor="barrio">Barrio</label>
            <select
              id="barrio"
              onChange={e => props.fijarBarrio(e.target.value)}
              defaultValue={props.barrio.nombre}
            >
              {props.barrios.filter(barrio => barrio.macrozona === macrozona).map((barrio, i) => (
                <option
                  key={`option-barrio-${i}`}
                  value={barrio.nombre}
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
          <Map center={props.barrio.posicion} zoom={8} style={{height: 500}}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={props.barrio.posicion}>
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
  barrios: state.centro.barrios,
  barrio: state.centro.barrios[state.centro.indiceBarrioSeleccionado]
})

const mapDispatchToProps = dispatch => ({
  fijarTemperatura: (mes, grados) => dispatch(centroActions.fijarTemperatura(mes, grados)),
  fijarBarrio: nombre => dispatch(centroActions.fijarBarrio(nombre)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Centro);