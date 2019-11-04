import React from 'react';
import { useSelector } from 'react-redux'
import { redondear } from '../../../helpers/helpers';

const DatosSimulacion = () => {

  const produccion = useSelector(state => state.produccion)
  const economico = useSelector(state => state.economico)
  const { fechaInicio, pesoSmolt, numeroSmolts, mortalidad, mesesObjetivo, pesoObjetivo } = produccion
  const { costoSmolt, costoAlimento } = economico

  return (
    <div>
      <h3>Datos de la simulación sin tratamientos</h3>
      <ul id="datos-simulacion-reporte">
        <li>Inicio de ciclo: <span>{fechaInicio}</span></li>
        <li>N° de smolts al ingreso: <span>{redondear(numeroSmolts, 0)}</span></li>
        <li>Peso de smolt al ingreso: <span>{redondear(pesoSmolt, 0)} g</span></li>
        <li>Mortalidad (sin tratamientos): <span>{redondear(mortalidad, 1)} %</span></li>
        <li>Costo smolt: <span>{redondear(costoSmolt, 2)} USD</span></li>
        <li>Costo por kilo de alimento: <span>{redondear(costoAlimento, 1)} USD</span></li>
        <li>Objetivo de peso de cosecha: <span>{pesoObjetivo} g</span></li>
        <li>Objetivo de tiempo de cosecha: <span>{mesesObjetivo} meses</span></li>
      </ul>
    </div>
  );
};

export default DatosSimulacion;