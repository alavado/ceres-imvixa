import React from 'react';
import { connect } from 'react-redux'
import './ResumenComparacion.css'
import GraficoCrecimiento from './GraficoCrecimiento2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { OBJETIVO_PESO } from '../../../helpers/constantes';

const ResumenComparacion = ({state, produccion, tratamientos, modelo, curvaImvixa, curvaTradicional}) => {

  const { objetivo, pesoObjetivo } = produccion

  return (
    <div id="fondo-resumen">
      <div id="barra-superior-resumen">
        <h1>Comparación de estrategias</h1>
        <div id="icono-imprimir-reporte">
          <Link to="/reporte">
            <FontAwesomeIcon
              color="white"
              icon={faFile}
            />
          </Link>
        </div>
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
          <div id="fondo-estrategia-b">
            <h1>Estrategia tradicional</h1>
            {objetivo === OBJETIVO_PESO ?
              (<div className="resultados-estrategia">
                <h2>{(Math.round(10 * curvaTradicional.length / 30.0) / 10.0).toLocaleString(undefined, { minimumFractionDigits: 1})}</h2>
                <p>meses para alcanzar el peso objetivo</p>
              </div>) :
              (<div className="resultados-estrategia">
                <h2>{(Math.round(.1 * curvaTradicional[curvaTradicional.length - 1]) / 100.0).toLocaleString(undefined, { minimumFractionDigits: 1})}</h2>
                <p>kg a la cosecha</p>
              </div>)
            }
          </div>
          <div id="fondo-estrategia-a">
            <h1>Estrategia Imvixa</h1>
            {objetivo === OBJETIVO_PESO ?
              (<div className="resultados-estrategia">
                <h2>{(Math.round(10 * curvaImvixa.length / 30.0) / 10.0).toLocaleString(undefined, { minimumFractionDigits: 1})}</h2>
                <p>meses para alcanzar el peso objetivo</p>
              </div>) :
              (<div className="resultados-estrategia">
                <h2>{(Math.round(.1 * curvaImvixa[curvaImvixa.length - 1]) / 100.0).toLocaleString(undefined, { minimumFractionDigits: 2})}</h2>
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
  state,
  produccion: state.produccion,
  modelo: state.centro.barrios[state.centro.indiceBarrioSeleccionado].modeloCrecimiento,
  tratamientos: state.tratamientos.tratamientos
})

export default connect(mapStateToProps)(ResumenComparacion);