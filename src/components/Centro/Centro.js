import React, { useState } from 'react';
import { connect } from 'react-redux'
import centroActions from '../../redux/centro/actions'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './Centro.css'

const Centro = props => {
  const [macrozona, setMacrozona] = useState(props.barrio.macrozona)
  const [centro, setCentro] = useState(null)
  const [titular, setTitular] = useState(null)
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
            <label htmlFor="macrozona">Macrozona</label>
            <select
              id="macrozona"
              defaultValue={props.barrio.macrozona}
              onChange={e => setMacrozona(e.target.value)}
            >
              {[...new Set(props.barrios.map(b => b.macrozona))].sort().map((macrozona, i) => (
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
              {props.barrios.sort((x, y) => x.nombre > y.nombre ? 1 : -1).filter(barrio => barrio.macrozona === macrozona).map((barrio, i) => (
                <option
                  key={`option-barrio-${i}`}
                  value={barrio.nombre}
                >
                  {barrio.nombre}
                </option>
              ))}
            </select>
            <label htmlFor="nombre-empresa">Empresa</label>
            <select
              id="empresa"
              onChange={e => {
                setTitular(e.target.value)
              }}
            >
              {[...new Set(props.barrio.centros.map(({titular}) => titular))].sort((x, y) => x > y ? 1 : -1).map((titular, i) => (
                <option value={titular} key={`option-titular-${i}`}>
                  {titular}
                </option>
              ))}
            </select>
            <label htmlFor="nombre-centro">Centro</label>
            <select
              id="centro"
              onChange={e => {
                setCentro(props.barrio.centros.find(({codigo}) => Number(codigo) === Number(e.target.value)))
              }}
            >
              {props.barrio.centros.sort((x, y) => x.nombre > y.nombre ? 1 : -1).filter(centro => centro.titular === titular).map((centro, i) => (
                <option
                  key={`option-centro-${i}`}
                  value={centro.codigo}
                >
                  {centro.codigo}
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
          <Map center={(centro && centro.posicion)|| props.barrio.posicion} zoom={10} style={{height: 500}}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={(centro && centro.posicion)|| props.barrio.posicion}>
              <Popup>
                Barrio seleccionado
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