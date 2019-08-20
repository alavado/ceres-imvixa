import React from 'react';
import { connect } from 'react-redux'
import './ResumenComparacion.css'

const ResumenComparacion = ({numeroSmolts}) => {
  return (
    <div id="fondo-resumen">
      <div id="barra-superior-resumen">
        <h1>Resumen estrategias</h1>
      </div>
      <div id="contenido-resumen">
        <div id="fondo-estrategia-a">
          Estrategia A
          {numeroSmolts}
        </div>
        <div id="fondo-estrategia-b">
          Estrategia B
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  numeroSmolts: state.produccion.numeroSmolts
})

export default connect(mapStateToProps)(ResumenComparacion);