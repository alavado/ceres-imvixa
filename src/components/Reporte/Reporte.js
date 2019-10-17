import React from 'react';
import { connect } from 'react-redux'
import './Reporte.css'
import { calcularNumeroDeBaños, calcularCantidadDeProductosVertidos } from '../../helpers/helpers'
import {JORNADAS_POR_BAÑO_POR_JAULA } from "../../helpers/constantes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import GraficoNiveles from './GraficoNiveles/';

const { ipcRenderer } = window.require('electron');

const Reporte = ({ state }) => {
  const { estructuraCostos } = state.economico
  const { medicamentos, tratamientos } = state.tratamientos
  const { numeroJaulas, mortalidad } = state.produccion

  const numeroBañosImixa = calcularNumeroDeBaños('imvixa', medicamentos, tratamientos)
  const numeroBañosTradicional = calcularNumeroDeBaños('tradicional', medicamentos, tratamientos)
  const jornadasPorBaño = JORNADAS_POR_BAÑO_POR_JAULA * numeroJaulas
  console.log(calcularCantidadDeProductosVertidos(medicamentos, tratamientos));

  const imprimirPDF = () => {
    ipcRenderer.send('imprimir')
  }

  const lenguetas = [
    {
      nombre: 'Baños',
      imvixa: 0.09,
      tradicional: 0.1
    },
    {
      nombre: 'Ayunos',
      imvixa: 0.07,
      tradicional: 0.08
    },
    {
      nombre: 'Emamectina',
      imvixa: 0,
      tradicional: 0.005
    },
    {
      nombre: 'Imvixa',
      imvixa: 0.08,
      tradicional: 0
    },
    {
      nombre: 'Mortalidad incremental (%)',
      imvixa: 0,
      tradicional: 0.03
    },
    {
      nombre: 'Producción',
      imvixa: 3.31,
      tradicional: 3.47
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
      <h6>ESTRUCTURA E INSUMOS REPORTE DE SALIDA MODELO DE SIMULACIÓN IMVIXA</h6>
      <h2>1. IMPACTO PRODUCTIVO</h2>
      <div id="comparacion">
        <div>
          <h3>TERAPIA CON IMVIXA</h3>
          {lenguetas.map((lengueta, i) => {
            const anchoLengueta = (i < 5 ? 3: 1) * (lengueta.imvixa / totalImvixa) * anchoMaximoLenguetaColoreada
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
          const anchoLengueta = (i < 5 ? 3: 1) * (lengueta.tradicional / totalTradicional) * anchoMaximoLenguetaColoreada
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
      <h3>Jornadas laborales por concepto de baños</h3>
      <table className="tabla-reporte">
        <thead>
          <tr>
              <th>Estrategia con Imvixa</th>
              <th>Estrategia tradicional</th>
          </tr>
        </thead>
        <tbody>
          <tr>
              <td> {numeroBañosImixa * jornadasPorBaño} </td>
              <td>{numeroBañosTradicional * jornadasPorBaño}</td>
          </tr>
        </tbody>
      </table>
      <h3>Cantidad de productos vertidos al mar</h3>
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
              <td>{Math.round((v.tradicional * numeroJaulas - v.imvixa * numeroJaulas) * 10) / 10} {v.unidad}</td>
            </tr> 
          ))}
        </tbody>
      </table>
      <h2>3. IMPACTOS DE CERTIFICACIÓN</h2>
      <h3>Gráfica de distancia entre óptimo ASC y posición REGULACIÓN</h3>
      <h3>Estimación beneficios incrementales por biomasa producida</h3>
      <h2>4. IMPACTOS DE REGULACIÓN</h2>
      <h3>Riesgo de disminución de siembra por regulación</h3>
      <GraficoNiveles GHeight={300} GWidth={60} height={100} width={30} max={30} value={mortalidad}></GraficoNiveles>
      <h3>Estimación beneficios incrementales por biomasa producida</h3>
      <div id="anexos">
        <h2>Anexos</h2>
        <h3>Estructura costos ex-jaula</h3>
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