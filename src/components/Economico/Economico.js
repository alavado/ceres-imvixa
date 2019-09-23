import React from 'react';
import { connect } from 'react-redux'
import './Economico.css'
import economicoActions  from '../../redux/economico/actions'
import { Doughnut } from 'react-chartjs-2'

const Economico = props => {
  const { costoAlimento, costoNoAlimento, valorKiloProducido } = props.economico
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
              defaultValue={costoAlimento}
              onChange={e => props.fijarCostoAlimento(e.target.value)}
            />
            <label htmlFor="costo-no-alimento">Costo alimento por kilo producido (%)</label>
            <input
              id="costo-no-alimento"
              type="number" min="1" max ="100" step="0.1"
              defaultValue={costoNoAlimento}
              onChange={e => props.fijarCostoNoAlimento(e.target.value)}
            />
            <label htmlFor="valor-kilo-producido">Precio venta kilo producido (USD)</label>
            <input
              id="valor-kilo-producido"
              type="number" min="1" max ="10" step="0.1"
              defaultValue={valorKiloProducido}
              onChange={e => props.fijarValorKiloProducido(e.target.value)}
            />
          </div>
        </div>
      </div>        
      <div className="contenido-secundario">
        <div className="titulo-contenido-secundario">
          <h1>Proyección</h1>
        </div>
        <div className="contenido-secundario-contenido">
          <div style={{width: '640px', height: '350px'}}>
            <h1 style={{marginTop: -12, marginBottom: 16}}>Costo por kg producido</h1>
            <Doughnut
              data={{
                labels: ['Costo alimento', 'Otros costos'],
                datasets: [
                  {
                    data: [Math.round(100 * costoAlimento) / 100.0, Math.round(100 * (costoAlimento*(100-costoNoAlimento))/100) / 100.0],
                    backgroundColor: ['#4CAF50', '#78909C'],
                  }
                ]
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  economico: state.economico
})

const mapDispatchToProps = dispatch => ({
  fijarCostoAlimento: costo => dispatch(economicoActions.fijarCostoAlimento(costo)),
  fijarCostoNoAlimento: costo => dispatch(economicoActions.fijarCostoNoAlimento(costo)),
  fijarValorKiloProducido: valor => dispatch(economicoActions.fijarValorKiloProducido(valor))
})

export default connect(mapStateToProps, mapDispatchToProps)(Economico);