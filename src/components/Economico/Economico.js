import React from 'react';
import { connect } from 'react-redux'
import './Economico.css'
import economicoActions  from '../../redux/economico/actions'
import { Doughnut } from 'react-chartjs-2'
import { OBJETIVO_PESO } from '../../helpers/constantes';
import { obtenerCurvaCrecimientoPorPeso } from '../../helpers/modelo';

const Economico = props => {
  const { costoAlimento, costoSmolt, porcentajeAlimento, valorKiloProducido } = props.economico
  const { macrozona, produccion, modelo } = props
  const { objetivo, fechaObjetivo, pesoSmolt, fechaInicio, pesoObjetivo, mortalidad, numeroSmolts, eFCR } = produccion

  let curvaCrecimiento
  if (objetivo === OBJETIVO_PESO) {
    curvaCrecimiento = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivo, pesoObjetivo, [])
  }
  else {
    curvaCrecimiento = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivo, fechaObjetivo, [])
  }
  const pesoFinal = curvaCrecimiento[curvaCrecimiento.length - 1] / 1000
  const biomasaCosechada = numeroSmolts * pesoFinal * (1 - mortalidad / 100.0)
  const costoSmolts = numeroSmolts * costoSmolt
  const deltaPeso = pesoFinal - pesoSmolt / 1000
  const cantidadAlimento = deltaPeso * eFCR * numeroSmolts * (1 - mortalidad / 100.0)
  const costoTotalAlimento = costoAlimento * cantidadAlimento
  const costoTotal = costoTotalAlimento / (porcentajeAlimento / 100)
  const costoOtros = costoTotal * (1 - (porcentajeAlimento / 100)) - costoSmolts
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
          <label htmlFor="costo-alimento">Costo smolt</label>
            <input
              id="costo-smolt"
              type="number" min="1" max ="3" step="0.01"
              defaultValue={costoSmolt}
              onChange={e => props.fijarCostoSmolt(e.target.value)}
            /> USD
            <label htmlFor="costo-alimento">Costo por kilo de alimento</label>
            <input
              id="costo-alimento"
              type="number" min="1" max ="3" step="0.01"
              defaultValue={costoAlimento}
              onChange={e => props.fijarCostoAlimento(e.target.value)}
            /> USD
            <label htmlFor="porcentaje-alimento">Porcentaje costo alimento sobre costo ex-jaula</label>
            <input
              id="porcentaje-alimento"
              type="number" min="1" max ="80" step="0.1"
              defaultValue={porcentajeAlimento}
              onChange={e => props.fijarPorcentajeAlimento(e.target.value)}
            /> %
            <label htmlFor="valor-kilo-producido">Precio venta kilo producido</label>
            <input
              id="valor-kilo-producido"
              type="number" min="1" max ="10" step="0.1"
              defaultValue={valorKiloProducido}
              onChange={e => props.fijarValorKiloProducido(e.target.value)}
            /> USD
          </div>
        </div>
      </div>        
      <div className="contenido-secundario">
        <div className="titulo-contenido-secundario">
          <h1>Distribución de costos ex jaula por kilo producido</h1>
        </div>
        <div className="contenido-secundario-contenido">
          <div style={{width: '640px', height: '350px'}}>
            <Doughnut
              data={{
                labels: ['Costo smolt', 'Otros costos','Costo alimento', ],
                datasets: [
                  {
                    data: [
                      Math.round(100 * costoSmolts / biomasaCosechada) / 100.0, 
                      Math.round(100 * costoOtros / biomasaCosechada) / 100.0,
                      Math.round(100 * costoTotalAlimento / biomasaCosechada) / 100.0, 
                    ],        
                    backgroundColor: ['#FF7043', '#90A4AE', '#4CAF50' ],
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
  economico: state.economico,
  produccion: state.produccion,
  macrozona: state.centro.barrios[state.centro.indiceBarrioSeleccionado].macrozona
})

const mapDispatchToProps = dispatch => ({
  fijarCostoAlimento: costo => dispatch(economicoActions.fijarCostoAlimento(costo)),
  fijarPorcentajeAlimento: valor => dispatch(economicoActions.fijarPorcentajeAlimento(valor)),
  fijarValorKiloProducido: valor => dispatch(economicoActions.fijarValorKiloProducido(valor)),
  fijarCostoSmolt: valor => dispatch(economicoActions.fijarCostoSmolt(valor))
})

export default connect(mapStateToProps, mapDispatchToProps)(Economico);