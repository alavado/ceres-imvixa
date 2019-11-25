import React from 'react';
import { useSelector } from 'react-redux'
import { redondearYAString, obtenerFechaActualBonita } from '../../../helpers/helpers';
import { OBJETIVO_PESO, OBJETIVO_FECHA, TIPO_CAMBIO_DOLAR, SUFIJO_TIPO_CAMBIO_DOLAR, SUFIJO_TIPO_CAMBIO_PESO } from '../../../helpers/constantes';

const DatosSimulacion = ({tipoCambio, valorDolar}) => {

  const produccion = useSelector(state => state.produccion)
  const economico = useSelector(state => state.economico)
  const { fechaInicio, pesoSmolt, numeroSmolts, mortalidad, mesesObjetivo, pesoObjetivo, objetivos } = produccion
  const { costoSmolt, costoAlimento } = economico

  const usarDolares = tipoCambio === TIPO_CAMBIO_DOLAR
  const sufijoTipoCambio = usarDolares ? SUFIJO_TIPO_CAMBIO_DOLAR : SUFIJO_TIPO_CAMBIO_PESO
  const multiplicadorCambio = usarDolares ? 1 : valorDolar

  return (
    <div>
      <h3>Datos de la simulación sin tratamientos</h3>
      <ul id="datos-simulacion-reporte">
        <li>Inicio de ciclo: <span>{obtenerFechaActualBonita(fechaInicio)}</span></li>
        <li>N° de smolts al ingreso: <span>{redondearYAString(numeroSmolts, 0)}</span></li>
        <li>Peso de smolt al ingreso: <span>{redondearYAString(pesoSmolt, 0)} g</span></li>
        <li>Mortalidad (sin tratamientos): <span>{redondearYAString(mortalidad, 1)} %</span></li>
        <li>Costo smolt: <span>{redondearYAString(multiplicadorCambio * costoSmolt, usarDolares ? 2 : 0)} {sufijoTipoCambio} </span></li>
        <li>Costo por kilo de alimento: <span>{redondearYAString(multiplicadorCambio * costoAlimento, usarDolares ? 2 : 0)} {sufijoTipoCambio}</span></li>
        { objetivos.includes(OBJETIVO_PESO)? <li>Objetivo de peso de cosecha: <span>{redondearYAString(pesoObjetivo / 1000, 1)} kg</span></li> : '' }
        { objetivos.includes(OBJETIVO_FECHA)? <li>Objetivo de tiempo de cosecha: <span>{mesesObjetivo} meses</span></li> : '' }
      </ul>
    </div>
  );
};

export default DatosSimulacion;