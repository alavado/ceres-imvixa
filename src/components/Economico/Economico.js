import React, { useState } from 'react';
import { connect } from 'react-redux'
import './Economico.css'
import economicoActions  from '../../redux/economico/actions'
import { Doughnut } from 'react-chartjs-2'
import { OBJETIVO_PESO } from '../../helpers/constantes';
import { obtenerCurvaCrecimientoPorPeso } from '../../helpers/modelo';

const Economico = props => {
  const { costoAlimento, costoSmolt, estructuraCostos } = props.economico
  const { macrozona, produccion } = props
  const { objetivo, mesesObjetivo, pesoSmolt, fechaInicio, pesoObjetivo, mortalidad, numeroSmolts, eFCR } = produccion

  const [mostrarEstructura, setMostrarEstructura] = useState(false)

  let curvaCrecimiento
  if (objetivo === OBJETIVO_PESO) {
    curvaCrecimiento = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivo, pesoObjetivo, [])
  }
  else {
    curvaCrecimiento = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivo, mesesObjetivo, [])
  }
  const pesoFinal = curvaCrecimiento[curvaCrecimiento.length - 1] / 1000
  const biomasaCosechada = numeroSmolts * pesoFinal * (1 - mortalidad / 100.0)
  const costoSmolts = numeroSmolts * costoSmolt
  const deltaPeso = pesoFinal - pesoSmolt / 1000
  const cantidadAlimento = deltaPeso * eFCR * numeroSmolts * (1 - mortalidad / 100.0)
  const costoTotalAlimento = costoAlimento * cantidadAlimento
  const costoTotal = costoTotalAlimento / (estructuraCostos.alimento / 100)
  const costoOtros = costoTotal * (1 - (estructuraCostos.alimento / 100)) - costoSmolts

  return (
    <>
      <div id="contenido-economicos" className="contenido">
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
            {!mostrarEstructura ?
              <>
                <label htmlFor="porcentaje-alimento">Costo alimento sobre costo ex-jaula</label>
                <input
                  id="porcentaje-alimento"
                  type="number" min="1" max ="80" step="0.1"
                  defaultValue={estructuraCostos.alimento}
                  onChange={e => props.fijarPorcentajeEnEstructuraDeCostos('alimento', e.target.value)}
                /> %
                <button onClick={() => setMostrarEstructura(true)}>Estructura completa</button>
              </> :
              <>
                <h6 id="titulo-tabla-estructura-costos">Estructura de costos</h6>
                <table id="tabla-estructura-costos">
                  <tbody>
                    {Object.keys(estructuraCostos).map((elemento, i) => (
                      <tr>
                        <td>{elemento}</td>
                        <td>
                          <div>
                            <input
                              type="number"
                              step="0.5"
                              min="0"
                              max="100"
                              disabled={elemento === 'otros'}
                              value={estructuraCostos[elemento]}
                              onChange={e => props.fijarPorcentajeEnEstructuraDeCostos(elemento, e.target.value)} /> %
                          </div>
                        </td>
                      </tr> 
                    ))}
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
                    data: [
                      Math.round(100 * costoSmolts / biomasaCosechada) / 100.0, 
                      Math.round(100 * costoOtros / biomasaCosechada) / 100.0,
                      Math.round(100 * costoTotalAlimento / biomasaCosechada) / 100.0, 
                    ],        
                    backgroundColor: ['#FB6E45', '#91A7B0', '#6AB96F' ],
                  }
                ]
              }}
              options={{
                legend: {
                  position: 'bottom'
                },
              }}
            />
            :
            <Doughnut
              data={{
                labels: Object.keys(estructuraCostos).map((e, i) => e.charAt(0).toUpperCase() + e.slice(1)),
                datasets: [
                  {
                    data: Object.keys(estructuraCostos).map((elemento, i) => estructuraCostos[elemento]),        
                    backgroundColor: ['#6AB96F', '#FB6E45', '#8D6E61', '#FFED56', '#29C0E7','#7D55C7', '#26A69A', '#EF426F'],
                  }
                ]
              }}
              options={{
                legend: {
                  position: 'bottom'
                }
              }}
            />
          }
          </div>
          <div className="cuadro-economicos">
            <div className="fondo-cuadro-economicos">
              <h1>Costo alimento</h1>
              <div className="resultados-estrategia">
                <h2>xx ton</h2>
                <p>sin considerar tratamientos</p>
              </div>
            </div>
            <div className="fondo-cuadro-economicos">
              <h1>Costo alimento</h1>
              <div className="resultados-estrategia">
                <h2>xx ton</h2>
                <p>sin considerar tratamientos</p>
              </div>
            </div>
            <div className="fondo-cuadro-economicos">
              <h1>Costo alimento</h1>
              <div className="resultados-estrategia">
                <h2>xx ton</h2>
                <p>sin considerar tratamientos</p>
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
  fijarPorcentajeEnEstructuraDeCostos: (nombre, porcentaje) => dispatch(economicoActions.fijarPorcentajeEnEstructuraDeCostos(nombre, porcentaje)),
  fijarValorKiloProducido: valor => dispatch(economicoActions.fijarValorKiloProducido(valor)),
  fijarCostoSmolt: valor => dispatch(economicoActions.fijarCostoSmolt(valor))
})

export default connect(mapStateToProps, mapDispatchToProps)(Economico);