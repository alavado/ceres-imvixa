import React from 'react';
import { connect } from 'react-redux'
import './Reporte.css'
import { calcularNumeroDeBaños, calcularCostoBaños, calcularPTI, calcularCostoTratamientoOral, calcularCostoEmamectina, calcularCostoImvixa } from '../../helpers/helpers'
import { calcularMortalidadTotal } from '../../helpers/reporteVariablesProductivas'
import { obtenerCurvaCrecimientoPorPeso, obtenerCurvaMortalidadAcumulada, obtenerCurvaBiomasa, obtenerCurvaBiomasaPerdida } from '../../helpers/modelo'
import { OBJETIVO_PESO } from "../../helpers/constantes";
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

const { ipcRenderer } = window.require('electron');

const Reporte = ({ state }) => {
  const { estructuraCostos, costoSmolt, costoAlimento } = state.economico
  const { medicamentos, tratamientos } = state.tratamientos
  const { objetivos, mesesObjetivo, pesoSmolt, fechaInicio, pesoObjetivo, numeroSmolts, numeroJaulas, volumenJaula, mortalidad, eFCR, bFCR } = state.produccion
  const { macrozona, modeloMortalidad } = state.centro.barrios[state.centro.indiceBarrioSeleccionado]
  const ptiImvixa = calcularPTI(medicamentos, tratamientos['imvixa'])
  const ptiTradicional = calcularPTI(medicamentos, tratamientos['tradicional'])

  let curvaImvixa, curvaTradicional

  if (objetivos.includes(OBJETIVO_PESO)) {
    curvaImvixa = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivos, pesoObjetivo, mesesObjetivo, tratamientos.imvixa)
    curvaTradicional = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivos, pesoObjetivo, mesesObjetivo, tratamientos.tradicional)
  }
  else {
    curvaImvixa = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivos, pesoObjetivo, mesesObjetivo, tratamientos.imvixa)
    curvaTradicional = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivos, pesoObjetivo, mesesObjetivo, tratamientos.tradicional)
  }
  const numeroBañosImvixa = calcularNumeroDeBaños('imvixa', medicamentos, tratamientos, curvaImvixa)
  const numeroBañosTradicional = calcularNumeroDeBaños('tradicional', medicamentos, tratamientos, curvaTradicional)

  // Imvixa
  const curvaMortalidadAcumuladaImvixa = obtenerCurvaMortalidadAcumulada(modeloMortalidad, curvaImvixa.length, mortalidad)
  const curvaBiomasaPerdidaImvixa = obtenerCurvaBiomasaPerdida(curvaMortalidadAcumuladaImvixa, curvaImvixa, numeroSmolts, 30)
  const curvaBiomasaImvixa = obtenerCurvaBiomasa(curvaMortalidadAcumuladaImvixa, curvaImvixa, numeroSmolts, 30)
  // Tradicional
  const curvaMortalidadAcumuladaTradicional = obtenerCurvaMortalidadAcumulada(modeloMortalidad, curvaTradicional.length, mortalidad)
  const curvaBiomasaPerdidaTradicional = obtenerCurvaBiomasaPerdida(curvaMortalidadAcumuladaTradicional, curvaImvixa, numeroSmolts, 30)
  const curvaBiomasaTradicional = obtenerCurvaBiomasa(curvaMortalidadAcumuladaTradicional, curvaTradicional, numeroSmolts, 30)
  const pesoFinalTradicional = curvaTradicional.slice(-1)[0]/1000
  
  // Imvixa
  const pesoGanadoImvixa = curvaBiomasaImvixa.slice(-1)[0] - (numeroSmolts * pesoSmolt / 1000)
  const pesoMuertoImvixa = curvaBiomasaPerdidaImvixa.slice(-1)[0]
  const pesoFinalImvixa = curvaImvixa.slice(-1)[0]/1000
  const biomasaImvixa = curvaBiomasaImvixa.slice(-1)[0]
  const biomasaTradicional = curvaBiomasaTradicional.slice(-1)[0]
  
  // Costo tratamientos
  // estrategia Tradicional
  const costoBañosTradicional = calcularCostoBaños(medicamentos, tratamientos['tradicional'], numeroJaulas, volumenJaula)
  const costoMarginalBañosTradicional = costoBañosTradicional / biomasaTradicional
  const costoImvixaTradicional = calcularCostoImvixa(medicamentos, tratamientos['tradicional'], numeroSmolts, curvaMortalidadAcumuladaTradicional, curvaTradicional, bFCR) / biomasaTradicional
  const costoEmamectinaTradicional = calcularCostoTratamientoOral('Emamectina', medicamentos, tratamientos['tradicional'], numeroSmolts, curvaMortalidadAcumuladaTradicional, curvaTradicional, bFCR) / biomasaTradicional
  // estrategia Imvixa
  const costoBañosImvixa = calcularCostoBaños(medicamentos, tratamientos['imvixa'], numeroJaulas, volumenJaula)
  const costoMarginalBañosImvixa = costoBañosImvixa / biomasaImvixa
  const costoEmamectinaImvixa = calcularCostoTratamientoOral('Emamectina', medicamentos, tratamientos['imvixa'], numeroSmolts, curvaMortalidadAcumuladaImvixa, curvaImvixa, bFCR) / biomasaImvixa
  const costoImvixaImvixa = calcularCostoImvixa(medicamentos, tratamientos['imvixa'], numeroSmolts, curvaMortalidadAcumuladaImvixa, curvaImvixa, bFCR) / biomasaImvixa

  // economicos estrategia Imvixa
  const costoSmolts = numeroSmolts * costoSmolt
  const deltaPesoImvixa = pesoFinalImvixa - pesoSmolt / 1000
  const cantidadAlimentoImvixa = deltaPesoImvixa * eFCR * numeroSmolts * (1 - mortalidad / 100.0)
  const costoTotalAlimentoImvixa = costoAlimento * cantidadAlimentoImvixa
  const costoTotalImvixa = costoTotalAlimentoImvixa / (estructuraCostos.alimento / 100)
  const costosOtrosImvixa = costoBañosImvixa + costoEmamectinaImvixa + costoImvixaImvixa
  const costoProduccionDia = (costoTotalImvixa - costosOtrosImvixa - costoTotalAlimentoImvixa - costoSmolts) / curvaImvixa.length
  const costoProduccionImvixa = (costoTotalImvixa - costosOtrosImvixa - costoSmolts) / biomasaImvixa
  const costoProduccionSinAlimentoImvixa = costoProduccionImvixa - (costoTotalAlimentoImvixa / biomasaImvixa)
  const costoAyunoImvixa = (costoProduccionSinAlimentoImvixa / curvaImvixa.length) * numeroBañosImvixa * 3
  const costoProduccionSinAyunoImvixa = costoProduccionImvixa - costoAyunoImvixa + costoSmolts / biomasaImvixa
  // const costoMarginalImvixa = costoProduccionSinAyunoImvixa + costoAyunoImvixa + costoBañosImvixa + costoEmamectinaImvixa + costoImvixaImvixa
  // economicos estrategia Tradicional
  const deltaPesoTradicional = pesoFinalTradicional - pesoSmolt / 1000
  const cantidadAlimentoTradicional = deltaPesoTradicional * eFCR * numeroSmolts * (1 - mortalidad / 100.0)
  const costosOtrosTradicional = costoBañosTradicional + costoEmamectinaTradicional + costoImvixaTradicional
  const costoTotalTradicional = (costoProduccionDia * curvaTradicional.length + costosOtrosTradicional + costoSmolts) / (1 - estructuraCostos.alimento/ 100) //costoTotalAlimentoTradicional / (estructuraCostos.alimento / 100)
  const costoTotalAlimentoTradicional = costoTotalTradicional * (estructuraCostos.alimento / 100)
  const costoProduccionTradicional = (costoTotalTradicional - costosOtrosTradicional - costoSmolts) / biomasaTradicional
  const costoAyunoTradicional = (costoProduccionDia * numeroBañosTradicional * 3) / biomasaTradicional
  const costoProduccionSinAyunoTradicional = costoProduccionTradicional - costoAyunoTradicional + costoSmolts / biomasaTradicional

  const mortalidadTotalTradicional = calcularMortalidadTotal(mortalidad, numeroSmolts, numeroJaulas, curvaMortalidadAcumuladaTradicional, medicamentos, tratamientos['tradicional'])
  const mortalidadTotalImvixa = calcularMortalidadTotal(mortalidad, numeroSmolts, numeroJaulas, curvaMortalidadAcumuladaImvixa, medicamentos, tratamientos['imvixa'])

  const imprimirPDF = () => {
    ipcRenderer.send('imprimir')
  }

  return (
    <>
    <button onClick={() => window.location.href="/tratamientos"}>
      <FontAwesomeIcon icon={faChevronLeft} size="sm" style={{marginRight: 8}} />
      Calendarios de tratamientos
    </button>
    <div id="reporte">
      <EncabezadoReporte />
      <DatosSimulacion />
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
        costoEmamectinaImvixa={costoEmamectinaImvixa}
        costoEmamectinaTradicional={costoEmamectinaTradicional}
        costoImvixaImvixa={costoImvixaImvixa}
        costoImvixaTradicional={costoImvixaTradicional}
        costoProduccionSinAyunoImvixa={costoProduccionSinAyunoImvixa}
        costoProduccionSinAyunoTradicional={costoProduccionSinAyunoTradicional}
      />
      <ImpactosLaborales
        numeroBañosTradicional={numeroBañosTradicional}
        numeroBañosImvixa={numeroBañosImvixa}
        curvaTradicional={curvaTradicional}
        curvaImvixa={curvaImvixa}
      />
      <ImpactoCertificacion
        ptiTradicional={ptiTradicional}
        ptiImvixa={ptiImvixa}
      />
      <ImpactoRegulacion
        mortalidadTotalTradicional={mortalidadTotalTradicional}
        mortalidadTotalImvixa={mortalidadTotalImvixa}
      />
      <Anexos
        ptiTradicional={ptiTradicional}
        ptiImvixa={ptiImvixa}
        estructuraCostos={estructuraCostos}
      />
    </div>
    <button onClick={imprimirPDF}>Imprimir PDF</button>
    </>
  );
};

const mapStateToProps = state => ({
  state
})

export default connect(mapStateToProps)(Reporte);