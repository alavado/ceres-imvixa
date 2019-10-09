import React from 'react';
import './Reporte.css'
const { ipcRenderer } = window.require('electron');

const Reporte = () => {

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
      <h1>Indicador principal: costo ex-jaula</h1>
      <ol>
        <li>
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
                      {lengueta.imvixa > 0 && lengueta.imvixa.toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
                  {totalImvixa.toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
                      {lengueta.tradicional > 0 && lengueta.tradicional.toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
        </li>
        <li>
          <h3>Memoria cálculo</h3>
        </li>
        <li>
          <h3>Estructura costos ex-jaula</h3>
          <table>
            <thead>
              <tr>
                <th>Ítem</th>
                <th>Participación</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alimentación</td>
                <td>57,0%</td>
              </tr>
              <tr>
                <td>Smolt</td>
                <td>13,0%</td>
              </tr>
            </tbody>
          </table>
        </li>
      </ol>
    </div>
      <button onClick={imprimirPDF}>Imprimir PDF</button>
    </>
  );
};

export default Reporte;