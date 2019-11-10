import React from 'react';
import { connect } from 'react-redux'
import './Reporte.css'
import { calcularNumeroDeBaños, calcularCostoBaños, calcularPTI, calcularCostoTratamientoOral, calcularCostoImvixa } from '../../helpers/helpers'
import { calcularMortalidadTotal } from '../../helpers/reporteVariablesProductivas'
import { obtenerCurvaCrecimientoPorPeso, obtenerCurvaMortalidadAcumulada } from '../../helpers/modelo'
import { DIAS_AYUNO_BAÑO } from "../../helpers/constantes";
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
  const { objetivos, mesesObjetivo, pesoSmolt, fechaInicio, pesoObjetivo, numeroSmolts, numeroJaulas, volumenJaula, mortalidad, eFCR, bFCR, factorCrecimiento } = state.produccion
  const { macrozona, modeloMortalidad } = state.centro.barrios[state.centro.indiceBarrioSeleccionado]
  // PTI
  const ptiImvixa = calcularPTI(medicamentos, tratamientos['imvixa'])
  const ptiTradicional = calcularPTI(medicamentos, tratamientos['tradicional'])

  // Curvas de crecimiento
  const curvaSinTratamientos = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivos, pesoObjetivo, mesesObjetivo, [], factorCrecimiento)
  const curvaImvixa = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivos, pesoObjetivo, mesesObjetivo, tratamientos.imvixa, factorCrecimiento)
  const curvaTradicional = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivos, pesoObjetivo, mesesObjetivo, tratamientos.tradicional, factorCrecimiento)

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
  console.log({curvaImvixa, curvaTradicional,curvaMortalidadAcumuladaImvixa, curvaMortalidadAcumuladaTradicional });
  
  // Biomasa total cosechada
  const biomasaImvixa = numeroSmolts * (1 - mortalidadTotalImvixa / 100.0) * pesoFinalImvixa
  const biomasaTradicional = numeroSmolts * (1 - mortalidadTotalTradicional / 100.0) * pesoFinalTradicional
  console.log({mortalidadTotalImvixa,mortalidadTotalTradicional, pesoFinalImvixa,pesoFinalTradicional, biomasaImvixa, biomasaTradicional});
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
  const costoEmamectinaTradicional = calcularCostoTratamientoOral('Emamectina', medicamentos, tratamientos['tradicional'], numeroSmolts, curvaMortalidadAcumuladaTradicional, curvaTradicional, bFCR) / biomasaTradicional
  // estrategia Imvixa
  const costoBañosImvixa = calcularCostoBaños(medicamentos, tratamientos['imvixa'], numeroJaulas, volumenJaula)
  const costoMarginalBañosImvixa = costoBañosImvixa / biomasaImvixa
  const costoEmamectinaImvixa = calcularCostoTratamientoOral('Emamectina', medicamentos, tratamientos['imvixa'], numeroSmolts, curvaMortalidadAcumuladaImvixa, curvaImvixa, bFCR) / biomasaImvixa
  const costoImvixaImvixa = calcularCostoImvixa(medicamentos, tratamientos['imvixa'], numeroSmolts, curvaMortalidadAcumuladaImvixa, curvaImvixa, bFCR) / biomasaImvixa

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

  return (
    <>
    <button onClick={() => window.history.back()}>
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
        costoSmolts={costoSmolts}
        costoTotalAlimentoImvixa={costoTotalAlimentoImvixa}
        costoTotalAlimentoTradicional={costoTotalAlimentoTradicional}
        costoProduccionImvixa={costoProduccionImvixa}
        costoProduccionTradicional={costoProduccionTradicional}
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