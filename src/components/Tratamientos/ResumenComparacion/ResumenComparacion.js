import React from 'react';
import { connect } from 'react-redux'
import './ResumenComparacion.css'
import GraficoCrecimiento from './GraficoCrecimiento'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint as IconoReporte } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { OBJETIVO_PESO, OBJETIVO_FECHA } from '../../../helpers/constantes';
import CuadrosEstrategias from './CuadrosEstrategias';

const ResumenComparacion = ({state, produccion, tratamientos, modelo, curvaImvixa, curvaTradicional}) => {

  const { objetivos, pesoObjetivo, mesesObjetivo } = produccion

  return (
    <div id="fondo-resumen">
      <div id="barra-superior-resumen">
        <h1>Comparación de estrategias</h1>
        <div id="icono-imprimir-reporte">
          <Link to="/reporte">
            <FontAwesomeIcon
              color="white"
              icon={IconoReporte}
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
            objetivo={objetivos.includes(OBJETIVO_FECHA) ? OBJETIVO_FECHA : OBJETIVO_PESO}
          />
        </div>
        <CuadrosEstrategias
          objetivos={objetivos}
          curvaImvixa={curvaImvixa}
          curvaTradicional={curvaTradicional}
          pesoObjetivo={pesoObjetivo}
          mesesObjetivo={mesesObjetivo}
        />
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