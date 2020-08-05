import React from 'react';
import { connect } from 'react-redux'
import './ResumenComparacion.css'
import GraficoCrecimiento from './GraficoCrecimiento'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileContract as IconoReporte } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { OBJETIVO_PESO, OBJETIVO_FECHA } from '../../../helpers/constantes';
import CuadrosEstrategias from './CuadrosEstrategias';

const ResumenComparacion = ({produccion, curvaImvixa, curvaTradicional}) => {

  const { objetivos, pesoObjetivo, mesesObjetivo } = produccion

  return (
    <div id="fondo-resumen">
      <div className="titulo-contenido-secundario">
        <h1>Comparación de estrategias</h1>
        <Link to="/reporte">
          <div className="icono-accion-secundaria">
            <span>MOSTRAR REPORTE</span>
              <FontAwesomeIcon
                color="white"
                icon={IconoReporte}
              />
          </div>
        </Link>
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
  produccion: state.produccion
})

export default connect(mapStateToProps)(ResumenComparacion);