import React from 'react';
import { connect } from 'react-redux'
import './Reporte.css'
const { ipcRenderer } = window.require('electron');

const Reporte = props => {

  const { estructuraCostos } = props.economico

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
    <button onClick={() => window.history.back()}>Volver</button>
    <div id="reporte">
      <h6>ESTRUCTURA E INSUMOS REPORTE DE SALIDA MODELO DE SIMULACIÓN IMVIXA</h6>
      <h2>IMPACTO PRODUCTIVO</h2>
      <div id="comparacion">
        <div>
          <h3>TERAPIA CON IMVIXA</h3>
          {lenguetas.map(lengueta => {
            const anchoLengueta = (lengueta.imvixa / totalImvixa) * anchoMaximoLenguetaColoreada
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
        {lenguetas.map(lengueta => {
          const anchoLengueta = (lengueta.tradicional / totalTradicional) * anchoMaximoLenguetaColoreada
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
    <button onClick={imprimirPDF}>Imprimir PDF</button>
    </>
  );
};

const mapStateToProps = state => ({
  economico: state.economico,
})

export default connect(mapStateToProps)(Reporte);