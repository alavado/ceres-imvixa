import React from 'react';
import { connect } from 'react-redux'
import cosechaActions from '../../redux/cosecha/actions'


const Cosecha = props => {
  const { datos } = props
  return (
    <div className="contenido">
      <div className="barra-superior-contenido">
        <div className="titulo-contenido">
          Parámetros de cosecha
        </div>
      </div>
      <div className="contenido-contenido">
        <div id="contenedor-perdida-peso">
          <label htmlFor="ayuno">Perdida de peso por ayuno (%)</label>
          <input
            id="ayuno"
            name="ayuno"
            type="number" min="1" max ="10" step="0.1"
            defaultValue={datos.perdidaPorAyuno}
            onChange={e => props.fijarPerdidaPorAyuno(e.target.value)}
          />
          <label htmlFor="ayuno">Perdida de peso sangre (%)</label>
          <input
            id="sangre"
            name="sangre"
            type="number" min="1" max ="10" step="0.1"
            defaultValue={datos.perdidaSangre}
            onChange={e => props.fijarPerdidaSangre(e.target.value)}
          />
          <label htmlFor="ayuno">Perdida de peso entrañas (%)</label>
          <input
            id="entrañas"
            name="entrañas"
            type="number" min="1" max ="15" step="0.1"
            defaultValue={datos.perdidaEntrañas}
            onChange={e => props.fijarPerdidaEntrañas(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  datos: state.cosecha
})


const mapDispatchToProps = dispatch => ({
  fijarPerdidaPorAyuno: perdida => dispatch(cosechaActions.fijarPerdidaPorAyuno(perdida)),
  fijarPerdidaSangre: perdida => dispatch(cosechaActions.fijarPerdidaSangre(perdida)),
  fijarPerdidaEntrañas: perdida => dispatch(cosechaActions.fijarPerdidaEntrañas(perdida)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cosecha);