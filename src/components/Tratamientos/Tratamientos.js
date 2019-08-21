import React from 'react';
import './Tratamientos.css'

const Tratamientos = () => {
  let semanas = []
  for (let i = 0; i < 24; i++) {
    semanas.push(i)
  }
  return (
    <div className="contenido">
      <div className="barra-superior-contenido">
        <div className="titulo-contenido">
          Matriz de tratamientos
        </div>
      </div>
      <div className="contenido-contenido">
        <table id="tabla-tratamientos">
          <thead>
            <tr>
              <th>Semanas</th>
              <th>Estrategia A</th>
              <th>Estrategia B</th>
            </tr>
          </thead>
          <tbody>
            {semanas.map(s => <tr><td>{`${1 + s * 4} - ${(s + 1) * 4}`}</td><td></td><td></td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tratamientos;