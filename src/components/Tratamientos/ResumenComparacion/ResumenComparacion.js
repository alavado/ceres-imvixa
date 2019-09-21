import React from 'react';
import { connect } from 'react-redux'
import './ResumenComparacion.css'
import { curvaCrecimiento } from '../../../helpers/modelo'
import GraficoCrecimiento from './GraficoCrecimiento2'
import { OBJETIVO_PESO } from '../../../helpers/constantes';

const ResumenComparacion = ({produccion, tratamientos, modelo}) => {

  const { fechaInicio, objetivo, pesoObjetivo, fechaObjetivo, pesosSmolt } = produccion
  let curvaImvixa, curvaTradicional
  if (objetivo === OBJETIVO_PESO) {
    curvaImvixa = curvaCrecimiento('imvixa', fechaInicio, pesosSmolt.imvixa, objetivo, pesoObjetivo, tratamientos.imvixa, modelo)
    curvaTradicional = curvaCrecimiento('tradicional', fechaInicio, pesosSmolt.tradicional, objetivo, pesoObjetivo, tratamientos.tradicional, modelo)
  }
  else {
    curvaImvixa = curvaCrecimiento('imvixa', fechaInicio, pesosSmolt.imvixa, objetivo, fechaObjetivo, tratamientos.imvixa, modelo)
    curvaTradicional = curvaCrecimiento('tradicional', fechaInicio, pesosSmolt.tradicional, objetivo, fechaObjetivo, tratamientos.tradicional, modelo)
  }

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
            {objetivo === OBJETIVO_PESO ?
              (<div className="resultados-estrategia">
                <h2>{Math.round(10 * curvaImvixa.length / 30.0) / 10.0}</h2>
                <p>meses para alcanzar el peso objetivo</p>
              </div>) :
              (<div className="resultados-estrategia">
                <h2>{Math.round(.1 * curvaImvixa[curvaImvixa.length - 1][1]) / 100.0}</h2>
                <p>kg a la cosecha</p>
              </div>)
            }
          </div>
          <div id="fondo-estrategia-b">
            <h1>Estrategia tradicional</h1>
            {objetivo === OBJETIVO_PESO ?
              (<div className="resultados-estrategia">
                <h2>{Math.round(10 * curvaTradicional.length / 30.0) / 10.0}</h2>
                <p>meses para alcanzar el peso objetivo</p>
              </div>) :
              (<div className="resultados-estrategia">
                <h2>{Math.round(.1 * curvaTradicional[curvaTradicional.length - 1][1]) / 100.0}</h2>
                <p>kg a la cosecha</p>
              </div>)
            }
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