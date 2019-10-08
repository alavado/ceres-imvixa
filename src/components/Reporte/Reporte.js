import React from 'react';
import './Reporte.css'
const { ipcRenderer } = window.require('electron');

const Reporte = () => {

  const imprimirPDF = () => {
    ipcRenderer.send('imprimir')
  }

  return (
    <>
    <button onClick={() => window.history.back()}>Volver</button>
    <div id="reporte">
      <h6>ESTRUCTURA E INSUMOS REPORTE DE SALIDA MODELO DE SIMULACIÓN IMVIXA</h6>
      <h1>Indicador principal: costo ex jaula</h1>
      <ol>
        <li>
          <h2>Impacto productivo</h2>
          <div id="comparacion">
            <div>
              <h3>Terapia con Imvixa</h3>
              <div className="barrita-comparacion">0.09</div>
              <div className="barrita-comparacion">0.09</div>
              <div className="barrita-comparacion">0.09</div>
              <div className="barrita-comparacion">0.09</div>
              <div className="barrita-comparacion">0.09</div>
              <div className="barrita-comparacion">0.09</div>
              <div className="barrita-comparacion">0.09</div>
            </div>
            <div>
              <h3>costo USD/kg ex jaula</h3>
              <div className="aspecto-comparacion">Baños</div>
              <div className="aspecto-comparacion">Ayunos</div>
              <div className="aspecto-comparacion">Emamectina</div>
              <div className="aspecto-comparacion">Imvixa</div>
              <div className="aspecto-comparacion">Mortalidad incremental (1%)</div>
              <div className="aspecto-comparacion">Producción</div>
              <div className="aspecto-comparacion">Costo marginal USD/KG ex jaula</div>
            </div>
            <div>
              <h3>Terapia tradicional</h3>
              <div className="barrita-comparacion">0.09</div>
              <div className="barrita-comparacion">0.09</div>
              <div className="barrita-comparacion">0.09</div>
              <div className="barrita-comparacion">0.09</div>
              <div className="barrita-comparacion">0.09</div>
              <div className="barrita-comparacion">0.09</div>
              <div className="barrita-comparacion">0.09</div>
            </div>
          </div>
        </li>
        <li>
          <h3>Memoria cálculo</h3>
        </li>
        <li>
          <h3>Estructura costos ex jaula</h3>
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