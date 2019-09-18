import React from 'react';
import { connect } from 'react-redux'
import './ResumenComparacion.css'
import { curvaCrecimiento } from '../../../helpers/modelo'
import GraficoCrecimiento from './GraficoCrecimiento2'

const ResumenComparacion = ({produccion, tratamientos, modelo}) => {

  const { fechaInicio, pesoObjetivo, pesosSmolt } = produccion
  const curvaImvixa = curvaCrecimiento('imvixa', fechaInicio, pesosSmolt.imvixa, pesoObjetivo, tratamientos.imvixa, modelo)
  const curvaTradicional = curvaCrecimiento('tradicional', fechaInicio, pesosSmolt.tradicional, pesoObjetivo, tratamientos.tradicional, modelo)

  return (
    <div id="fondo-resumen">
      <div id="barra-superior-resumen">
        <h1>Comparación de estrategias</h1>
      </div>
      <div id="contenido-resumen">
        <div id="grafico-crecimiento">
          <GraficoCrecimiento
            curvaImvixa={curvaImvixa}
            curvaTradicional={curvaTradicional}
            pesoObjetivo={pesoObjetivo}
          />
        </div>
        <div id="cuadros-estrategias">
          <div id="fondo-estrategia-a">
            <h1>Estrategia Imvixa</h1>
            <div className="resultados-estrategia">
              <h2>{Math.round(10 * curvaImvixa.length / 30.0) / 10.0}</h2>
              <p>meses para alcanzar el peso objetivo</p>
            </div>
          </div>
          <div id="fondo-estrategia-b">
            <h1>Estrategia tradicional</h1>
            <div className="resultados-estrategia">
              <h2>{Math.round(10 * curvaTradicional.length / 30.0) / 10.0}</h2>
              <p>meses para alcanzar el peso objetivo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  produccion: state.produccion,
  modelo: state.centro.barrios[state.centro.indiceBarrioSeleccionado].modeloCrecimiento,
  tratamientos: state.tratamientos.tratamientos
})

export default connect(mapStateToProps)(ResumenComparacion);