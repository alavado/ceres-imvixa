import React from 'react';
import { connect } from 'react-redux'
import './Reporte.css'
import { calcularNumeroDeBaños, calcularCantidadDeProductosVertidos,
  calcularCostoBaños, calcularPTI, calcularCostoEmamectina, calcularCostoImvixa } from '../../helpers/helpers'
import { obtenerCurvaCrecimientoPorPeso, obtenerCurvaMortalidadAcumulada,
  obtenerCurvaBiomasa, obtenerCurvaBiomasaPerdida } from '../../helpers/modelo'
import {JORNADAS_POR_BAÑO_POR_JAULA, OBJETIVO_PESO } from "../../helpers/constantes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import GraficoNiveles from './GraficoNiveles/';
import logoElanco from '../../assets/elanco.svg'

const { ipcRenderer } = window.require('electron');

const Reporte = ({ state }) => {
  const { estructuraCostos, costoSmolt, costoAlimento } = state.economico
  const { medicamentos, tratamientos } = state.tratamientos
  const { objetivo, mesesObjetivo, pesoSmolt, fechaInicio, pesoObjetivo,
    numeroSmolts, bFCR, numeroJaulas, volumenJaula, mortalidad, eFCR } = state.produccion
  const { macrozona, modeloMortalidad } = state.centro.barrios[state.centro.indiceBarrioSeleccionado]
  const numeroBañosImvixa = calcularNumeroDeBaños('imvixa', medicamentos, tratamientos)
  const numeroBañosTradicional = calcularNumeroDeBaños('tradicional', medicamentos, tratamientos)
  const jornadasPorBaño = JORNADAS_POR_BAÑO_POR_JAULA * numeroJaulas
  const ptiImvixa = calcularPTI(medicamentos, tratamientos['imvixa'])
  const ptiTradicional = calcularPTI(medicamentos, tratamientos['tradicional'])
  const costoBañosImvixa = calcularCostoBaños(medicamentos, tratamientos['imvixa'], numeroJaulas, volumenJaula)
  const costoBañosTradicional = calcularCostoBaños(medicamentos, tratamientos['tradicional'], numeroJaulas, volumenJaula)

  let curvaImvixa, curvaTradicional
  if (objetivo === OBJETIVO_PESO) {
    curvaImvixa = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivo, pesoObjetivo, tratamientos.imvixa)
    curvaTradicional = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivo, pesoObjetivo, tratamientos.tradicional)
  }
  else {
    curvaImvixa = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivo, mesesObjetivo, tratamientos.imvixa)
    curvaTradicional = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivo, mesesObjetivo, tratamientos.tradicional)
  }
  // Imvixa
  const curvaMortalidadAcumuladaImvixa = obtenerCurvaMortalidadAcumulada(modeloMortalidad, curvaImvixa.length, mortalidad)
  const curvaBiomasaPerdidaImvixa = obtenerCurvaBiomasaPerdida(curvaMortalidadAcumuladaImvixa, curvaImvixa, numeroSmolts, 30)
  const curvaBiomasaImvixa = obtenerCurvaBiomasa(curvaMortalidadAcumuladaImvixa, curvaImvixa, numeroSmolts, 30)
  // Tradicional
  const curvaMortalidadAcumuladaTradicional = obtenerCurvaMortalidadAcumulada(modeloMortalidad, curvaTradicional.length, mortalidad)
  const curvaBiomasaPerdidaTradicional = obtenerCurvaBiomasaPerdida(curvaMortalidadAcumuladaTradicional, curvaImvixa, numeroSmolts, 30)
  const curvaBiomasaTradicional = obtenerCurvaBiomasa(curvaMortalidadAcumuladaTradicional, curvaTradicional, numeroSmolts, 30)
  // Imvixa
  const pesoGanadoImvixa = curvaBiomasaImvixa.slice(-1)[0] - (numeroSmolts * pesoSmolt / 1000)
  const pesoMuertoImvixa = curvaBiomasaPerdidaImvixa.slice(-1)[0]
  
  const pesoFinalImvixa = curvaImvixa.slice(-1)[0]/1000
  const biomasaImvixa = curvaBiomasaImvixa.slice(-1)[0]
  const biomasaTradicional = curvaBiomasaTradicional.slice(-1)[0]
  const costoMarginalBañosImvixa = costoBañosImvixa / biomasaImvixa
  const costoMarginalBañosTradicional = costoBañosTradicional / biomasaTradicional
  
  // estrategia Tradicional
  const pesoFinalTradicional = curvaTradicional.slice(-1)[0]/1000
  const costoEmamectinaTradicional = calcularCostoEmamectina(medicamentos, tratamientos['tradicional'], numeroSmolts, curvaMortalidadAcumuladaTradicional) / biomasaTradicional
  const costoImvixaTradicional = calcularCostoImvixa(medicamentos, tratamientos['tradicional'], numeroSmolts, curvaMortalidadAcumuladaTradicional) / biomasaTradicional
  // estrategia Imvixa
  const costoEmamectinaImvixa = calcularCostoEmamectina(medicamentos, tratamientos['imvixa'], numeroSmolts, curvaMortalidadAcumuladaImvixa) / biomasaImvixa
  const costoImvixaImvixa = calcularCostoImvixa(medicamentos, tratamientos['imvixa'], numeroSmolts, curvaMortalidadAcumuladaImvixa) / biomasaImvixa
  
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
  console.log({costoTotalImvixa, costoTotalTradicional})
  console.log({costoProduccionDia});
  console.log({biomasaTradicional, biomasaImvixa});
  console.log({costoProduccionTradicional, costoProduccionImvixa});
  console.log(costoSmolts);


  const imprimirPDF = () => {
    ipcRenderer.send('imprimir')
  }

  const lenguetas = [
    {
      nombre: 'Baños',
      imvixa: costoMarginalBañosImvixa,
      tradicional: costoMarginalBañosTradicional
    },
    {
      nombre: 'Ayunos',
      imvixa: costoAyunoImvixa,
      tradicional: costoAyunoTradicional
    },
    {
      nombre: 'Emamectina',
      imvixa: costoEmamectinaImvixa,
      tradicional: costoEmamectinaTradicional
    },
    {
      nombre: 'Imvixa',
      imvixa: costoImvixaImvixa,
      tradicional: costoImvixaTradicional
    },
    {
      nombre: 'Producción',
      imvixa: costoProduccionSinAyunoImvixa,
      tradicional: costoProduccionSinAyunoTradicional
    }
  ]

  const anchoMaximoLengueta = 120
  const anchoMaximoLenguetaColoreada = 100
  const totalImvixa = lenguetas.reduce((sum, x) => x.imvixa + sum, 0)
  const totalTradicional = lenguetas.reduce((sum, x) => x.tradicional + sum, 0)

  return (
    <>
    <button onClick={() => window.location.href="/tratamientos"}>
      <FontAwesomeIcon icon={faChevronLeft} size="sm" style={{marginRight: 8}} />
      Calendarios de tratamientos
    </button>
    <div id="reporte">
      <img src={logoElanco} alt="logo elanco" id="logo-elanco-reporte" />
      <h6>ESTRUCTURA E INSUMOS REPORTE DE SALIDA MODELO DE SIMULACIÓN IMVIXA</h6>
      <h1>REPORTE IMPACTO IMVIXA</h1>
      <ul id="datos-empresa-reporte">
        <li>Empesa: <span>Fiordo Blanco S.A.</span></li>
        <li>Centro: <span>1029930</span></li>
        <li>Fecha: <span>17 de octubre de 2019</span></li>
      </ul>
      <h2>1. IMPACTO PRODUCTIVO</h2>
      <div id="comparacion">
        <div>
          <h3>TERAPIA CON IMVIXA</h3>
          {lenguetas.map((lengueta, i) => {
            const anchoLengueta = (i < 4 ? 3: 1) * (lengueta.imvixa / totalImvixa) * anchoMaximoLenguetaColoreada
            return (
              <div>
                <div className="lengueta" style={{
                  width: anchoLengueta,
                  marginLeft: 16 + anchoMaximoLengueta - anchoLengueta
                }}></div>
                <div className="valor">
                  {lengueta.imvixa > 0 && lengueta.imvixa.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                </div>
              </div>
            )
          })}
          <div>
            <div className="lengueta" style={{
                width: anchoMaximoLenguetaColoreada,
                marginLeft: 36
              }}></div>
            <div className="valor">
              {totalImvixa.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
        <div>
          <h3>costo USD/kg ex-jaula</h3>
          {lenguetas.map(lengueta => (
            <div>{lengueta.nombre}</div>
          ))}
          <div>Costo marginal USD/KG<br /> ex-jaula</div>
        </div>
      <div>
        <h3>TERAPIA TRADICIONAL</h3>
        {lenguetas.map((lengueta, i) => {
          const anchoLengueta = (i < 4 ? 3: 1) * (lengueta.tradicional / totalTradicional) * anchoMaximoLenguetaColoreada
          return (
            <div>
              <div className="lengueta" style={{
                width: anchoLengueta
              }}></div>
              <div className="valor">
                {lengueta.tradicional > 0 && lengueta.tradicional.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
              </div>
            </div>
          )
        })}
        <div>
          <div className="lengueta" style={{
            width: anchoMaximoLenguetaColoreada
            }}></div>
            <div className="valor">
              {totalTradicional.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>
      <h2>2. IMPACTOS LABORALES Y REPUTACIÓN DE MARCA</h2>
      <h3>2.1 Impactos laborales por ciclo</h3>
      <table className="tabla-reporte">
        <thead>
          <tr>
            <th></th>
            <th>Estrategia con Imvixa</th>
            <th>Estrategia tradicional</th>
            <th>Diferencia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Número de Baños</td>
            <td>{numeroBañosImvixa}</td>
            <td>{numeroBañosTradicional}</td>
            <td><FontAwesomeIcon icon={faArrowDown} size="m" style={{marginRight: 4, color:'green'}} />{(numeroBañosTradicional-numeroBañosImvixa)}</td>
          </tr>
          <tr>
            <td>Jornadas laborales por concepto de baños</td>
            <td>{numeroBañosImvixa * jornadasPorBaño}</td>
            <td>{numeroBañosTradicional * jornadasPorBaño}</td>
            <td><FontAwesomeIcon icon={faArrowDown} size="m" style={{marginRight: 4, color:'green'}} />{(numeroBañosTradicional-numeroBañosImvixa) * jornadasPorBaño}</td>
          </tr>
        </tbody>
      </table>
      <h3>2.2 Cantidad de productos vertidos al mar por ciclo</h3>
      <table className="tabla-reporte">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Estrategia con Imvixa</th>
            <th>Estrategia tradicional</th>
            <th>Diferencia</th>
          </tr>
        </thead>
        <tbody>
          {calcularCantidadDeProductosVertidos(medicamentos, tratamientos).map((v, i) => (
            <tr key={`vertidos-${i}`}>
              <td>{v.principioActivo}</td>
              <td>{Math.round(v.imvixa * numeroJaulas * 10) / 10} {v.unidad}/centro</td>
              <td>{Math.round(v.tradicional * numeroJaulas * 10) / 10} {v.unidad}/centro</td>
              <td> {Math.round((v.tradicional * numeroJaulas - v.imvixa * numeroJaulas) * 10) / 10 > 0 ?
              <FontAwesomeIcon icon={faArrowDown} size="m" style={{marginRight: 4, color:'green'}} /> :
              Math.round((v.tradicional * numeroJaulas - v.imvixa * numeroJaulas) * 10) / 10 === 0 ?
              '':<FontAwesomeIcon icon={faArrowUp} size="m" style={{marginRight: 4, color:'red'}} />
              } 
              {Math.round(Math.abs(v.tradicional * numeroJaulas - v.imvixa * numeroJaulas) * 10) / 10} {v.unidad}</td>
            </tr> 
          ))}
        </tbody>
      </table>
      <h2>3. IMPACTOS DE CERTIFICACIÓN</h2>
      <h3>3.1 Gráfica de distancia entre óptimo ASC y posición REGULACIÓN</h3>
      <h3>3.2 Estimación beneficios incrementales por biomasa producida</h3>
      <h2>4. IMPACTOS DE REGULACIÓN</h2>
      <h3>4.1 Riesgo de disminución de siembra por clasificación de bioseguridad</h3>
      <GraficoNiveles
        mortalidades={{
          imvixa: mortalidad,
          tradicional: mortalidad + .31
        }}
      />
      <h3>4.2 Estimación beneficios incrementales por biomasa producida</h3>
      <div id="anexos">
        <h2>Anexos</h2>
        <h3>Tratamientos estrategia Imvixa e índice de tratamiento antiparasitario (PTI)</h3>
        <table className="tabla-reporte">
          <thead>
          <tr>
            <th>Tratamiento</th>
            <th>Semana</th>
            <th>Principio activo</th>
            <th>Factor fármaco</th>
            <th>Factor método</th>
            <th>Factor resistencia</th>
            <th>PTI</th>
          </tr>
        </thead>
        <tbody>
          {ptiImvixa.trataciones.map((elemento, i) => (
          <tr>
            <td>{elemento.i}</td>
            <td>{elemento.semana === '0' ? 'Antes de mar' : elemento.semana}</td>
            <td>{elemento.principioActivo}</td>
            <td>{elemento.factorFarmaco}</td>
            <td>{elemento.factorMetodo}</td>
            <td>{elemento.factorResistencia}</td>
            <td>{elemento.pTI}</td>
          </tr>
          ))}
          <tr>
            <td></td><td></td><td></td><td></td><td></td>
            <td>PTI total </td>
            <td>{ptiImvixa.suma}</td>
          </tr>
        </tbody>
      </table>
      <h3>Tratamientos estrategia Tradicional e índice de tratamiento antiparasitario (PTI)</h3>
        <table className="tabla-reporte">
          <thead>
          <tr>
            <th>Tratamiento</th>
            <th>Semana</th>
            <th>Principio activo</th>
            <th>Factor fármaco</th>
            <th>Factor método</th>
            <th>Factor resistencia</th>
            <th>PTI</th>
          </tr>
        </thead>
        <tbody>
          {ptiTradicional.trataciones.map((elemento, i) => (
          <tr>
            <td>{elemento.i}</td>
            <td>{elemento.semana === '0' ? 'Antes de mar' : elemento.semana}</td>
            <td>{elemento.principioActivo}</td>
            <td>{elemento.factorFarmaco}</td>
            <td>{elemento.factorMetodo}</td>
            <td>{elemento.factorResistencia}</td>
            <td>{elemento.pTI}</td>
          </tr>
          ))}
          <tr>
            <td></td><td></td><td></td><td></td><td></td>
            <td>PTI total </td>
            <td>{ptiTradicional.suma}</td>
          </tr>
        </tbody>
      </table>
        <h3>Estructura costos ex-jaula por centro</h3>
        <table id="reporte-estructura-costos">
          <thead>
            <tr>
              <th>ÍTEM</th>
              <th>PARTICIPACIÓN</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(estructuraCostos).map((elemento, i) => (
              <tr>
                <td>{elemento}</td>
                <td>
                  <div>
                      {estructuraCostos[elemento].toLocaleString(undefined, { maximumFractionDigits: 1, minimumFractionDigits: 1 })}%
                  </div>
                </td>
              </tr> 
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <button onClick={imprimirPDF}>Imprimir PDF</button>
    </>
  );
};

const mapStateToProps = state => ({
  state
})

export default connect(mapStateToProps)(Reporte);