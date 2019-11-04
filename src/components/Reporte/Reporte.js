import React from 'react';
import { connect } from 'react-redux'
import './Reporte.css'
import { calcularNumeroDeBaños, calcularCantidadDeProductosVertidos,
  calcularCostoBaños, calcularPTI, calcularCostoEmamectina, calcularCostoImvixa, obtenerFechaActualBonita, redondear } from '../../helpers/helpers'
import { calcularMortalidadTotal } from '../../helpers/reporteVariablesProductivas'
import { obtenerCurvaCrecimientoPorPeso, obtenerCurvaMortalidadAcumulada,
  obtenerCurvaBiomasa, obtenerCurvaBiomasaPerdida } from '../../helpers/modelo'
import {JORNADAS_POR_BAÑO_POR_JAULA, OBJETIVO_PESO } from "../../helpers/constantes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import GraficoNiveles from './GraficoNiveles/';
import logoElanco from '../../assets/elanco.svg'
import GraficoPTI from './GraficoPTI';

const { ipcRenderer } = window.require('electron');

const Reporte = ({ state }) => {
  const { estructuraCostos, costoSmolt, costoAlimento } = state.economico
  const { medicamentos, tratamientos } = state.tratamientos
  const { objetivos, mesesObjetivo, pesoSmolt, fechaInicio, pesoObjetivo,
    numeroSmolts, bFCR, numeroJaulas, volumenJaula, mortalidad, eFCR } = state.produccion
  const { macrozona, modeloMortalidad } = state.centro.barrios[state.centro.indiceBarrioSeleccionado]
  const jornadasPorBaño = JORNADAS_POR_BAÑO_POR_JAULA * numeroJaulas
  const ptiImvixa = calcularPTI(medicamentos, tratamientos['imvixa'])
  const ptiTradicional = calcularPTI(medicamentos, tratamientos['tradicional'])
  const costoBañosImvixa = calcularCostoBaños(medicamentos, tratamientos['imvixa'], numeroJaulas, volumenJaula)
  const costoBañosTradicional = calcularCostoBaños(medicamentos, tratamientos['tradicional'], numeroJaulas, volumenJaula)

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
  console.log({curvaMortalidadAcumuladaImvixa});

  const mortalidadTotalTradicional = calcularMortalidadTotal(mortalidad, numeroSmolts, numeroJaulas, curvaMortalidadAcumuladaTradicional, medicamentos, tratamientos['tradicional'])
  const mortalidadTotalImvixa = calcularMortalidadTotal(mortalidad, numeroSmolts, numeroJaulas, curvaMortalidadAcumuladaImvixa, medicamentos, tratamientos['imvixa'])

  const iconoImpactoLaboral = (diferencia) => {
    let icono = redondear(diferencia)
    if (diferencia > 0){
      icono = <><FontAwesomeIcon icon={faArrowDown} style={{marginRight: 4, color:'green'}} /> {redondear(diferencia)}</>
    }
    if (diferencia < 0){
      icono = <><FontAwesomeIcon icon={faArrowUp} style={{marginRight: 4, color:'red'}} />{redondear(Math.abs(diferencia))}</>
    }
    return icono
  }
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

  const { nombreCentro, titular } = state.centro
  const codigoCentro = state.centro.barrios[state.centro.indiceBarrioSeleccionado].centros[state.centro.indiceCentroSeleccionado].codigo

  const obtenerTratamientosEnCiclo = (tratamientos, curvaCrecimiento) => {
    const semanasCiclo = curvaCrecimiento.length / 7
    return Object.keys(tratamientos).reduce((obj, s) => {
      if (s >  semanasCiclo){
        return obj
      }
      return {
        ...obj,
        [s]: tratamientos[s]
      }
    }, {})
  }

  const obtenerTratamientosEnCiclos = (tratamientos, curvaTradicional, curvaImvixa) =>{
    return {
      'imvixa': obtenerTratamientosEnCiclo(tratamientos['imvixa'], curvaImvixa),
      'tradicional': obtenerTratamientosEnCiclo(tratamientos['tradicional'], curvaTradicional)
    }
  }

  return (
    <>
    <button onClick={() => window.location.href="/tratamientos"}>
      <FontAwesomeIcon icon={faChevronLeft} size="sm" style={{marginRight: 8}} />
      Calendarios de tratamientos
    </button>
    <div id="reporte">
      <img src={logoElanco} alt="logo elanco" id="logo-elanco-reporte" />
      <div id="encabezado-reporte">
        <h6>ESTRUCTURA E INSUMOS REPORTE DE SALIDA MODELO DE SIMULACIÓN IMVIXA</h6>
        <h1>REPORTE IMPACTO ELANCO</h1>
        <ul id="datos-empresa-reporte">
          <li>Empesa: <span>{titular}</span></li>
          <li>Centro: <span>{(nombreCentro !== '' ? `${nombreCentro} (código: ${codigoCentro})` : codigoCentro)}</span></li>
          <li>Fecha: <span>{obtenerFechaActualBonita()}</span></li>
        </ul>
      </div>
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
      <div id="contenido-resumen-reporte">
      <h2>1. IMPACTO PRODUCTIVO</h2>
      <div id="cuadros-reporte-estrategias">
        <div id="fondo-reporte-estrategia-b">
          <h1>Estrategia 1</h1>
          <div className="resultados-reporte-estrategia">
            {objetivos.includes(OBJETIVO_PESO) ?
              <>
                <h2>{redondear(curvaTradicional.length / 30.0)}</h2>
                <p>meses para alcanzar el peso de cosecha</p>
                <h2>{redondear(biomasaTradicional / 1000, 0)}</h2>
                <p>Ton</p>
              </> :
              <>
                <h2>{redondear(curvaTradicional[curvaTradicional.length - 1] / 1000.0, 2)}</h2>
                <p>kg a la cosecha</p>
              </> // falta la biomasa cosechada en toneladas en cada cuadrito y la tercera columna el diferencial
            }
          </div>
        </div>
        <div id="fondo-reporte-estrategia-a">
          <h1>Estrategia 2</h1>
          <div className="resultados-reporte-estrategia">
            {objetivos.includes(OBJETIVO_PESO) ?
              <>
                <h2>{redondear(curvaImvixa.length / 30.0)}</h2>
                <p>meses para alcanzar el peso de cosecha</p>
                <h2>{redondear(biomasaImvixa / 1000, 0)}</h2>
                <p>Ton</p>
              </> :
              <>
                <h2>{redondear(curvaImvixa[curvaImvixa.length - 1] / 1000.0, 2)}</h2>
                <p>kg a la cosecha</p>
              </>
            }
          </div>
        </div>
      </div>
      </div>
      <h2>2. IMPACTO ECONÓMICO</h2>
      <div id="comparacion">
        <div>
          <h3>ESTRATEGIA 1</h3>
          {lenguetas.map((lengueta, i) => {
            const anchoLengueta = (i < 4 ? 3: 1) * (lengueta.tradicional / totalTradicional) * anchoMaximoLenguetaColoreada
            return (
              <div key={`lengueta-tradicional-${i}`}>
                <div className="lengueta" style={{
                  width: anchoLengueta,
                  marginLeft: 16 + anchoMaximoLengueta - anchoLengueta
                }}></div>
                <div className="valor">
                  {lengueta.tradicional > 0 && redondear(lengueta.tradicional, 2)}
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
              {redondear(totalTradicional, 2)}
            </div>
          </div>
        </div>
        <div>
          <h3>costo USD/kg ex-jaula</h3>
          {lenguetas.map((lengueta, i) => (
            <div key={`lengueta-central-${i}`}>
              {lengueta.nombre}
            </div>
          ))}
          <div>Costo marginal USD/KG<br /> ex-jaula</div>
        </div>
      <div>
        <h3>ESTRATEGIA 2</h3>
        {lenguetas.map((lengueta, i) => {
          const anchoLengueta = (i < 4 ? 3: 1) * (lengueta.imvixa / totalImvixa) * anchoMaximoLenguetaColoreada
          return (
            <div key={`lengueta-tradiconal-${i}`}>
              <div className="lengueta" style={{
                width: anchoLengueta
              }}></div>
              <div className="valor">
                {lengueta.imvixa > 0 && redondear(lengueta.imvixa, 2)}
              </div>
            </div>
          )
        })}
        <div>
          <div className="lengueta" style={{
            width: anchoMaximoLenguetaColoreada
            }}></div>
            <div className="valor">
              {redondear(totalImvixa, 2)}
            </div>
          </div>
        </div>
      </div>
      <h2>3. IMPACTOS LABORALES Y REPUTACIÓN DE MARCA</h2>
      <h3>3.1 Impactos laborales por ciclo</h3>
      <table className="tabla-reporte">
        <thead>
          <tr>
            <th></th>
            <th>Estrategia 1</th>
            <th>Estrategia 2</th>
            <th>Diferencia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Número de Baños</td>
            <td>{numeroBañosTradicional}</td>
            <td>{numeroBañosImvixa}</td>
            <td>{iconoImpactoLaboral(numeroBañosTradicional-numeroBañosImvixa)}</td>
          </tr>
          <tr>
            <td>Jornadas laborales por concepto de baños</td>
            <td>{numeroBañosTradicional * jornadasPorBaño}</td>
            <td>{numeroBañosImvixa * jornadasPorBaño}</td>
            <td>{iconoImpactoLaboral((numeroBañosTradicional-numeroBañosImvixa) * jornadasPorBaño)}</td>
          </tr>
        </tbody>
      </table>
      <h3>3.2 Cantidad de productos vertidos al mar por ciclo</h3>
      <table className="tabla-reporte">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Estrategia 1</th>
            <th>Estrategia 2</th>
            <th>Diferencia</th>
          </tr>
        </thead>
        <tbody>
          {calcularCantidadDeProductosVertidos(medicamentos, obtenerTratamientosEnCiclos(tratamientos, curvaTradicional, curvaImvixa)).map((v, i) => {
            let icono = ''
            const diferencia = v.tradicional * numeroJaulas - v.imvixa * numeroJaulas
            if (diferencia > 0) {
              icono = <FontAwesomeIcon icon={faArrowDown} style={{ marginRight: 4, color: 'green' }} />
            }
            else if (diferencia < 0) {
              icono = <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: 4, color: 'red' }} />
            }
            return (<tr key={`vertidos-${i}`}>
              <td>{v.principioActivo}</td>
              <td>{redondear(v.tradicional * numeroJaulas)} {v.unidad}/centro</td>
              <td>{redondear(v.imvixa * numeroJaulas)} {v.unidad}/centro</td>
              <td>{icono} {redondear(Math.abs(diferencia))} {v.unidad}</td>
            </tr>)
          })}
        </tbody>
      </table>
      <h2>4. IMPACTOS DE CERTIFICACIÓN</h2>
      <h3>4.1 Distancia entre óptimo ASC y posición REGULACIÓN</h3>
      <table className="tabla-reporte">
        <thead>
          <tr>
            <th></th>
            <th>Estrategia 1</th>
            <th>Estrategia 2</th>
            <th>Certificación ASC</th>
            <th>Distancia a certificación estrategia 1</th>
            <th>Distancia a certificación estrategia 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Indíce de tratamiento antiparasitario (PTI)</td>
            <td>{redondear(ptiTradicional.suma)}</td>
            <td>{redondear(ptiImvixa.suma)}</td>
            <td>{13.0}</td>
            <td>{redondear(ptiTradicional.suma - 13)}</td>
            <td>{redondear(ptiImvixa.suma - 13)}</td>
          </tr>
        </tbody>
      </table>
      <GraficoPTI
        ptiImvixa={ptiImvixa.suma}
        ptiTradicional={ptiTradicional.suma}
      />
      <h2>5. IMPACTOS DE REGULACIÓN</h2>
      <h3>5.1 Riesgo de disminución de siembra por clasificación de bioseguridad</h3>
      <GraficoNiveles
        mortalidades={{
          imvixa: mortalidadTotalImvixa,
          tradicional: mortalidadTotalTradicional
        }}
      />
      <div id="anexos">
        <h2>Anexos</h2>
        <h3>Detalle de estrategias antiparasitarias</h3>
        <div id="tratamientos-resumen">
          <div className="estrategia-resumen">
            <h3>Tratamientos estrategia 1</h3>
            <table className="tabla-reporte">
              <thead>
                <tr>
                  <th>Semana</th>
                  <th>Principio activo</th>
                </tr>
              </thead>
              <tbody>
                {ptiTradicional.trataciones.map((elemento, i) => (
                <tr key={`fila-pti-tradicional-${i}`}>
                  <td>{elemento.semana === '0' ? 'Antes de mar' : elemento.semana}</td>
                  <td>{elemento.principioActivo}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="estrategia-resumen">
            <h3>Tratamientos estrategia 2</h3>
            <table className="tabla-reporte">
              <thead>
                <tr>
                  <th>Semana</th>
                  <th>Principio activo</th>
                </tr>
              </thead>
              <tbody>
                {ptiImvixa.trataciones.map((elemento, i) => (
                  <tr key={`fila-pti-imvixa-${i}`}>
                    <td>{elemento.semana === '0' ? 'Antes de mar' : elemento.semana}</td>
                    <td>{elemento.principioActivo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
              <tr key={`fila-estructura-costos-anexos-${i}`}>
                <td>{elemento}</td>
                <td>
                  <div>
                      {redondear(estructuraCostos[elemento])}%
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