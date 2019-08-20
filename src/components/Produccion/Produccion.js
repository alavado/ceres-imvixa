import React from 'react';
import { connect } from 'react-redux'
import produccionActions from '../../redux/produccion/actions'

const Produccion = ({numeroSmolts, fijarNumeroSmolts}) => {
  return (
    <div className="contenido">
      <div className="barra-superior-contenido">
        <div className="titulo-contenido">
          Parámetros productivos
        </div>
      </div>
      <label for="numero-smolts">Número de smolts</label>
      <input
        name="numero-smolts"
        type="text"
        value={numeroSmolts}
        onChange={e => fijarNumeroSmolts(e.target.value)}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  numeroSmolts: state.produccion.numeroSmolts
})

const mapDispatchToProps = dispatch => ({
  fijarNumeroSmolts: n => dispatch(produccionActions.fijarNumeroSmolts(n))
})

export default connect(mapStateToProps, mapDispatchToProps)(Produccion);