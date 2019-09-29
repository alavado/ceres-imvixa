import React from 'react'
import { connect } from 'react-redux'

const Ajustes = ({medicamentos}) => {
  return (
    <div className="contenido">
      <div className="barra-superior-contenido">
        <div className="titulo-contenido">
          Ajustes
        </div>
      </div>
      <h1>Fármacos</h1>
      {medicamentos.map(m => (
        <p>{m.nombre}</p>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  medicamentos: state.tratamientos.medicamentos
})

// certificacion parametro disp a pagar
export default connect(mapStateToProps)(Ajustes);