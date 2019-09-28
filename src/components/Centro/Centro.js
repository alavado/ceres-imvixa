import React from 'react';
import { connect } from 'react-redux'
import centroActions from '../../redux/centro/actions'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './Centro.css'

const Centro = props => {
  
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
              onChange={e => props.fijarMacrozona(e.target.value)}
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
              {props.barrios.filter(barrio => barrio.macrozona === props.barrio.macrozona).map((barrio, i) => (
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
              onChange={e => props.fijarTitular(e.target.value)}
              defaultValue={props.centro.titular}
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
              onChange={e => props.fijarCentro(e.target.value)}
              defaultValue={props.centro.codigo}
            >
              {props.barrio.centros.filter(centro => centro.titular === props.titular).sort((x, y) => x.codigo > y.codigo ? 1 : -1).map((centro, i) => (
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
          <Map center={(props.centro && props.centro.posicion)|| props.barrio.posicion} zoom={10} style={{height: 500}}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={(props.centro && props.centro.posicion)|| props.barrio.posicion}>
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
  barrios: state.centro.barrios.sort((x, y) => x.nombre > y.nombre ? 1 : -1),
  barrio: state.centro.barrios[state.centro.indiceBarrioSeleccionado],
  titular: state.centro.titular,
  centro: state.centro.barrios[state.centro.indiceBarrioSeleccionado].centros[state.centro.indiceCentroSeleccionado]
})

const mapDispatchToProps = dispatch => ({
  fijarBarrio: nombre => dispatch(centroActions.fijarBarrio(nombre)),
  fijarMacrozona: macrozona => dispatch(centroActions.fijarMacrozona(macrozona)),
  fijarTitular: titular => dispatch(centroActions.fijarTitular(titular)),
  fijarCentro: codigo => dispatch(centroActions.fijarCentro(Number(codigo)))
})

export default connect(mapStateToProps, mapDispatchToProps)(Centro);