import React from 'react';
import { connect } from 'react-redux'
import './Economico.css'
import economicoActions  from '../../redux/economico/actions'

const Economico = props => {
  const { datos } = props
  return (
    <>
      <div className="contenido">
        <div className="barra-superior-contenido">
          <div className="titulo-contenido">
            Parámetros económicos
          </div>
        </div>
        <div className="contenido-contenido">
          <div id="contenedor-parametros-economicos">
            <label htmlFor="costo-alimento">Costo por kilo de alimento (USD)</label>
            <input
              id="costo-alimento"
              type="number" min="1" max ="3" step="0.1"
              defaultValue={datos.costoAlimento}
            />
            <label htmlFor="costo-no-alimento">Costo alimento por kilo producido (%)</label>
            <input
              id="costo-no-alimento"
              type="number" min="1" max ="100" step="1"
              defaultValue={datos.costoNoAlimento}
            />
            <label htmlFor="valor-kilo-producido">Valor por kilo producido (USD)</label>
            <input
              id="valor-kilo-producido"
              type="number" min="2" max ="5" step="0.5"
              defaultValue={datos.valorKiloProducido}
            />
          </div>
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
  datos: state.economico
})

const mapDispatchToProps = dispatch => ({
  fijarCostoAlimento: costo => dispatch(economicoActions.fijarCostoAlimento(costo)),
  fijarCostoNoAlimento: costo => dispatch(economicoActions.fijarCostoNoAlimento(costo)),
  fijarValorKiloProducido: valor => dispatch(economicoActions.fijarValorKiloProducido(valor))
})

export default connect(mapStateToProps, mapDispatchToProps)(Economico);