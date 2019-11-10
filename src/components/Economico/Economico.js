import React, { useState } from 'react';
import { connect } from 'react-redux'
import './Economico.css'
import economicoActions  from '../../redux/economico/actions'
import { Doughnut } from 'react-chartjs-2'
import { obtenerCurvaCrecimientoPorPeso } from '../../helpers/modelo';
import CampoNumerico from '../Produccion/CampoNumerico'
import { redondear } from '../../helpers/helpers';

const Economico = props => {
  const { costoAlimento, costoSmolt, estructuraCostos } = props.economico
  const { macrozona, produccion } = props
  const { objetivos, mesesObjetivo, pesoSmolt, fechaInicio, pesoObjetivo, mortalidad, numeroSmolts, eFCR, factorCrecimiento } = produccion

  const [mostrarEstructura, setMostrarEstructura] = useState(false)

  const curvaCrecimiento = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivos, pesoObjetivo, mesesObjetivo, [], factorCrecimiento)

  const pesoFinal = curvaCrecimiento[curvaCrecimiento.length - 1] / 1000
  const biomasaCosechada = numeroSmolts * pesoFinal * (1 - mortalidad / 100.0)
  const costoSmolts = numeroSmolts * costoSmolt
  const deltaPeso = pesoFinal - pesoSmolt / 1000
  const cantidadAlimento = deltaPeso * eFCR * numeroSmolts * (1 - mortalidad / 100.0)
  const costoTotalAlimento = costoAlimento * cantidadAlimento
  const costoTotal = costoTotalAlimento / (estructuraCostos.alimento / 100)
  const porcentajeSmolts = costoSmolts / costoTotal * 100
  const costoOtros = costoTotal * (1 - (estructuraCostos.alimento / 100)) - costoSmolts

  const costoProporcionalSmolt = Math.round(100 * costoSmolts / biomasaCosechada) / 100.0
  const costoProporcionalAlimento = Math.round(100 * costoTotalAlimento / biomasaCosechada) / 100.0
  const otrosCostos = Math.round(100 * costoOtros / biomasaCosechada) / 100.0
  const costoProporcionalTotal = (costoProporcionalSmolt + costoProporcionalAlimento + otrosCostos).toLocaleString(undefined, { maximumFractionDigits: 2})

  console.log({cantidadAlimento}, {costoTotalAlimento}, {costoSmolts});

  return (
    <>
      <div id="contenido-economicos" className="contenido">
        <div className="barra-superior-contenido">
          <div className="titulo-contenido">
            Costos
          </div>
        </div>
        <div className="contenido-contenido">
          <div id="contenedor-parametros-economicos">
          <label htmlFor="costo-smolt">Costo smolt</label>
          <CampoNumerico
            id="costo-smolts"
            style={{ width: 78 }}
            suffix={' USD'}
            value={costoSmolt}
            onValueChange={e => props.fijarCostoSmolt(e.floatValue)} />
          <label htmlFor="costo-alimento">Costo por kilo de alimento</label>
          <CampoNumerico
            id="costo-alimento"
            style={{ width: 78 }}
            suffix={' USD'}
            value={costoAlimento}
            onValueChange={e => props.fijarCostoAlimento(e.floatValue)} />
            <label htmlFor="porcentaje-alimento">Costo alimento sobre costo ex-jaula</label>
          <CampoNumerico
            id="porcentaje-alimento"
            style={{ width: 78 }}
            suffix={' %'}
            value={estructuraCostos.alimento}
            onValueChange={e => props.fijarPorcentajeEnEstructuraDeCostos('alimento', e.floatValue)} />
          {!mostrarEstructura && <button onClick={() => setMostrarEstructura(true)}>Estructura completa</button>}
          {mostrarEstructura &&
            <>
              <h6 id="titulo-tabla-estructura-costos">Otros costos</h6>
              <table id="tabla-estructura-costos">
                <tbody>
                  {Object.keys(estructuraCostos).map((elemento, i) => {
                    return elemento !== 'alimento' &&
                      <tr key={`costo-estructura-${i}`}>
                        <td>{elemento}</td>
                        <td>
                          <div>
                            <CampoNumerico
                              style={{width: 78 }}
                              suffix={' %'}
                              disabled={elemento === 'otros' || elemento === 'smolts'}
                              value={elemento === 'smolts' ? porcentajeSmolts : estructuraCostos[elemento]}
                              decimalScale={1}
                              onValueChange={e => props.fijarPorcentajeEnEstructuraDeCostos(elemento, e.floatValue)} />
                          </div>
                        </td>
                      </tr>
                  })}
                </tbody>
              </table>
              <button onClick={() => setMostrarEstructura(false)}>Solo valor alimento</button>
            </>
          }
          </div>
        </div>
      </div>        
      <div className="contenido-secundario">
        <div className="titulo-contenido-secundario">
          <h1>Distribución de costos ex jaula por kilo producido</h1>
        </div>
        <div className="contenido-secundario-contenido">
          <div style={{width: '640px', height: '350px'}}>
          {!mostrarEstructura ?
            <Doughnut
              data={{
                labels: ['Costo smolt', 'Otros costos','Costo alimento', ],
                datasets: [
                  {
                    data: [costoProporcionalSmolt, otrosCostos, costoProporcionalAlimento],        
                    backgroundColor: ['#FB6E45', '#91A7B0', '#6AB96F' ],
                  }
                ]
              }}
              options={{
                legend: {
                  position: 'bottom'
                },
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem, data) {
                      console.log({tooltipItem});
                      var label = data.datasets[0].data[tooltipItem.index] || '';
                      label += ' USD'
                      return label;
                    },
                  }
                }
              }}
            />
            :
            <Doughnut
              data={{
                labels: Object.keys(estructuraCostos).map((e, i) => e.charAt(0).toUpperCase() + e.slice(1)),
                datasets: [
                  {
                    data: Object.keys(estructuraCostos).map((elemento, i) => {
                      if (elemento === 'smolts'){
                        return redondear(porcentajeSmolts, 1)
                      }
                      return redondear(estructuraCostos[elemento], 1)
                    }),        
                    backgroundColor: ['#6AB96F', '#FB6E45', '#8D6E61', '#FFED56', '#29C0E7','#7D55C7', '#26A69A', '#EF426F'],
                  }
                ]
              }}
              options={{
                legend: {
                  position: 'bottom'
                },
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem, data) {
                      var label = data.datasets[0].data[tooltipItem.index] || '';
                      label += ' %'
                      return label;
                    },
                  }
                }
              }}
            />
          }
          </div>
          <div className="cuadro-economicos">
            <div className="fondo-cuadro-economicos">
              <h1>Costo ex-jaula/kg producido</h1>
              <div className="resultados-estrategia">
                <h2>{costoProporcionalTotal} USD</h2>
                <p>estimado sin considerar tratamientos</p>
              </div>
            </div>
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
  fijarPorcentajeEnEstructuraDeCostos: (nombre, porcentaje) => dispatch(economicoActions.fijarPorcentajeEnEstructuraDeCostos(nombre, Math.min(100, porcentaje))),
  fijarValorKiloProducido: valor => dispatch(economicoActions.fijarValorKiloProducido(valor)),
  fijarCostoSmolt: valor => dispatch(economicoActions.fijarCostoSmolt(valor))
})

export default connect(mapStateToProps, mapDispatchToProps)(Economico);