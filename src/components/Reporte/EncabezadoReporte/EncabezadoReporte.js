import React from 'react';
import logoElanco from '../../../assets/elanco.svg'
import { useSelector } from 'react-redux'
import { obtenerFechaActualBonita } from '../../../helpers/helpers';
import './EncabezadoReporte.css'

const EncabezadoReporte = () => {

  const centro = useSelector(state => state.centro)
  const { nombreCentro, titular } = centro
  const codigoCentro = centro.barrios[centro.indiceBarrioSeleccionado].centros[centro.indiceCentroSeleccionado].codigo

  return (
    <>
      <div id="logos-reporte">
        <img src={logoElanco} alt="logo elanco" id="logo-elanco-reporte" />
      </div>
      <div id="encabezado-reporte">
        <h1><div className="nombre-en-reporte"><span>V</span>isi<span>o</span>n</div>REPORTE MODELO DE SIMULACIÓN DE IMPACTO DE IMVIXA®</h1>
        <ul id="datos-empresa-reporte">
          <li>
            <div id="encabezado-reporte-warning">
              Los datos requeridos para realizar la presente simulación fueron entregados voluntariamente por el cliente y son de su exclusiva responsabilidad. 
              La herramienta utiliza una función de crecimiento y calculadores de impacto que están basados en resultados de diversos reportes sanitario-productivos de la industria del salmón (ver referencias). 
            </div>
          </li>
          <li>Empresa: <span>{titular}</span></li>
          <li>Centro: <span>{(nombreCentro !== '' ? `${nombreCentro} (código: ${codigoCentro})` : codigoCentro)}</span></li>
          <li>Fecha: <span>{obtenerFechaActualBonita()}</span></li>
        </ul>
      </div>
    </>
  );
};

export default EncabezadoReporte;