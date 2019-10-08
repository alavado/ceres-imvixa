import React from 'react'
import { connect } from 'react-redux'
import './Ajustes.css'

const Ajustes = ({medicamentos}) => {
  return (
    <div className="contenido">
      <div className="barra-superior-contenido">
        <div className="titulo-contenido">
          Ajustes
        </div>
      </div>
      <div id="contenedor-ajustes">
        <h1>Antiparasitarios</h1>
        <table id="tabla-medicamentos">
          <thead>
            <tr>
              <th>Nombre comercial</th>
              <th>Principio activo</th>
              <th>Mortalidad</th>
              <th>Efectividad</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map(m => (
              <tr>
                <td>{m.nombre}</td>
                <td>{m.principioActivo}</td>
                <td>{m.mortalidad.toLocaleString(undefined, { minimumFractionDigits: 1})}%</td>
                <td>{m.duracion} semanas</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  medicamentos: state.tratamientos.medicamentos
})

// certificacion parametro disp a pagar
export default connect(mapStateToProps)(Ajustes);