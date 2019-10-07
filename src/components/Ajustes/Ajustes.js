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
              <th>Nombre</th>
              <th>Duración</th>
              <th>Mortalidad</th>
              <th>Proveedores</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map(m => (
              <tr>
                <td>{m.nombre}</td>
                <td>{m.duración}</td>
                <td>{m.mortalidad}</td>
                <td>{m.proveedores}</td>
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