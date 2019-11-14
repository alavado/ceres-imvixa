import React from 'react';
import logoElanco from '../../../assets/elanco.svg'
import logoCeres from '../../../assets/logo_ceres.png'
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
        <h1>REPORTE SIMULADOR CERES BCA - IMVIXA</h1>
        <ul id="datos-empresa-reporte">
          <li>Empresa: <span>{titular}</span></li>
          <li>Centro: <span>{(nombreCentro !== '' ? `${nombreCentro} (código: ${codigoCentro})` : codigoCentro)}</span></li>
          <li>Fecha: <span>{obtenerFechaActualBonita()}</span></li>
        </ul>
      </div>
    </>
  );
};

export default EncabezadoReporte;