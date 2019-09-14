import React from 'react';
import { connect } from 'react-redux'
import './Economico.css'

const Economico = props => {
  return (
    <>
      <div className="contenido">
        <div className="barra-superior-contenido">
          <div className="titulo-contenido">
            Parámetros económicos
          </div>
        </div>
        <div className="contenido-contenido">
        </div>
      </div>        
      <div className="contenido-secundario">
        <div className="titulo-contenido-secundario">
          <h1>Proyección</h1>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Economico);