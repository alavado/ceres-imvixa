import React from 'react';
import { connect } from 'react-redux'
import './ResumenComparacion.css'
import { obtenerCurvasDeCrecimiento } from '../../helpers/modelo'
import GraficoCrecimiento from './GraficoCrecimiento';

const ResumenComparacion = props => {

  const curvasCrecimiento = obtenerCurvasDeCrecimiento(props.entorno, props.produccion, {})

  return (
    <div id="fondo-resumen">
      <div id="barra-superior-resumen">
        <h1>Resultados estrategias</h1>
      </div>
      <div id="contenido-resumen">
        <div id="grafico-crecimiento">
          <GraficoCrecimiento curvasCrecimiento={curvasCrecimiento} />
        </div>
        <div id="cuadros-estrategias">
          <div id="fondo-estrategia-a">
            <h1>Estrategia A</h1>
            <div className="resultados-estrategia">
              <h2>{curvasCrecimiento.find(v => v[1] > props.produccion.pesoObjetivo)[0]}</h2>
              <p>días para alcanzar el peso objetivo</p>
            </div>
          </div>
          <div id="fondo-estrategia-b">
            <h1>Estrategia B</h1>
            <div className="resultados-estrategia">
              <h2>{curvasCrecimiento.find(v => v[2] > props.produccion.pesoObjetivo)[0]}</h2>
              <p>días para alcanzar el peso objetivo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  produccion: state.produccion,
  entorno: state.entorno
})

export default connect(mapStateToProps)(ResumenComparacion);