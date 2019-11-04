import React from 'react';
import { redondear } from '../../../helpers/helpers';

const Anexos = ({estructuraCostos, ptiTradicional, ptiImvixa}) => {
  return (
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
  );
};

export default Anexos;