import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import './Reporte.css'
import { calcularNumeroDeBaños, calcularCostoBaños, calcularPTI, calcularCostoTratamientoOral, calcularCostoImvixa, calcularCostoTratamientosOrales, obtenerFechaActualBonita, obtenerBaños } from '../../helpers/helpers'
import { calcularMortalidadTotal } from '../../helpers/reporteVariablesProductivas'
import { obtenerCurvaCrecimientoPorPeso, obtenerCurvaMortalidadAcumulada } from '../../helpers/modelo'
import { DIAS_AYUNO_BAÑO, TIPO_CAMBIO_DOLAR, TIPO_CAMBIO_PESO } from "../../helpers/constantes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import EncabezadoReporte from './EncabezadoReporte/EncabezadoReporte';
import DatosSimulacion from './DatosSimulacion';
import ImpactoProductivo from './ImpactoProductivo/ImpactoProductivo';
import ImpactoEconomico from './ImpactoEconomico/ImpactoEconomico';
import ImpactosLaborales from './ImpactosLaborales';
import ImpactoCertificacion from './ImpactoCertificacion';
import ImpactoRegulacion from './ImpactoRegulacion';
import Anexos from './Anexos';
import axios from 'axios'
import economicoActions from '../../redux/economico/actions';

const { ipcRenderer } = window.require('electron');

const Reporte = ({ state, fijarValorDolar }) => {
  const { estructuraCostos, costoSmolt, costoAlimento } = state.economico
  const { medicamentos, tratamientos } = state.tratamientos
  const { objetivos, mesesObjetivo, pesoSmolt, fechaInicio, pesoObjetivo, numeroSmolts, numeroJaulas, volumenJaula, mortalidad, eFCR, bFCR, factorCrecimiento, ajustesPesos } = state.produccion
  const { macrozona, modeloMortalidad, nombre: barrio } = state.centro.barrios[state.centro.indiceBarrioSeleccionado]

  const [tipoCambio, setTipoCambio] = useState(TIPO_CAMBIO_DOLAR)
  const [valorDolar, setValorDolar] = useState(state.economico.valorDolar || { valor: 795, fecha: '2019-11-14' })

  // PTI
  const ptiImvixa = calcularPTI(medicamentos, tratamientos['imvixa'])
  const ptiTradicional = calcularPTI(medicamentos, tratamientos['tradicional'])

  // Curvas de crecimiento
  const curvaSinTratamientos = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivos, pesoObjetivo, mesesObjetivo, [], factorCrecimiento, ajustesPesos, barrio)
  const curvaImvixa = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivos, pesoObjetivo, mesesObjetivo, obtenerBaños(tratamientos.imvixa, medicamentos), factorCrecimiento, ajustesPesos, barrio)
  const curvaTradicional = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivos, pesoObjetivo, mesesObjetivo, obtenerBaños(tratamientos.tradicional, medicamentos), factorCrecimiento, ajustesPesos, barrio)

  const numeroBañosImvixa = calcularNumeroDeBaños('imvixa', medicamentos, tratamientos, curvaImvixa)
  const numeroBañosTradicional = calcularNumeroDeBaños('tradicional', medicamentos, tratamientos, curvaTradicional)

  // Curvas de Mortalidad y Biomasa
  // Imvixa
  const curvaMortalidadAcumuladaImvixa = obtenerCurvaMortalidadAcumulada(modeloMortalidad, curvaImvixa.length, mortalidad)
  const mortalidadTotalImvixa = calcularMortalidadTotal(mortalidad, numeroSmolts, numeroJaulas, curvaMortalidadAcumuladaImvixa, medicamentos, tratamientos['imvixa'], curvaImvixa.length)

  const pesoFinalImvixa = curvaImvixa.slice(-1)[0]/1000

  // Tradicional
  const curvaMortalidadAcumuladaTradicional = obtenerCurvaMortalidadAcumulada(modeloMortalidad, curvaTradicional.length, mortalidad)
  const mortalidadTotalTradicional = calcularMortalidadTotal(mortalidad, numeroSmolts, numeroJaulas, curvaMortalidadAcumuladaTradicional, medicamentos, tratamientos['tradicional'], curvaTradicional.length)

  const pesoFinalTradicional = curvaTradicional.slice(-1)[0]/1000
  
  // Biomasa total cosechada
  const biomasaImvixa = numeroSmolts * (1 - mortalidadTotalImvixa / 100.0) * pesoFinalImvixa
  const biomasaTradicional = numeroSmolts * (1 - mortalidadTotalTradicional / 100.0) * pesoFinalTradicional
  // Economicos
  // generales
  const costoSmolts = numeroSmolts * costoSmolt
  const pesoFinalSinTratamientos = curvaSinTratamientos.slice(-1)[0]/1000
  const deltaPeso = pesoFinalSinTratamientos - pesoSmolt / 1000
  const cantidadAlimentoSinTratamientos = deltaPeso * eFCR * numeroSmolts * (1 - mortalidad / 100.0)
  const costoTotalAlimentoSinTratamiento = costoAlimento * cantidadAlimentoSinTratamientos
  const costoTotal = costoTotalAlimentoSinTratamiento / (estructuraCostos.alimento / 100)
  const costoProduccionFijo = costoTotal - costoTotalAlimentoSinTratamiento - costoSmolts
  const costoProduccionDiario = costoProduccionFijo / curvaSinTratamientos.length

  // Costo tratamientos
  // estrategia Tradicional
  const costoBañosTradicional = calcularCostoBaños(medicamentos, tratamientos['tradicional'], numeroJaulas, volumenJaula)
  const costoMarginalBañosTradicional = costoBañosTradicional / biomasaTradicional
  const costoImvixaTradicional = calcularCostoImvixa(medicamentos, tratamientos['tradicional'], numeroSmolts, curvaMortalidadAcumuladaTradicional, curvaTradicional, bFCR) / biomasaTradicional
  const costoOralesTradicional = calcularCostoTratamientosOrales(medicamentos, tratamientos['tradicional'], numeroSmolts, curvaMortalidadAcumuladaTradicional, curvaTradicional, bFCR) / biomasaTradicional
  const costoOtrosTradicional = costoOralesTradicional - costoImvixaTradicional
  // estrategia Imvixa
  const costoBañosImvixa = calcularCostoBaños(medicamentos, tratamientos['imvixa'], numeroJaulas, volumenJaula)
  const costoMarginalBañosImvixa = costoBañosImvixa / biomasaImvixa
  const costoImvixaImvixa = calcularCostoImvixa(medicamentos, tratamientos['imvixa'], numeroSmolts, curvaMortalidadAcumuladaImvixa, curvaImvixa, bFCR) / biomasaImvixa
  const costoOralesImvixa = calcularCostoTratamientosOrales(medicamentos, tratamientos['imvixa'], numeroSmolts, curvaMortalidadAcumuladaImvixa, curvaImvixa, bFCR) / biomasaImvixa
  const costoOtrosImvixa = costoOralesImvixa - costoImvixaImvixa
 // economicos estrategia Imvixa
  const costoAyunoImvixa = (costoProduccionDiario * numeroBañosImvixa * DIAS_AYUNO_BAÑO) / biomasaImvixa
  const deltaPesoImvixa = pesoFinalImvixa - pesoSmolt / 1000
  const cantidadAlimentoImvixa = deltaPesoImvixa * eFCR * numeroSmolts * (1 - mortalidadTotalImvixa / 100.0)
  const costoTotalAlimentoImvixa = costoAlimento * cantidadAlimentoImvixa
  const costoProduccionImvixa = costoTotalAlimentoImvixa  + costoSmolts + costoProduccionDiario * curvaImvixa.length
  const costoProduccionSinAyunoImvixa = costoProduccionImvixa / biomasaImvixa - costoAyunoImvixa
  
  
  // const costoMarginalImvixa = costoProduccionSinAyunoImvixa + costoAyunoImvixa + costoBañosImvixa + costoEmamectinaImvixa + costoImvixaImvixa
  // economicos estrategia Tradicional
  const costoAyunoTradicional = (costoProduccionDiario * numeroBañosTradicional * DIAS_AYUNO_BAÑO) / biomasaTradicional
  const deltaPesoTradicional = pesoFinalTradicional - pesoSmolt / 1000
  const cantidadAlimentoTradicional = deltaPesoTradicional * eFCR * numeroSmolts * (1 - mortalidadTotalTradicional / 100.0)
  const costoTotalAlimentoTradicional = costoAlimento * cantidadAlimentoTradicional
  const costoProduccionTradicional = costoTotalAlimentoTradicional  + costoSmolts + costoProduccionDiario * curvaTradicional.length
  const costoProduccionSinAyunoTradicional = costoProduccionTradicional / biomasaTradicional - costoAyunoTradicional
  
  const imprimirPDF = () => {
    ipcRenderer.send('imprimir')
  }

  const fijarTipoCambio = e => {
    setTipoCambio(e.target.value)
  }

  useEffect(() => {
    axios.get('https://mindicador.cl/api')
      .then(res => {
        const valorDolarActual = res.data.dolar
        setValorDolar({
          valor: valorDolarActual.valor,
          fecha: valorDolarActual.fecha.substring(0, 10)
        })
        fijarValorDolar(valorDolarActual)
      })
  }, [])

  return (
    <>
      <div id="contenedor-acciones-reporte">
        <div id="acciones-reporte">
          <button id="boton-volver-del-reporte" onClick={() => window.history.back()}>
            <FontAwesomeIcon icon={faChevronLeft} size="sm" style={{marginRight: 8}} />
            Calendarios de tratamientos
          </button>
          <div id="contenedor-tipo-cambio">
            <p>Tipo de cambio</p>
            <div>
              <input type="radio" id="dolar" name="tipo-cambio" value={TIPO_CAMBIO_DOLAR} checked={tipoCambio === TIPO_CAMBIO_DOLAR} onChange={fijarTipoCambio} />
              <label for="dolar">Dólar estadounidense (USD)</label>
            </div>
            <div title={`Valor actualizado el ${obtenerFechaActualBonita(valorDolar.fecha)}`}>
              <input type="radio" id="peso" name="tipo-cambio" value={TIPO_CAMBIO_PESO} checked={tipoCambio === TIPO_CAMBIO_PESO} onChange={fijarTipoCambio} />
              <label for="peso">Peso chileno (1 USD = {valorDolar.valor} CLP)</label>
            </div>
          </div>
          {/* <button onClick={imprimirPDF}>Imprimir PDF</button> */}
        </div>
      </div>
      <div id="reporte">
        <EncabezadoReporte />
        <DatosSimulacion
          tipoCambio={tipoCambio}
          valorDolar={valorDolar.valor}
        />
        <ImpactoProductivo
          curvaImvixa={curvaImvixa}
          curvaTradicional={curvaTradicional}
          biomasaImvixa={biomasaImvixa}
          biomasaTradicional={biomasaTradicional}
        />
        <ImpactoEconomico
          costoMarginalBañosImvixa={costoMarginalBañosImvixa}
          costoMarginalBañosTradicional={costoMarginalBañosTradicional}
          costoAyunoImvixa={costoAyunoImvixa}
          costoAyunoTradicional={costoAyunoTradicional}
          costoOtrosImvixa={costoOtrosImvixa}
          costoOtrosTradicional={costoOtrosTradicional}
          costoImvixaImvixa={costoImvixaImvixa}
          costoImvixaTradicional={costoImvixaTradicional}
          costoOralesTradicional={costoOralesTradicional}
          costoOralesImvixa={costoOralesImvixa}
          costoProduccionSinAyunoImvixa={costoProduccionSinAyunoImvixa}
          costoProduccionSinAyunoTradicional={costoProduccionSinAyunoTradicional}
          tipoCambio={tipoCambio}
          valorDolar={valorDolar.valor}
        />
        <ImpactosLaborales
          numeroBañosTradicional={numeroBañosTradicional}
          numeroBañosImvixa={numeroBañosImvixa}
          curvaTradicional={curvaTradicional}
          curvaImvixa={curvaImvixa}
          curvaMortalidadAcumuladaTradicional={curvaMortalidadAcumuladaTradicional}
          curvaMortalidadAcumuladaImvixa={curvaMortalidadAcumuladaImvixa}
          biomasaTradicional={biomasaTradicional}
          biomasaImvixa={biomasaImvixa}
        />
        <ImpactoCertificacion
          numeroBañosTradicional={numeroBañosTradicional}
          numeroBañosImvixa={numeroBañosImvixa}
        />
        <ImpactoRegulacion
          mortalidadTotalTradicional={mortalidadTotalTradicional}
          mortalidadTotalImvixa={mortalidadTotalImvixa}
        />
        <Anexos
          ptiTradicional={ptiTradicional}
          ptiImvixa={ptiImvixa}
          estructuraCostos={estructuraCostos}
          costoSmolts={costoSmolts}
          costoTotalAlimentoImvixa={costoTotalAlimentoImvixa}
          costoTotalAlimentoTradicional={costoTotalAlimentoTradicional}
          costoProduccionImvixa={costoProduccionImvixa}
          costoProduccionTradicional={costoProduccionTradicional}
          tipoCambio={tipoCambio}
          valorDolar={valorDolar.valor}
        />
      </div>
      <div className="Reporte__texto_copyright">
          <p>
            Imvixa, Elanco y el logo de la barra diagonal son marcas registradas de Elanco o sus afiliadas.
          </p>
          <p>
            ©2020 Elanco PM-CL-20-0056
          </p>
      </div> 
    </>
  );
};

const mapStateToProps = state => ({
  state
})

const mapDispatchToProps = dispatch => ({
  fijarValorDolar: valor => dispatch(economicoActions.fijarValorDolar(valor))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reporte);