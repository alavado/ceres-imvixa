import React, { useState } from 'react';
import { connect } from 'react-redux'
import produccionActions from '../../redux/produccion/actions'
import { obtenerCurvaMortalidadAcumulada, obtenerCurvaCrecimientoPorPeso, obtenerCurvaBiomasa, obtenerCurvaBiomasaPerdida } from '../../helpers/modelo'
import { Bar } from 'react-chartjs-2'
import './Produccion.css'
import { OBJETIVO_PESO, OBJETIVO_FECHA } from '../../helpers/constantes';
import CalculadoraVolumen from './CalculadoraVolumen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import CampoNumerico from './CampoNumerico'

const Produccion = props => {

  const { produccion, macrozona } = props
  const { objetivos, mesesObjetivo, pesoSmolt, fechaInicio, pesoObjetivo, bFCR, numeroSmolts, numeroJaulas, factorCrecimiento } = produccion
  const [mostrandoCalculadoraVolumen, setMostrandoCalculadoraVolumen] = useState(false)

  const curvaCrecimiento = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivos, pesoObjetivo, mesesObjetivo, [], factorCrecimiento)
  const curvaMortalidadAcumulada = obtenerCurvaMortalidadAcumulada(props.modeloMortalidad, curvaCrecimiento.length, produccion.mortalidad)
  
  const curvaBiomasaPerdida = obtenerCurvaBiomasaPerdida(curvaMortalidadAcumulada, curvaCrecimiento, numeroSmolts, 30)
  const curvaBiomasa = obtenerCurvaBiomasa(curvaMortalidadAcumulada, curvaCrecimiento, numeroSmolts, 30)
  const curvaBiomasaDiaria = obtenerCurvaBiomasa(curvaMortalidadAcumulada, curvaCrecimiento, numeroSmolts, 30)

  const pesoGanado = curvaBiomasaDiaria.slice(-1)[0] - (numeroSmolts * pesoSmolt / 1000)
  const pesoMuerto = curvaBiomasaPerdida.slice(-1)[0]
  const cantidadAlimento = (pesoGanado + pesoMuerto) * bFCR
  const eFCRCalculado = Math.round(cantidadAlimento / pesoGanado * 100) / 100

  return (
    <>
      <div className="contenido">
        <div className="barra-superior-contenido">
          <div className="titulo-contenido">
            Parámetros productivos
          </div>
        </div>
        <div className="contenido-contenido">
          <label htmlFor="fecha-inicio">Inicio ciclo</label>
          <input
            id="fecha-inicio"
            name="fecha-inicio"
            type="date"
            defaultValue={produccion.fechaInicio}
            onChange={e => props.fijarFechaInicio(e.target.value)}
            style={{width: 130}}
          />
          <label htmlFor="numero-smolts">N° de smolts</label>
          <CampoNumerico
            id="numero-smolts"
            style={{width: 78 }}
            value={produccion.numeroSmolts}
            onValueChange={e => props.fijarNumeroSmolts(e.floatValue)} />
          <label htmlFor="peso-smolt">Peso de smolt</label>
          <CampoNumerico
            id="peso-smolt"
            style={{width: 45 }}
            value={produccion.pesoSmolt}
            suffix={' g'}
            onValueChange={e => props.fijarPesoSmolt(e.floatValue)} />
          <div style={{display: 'flex', alignItems: 'baseline'}}>
            <div>
              <label htmlFor="jaulas">N° jaulas</label>
              <input
                id="jaulas"
                name="jaulas"
                type="number" min="1" step="1" max="100"
                defaultValue={numeroJaulas}
                onChange={e => props.fijarNumeroJaulas(e.target.value)}
                style={{width: 45, marginRight: 32}}
              />
            </div>
            <div>
              {mostrandoCalculadoraVolumen && <CalculadoraVolumen mostrar={setMostrandoCalculadoraVolumen} />}
              <label htmlFor="volumen-jaula">Volumen jaula</label>
              <CampoNumerico
                id="volumen-jaula"
                value={produccion.volumenJaula}
                suffix={' m3'}
                style={{width: 80}}
                onValueChange={e => props.fijarVolumenJaula(e.floatValue)} />
              <button
                id="boton-mostrar-calculadora-volumen-jaula"
                onClick={() => setMostrandoCalculadoraVolumen(true)}>
                <FontAwesomeIcon icon={faCalculator} />
              </button>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'baseline'}}>
            <div>
              <label style={{ marginRight: 8 }} htmlFor="bfcr">bFCR</label>
              <CampoNumerico
                id="bfcr"
                value={bFCR}
                style={{width: 45, marginRight: 32}}
                onValueChange={e => props.fijarBFCR(e.floatValue)} />
            </div>
            <div>
              <label style={{ marginRight: 8 }} htmlFor="efcr">eFCR</label>
              <input
                id="efcr"
                name="efcr"
                type="number" min="1" step=".01" max="3"
                disabled={true}
                value={eFCRCalculado}
                style={{width: 45, marginRight: 8 }}
              /> 
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'baseline'}}>
            <div>
              <label htmlFor="mortalidad">Mortalidad</label>
              <CampoNumerico
                id="mortalidad"
                value={produccion.mortalidad}
                suffix={' %'}
                style={{width: 45, marginRight: 32}}
                onValueChange={e => props.fijarMortalidad(e.floatValue)}
              />
            </div>
            <div>
              <label style={{ marginRight: 8 }} htmlFor="factor-crecimiento">Factor de crecimiento</label>
              <CampoNumerico
                id="factor-crecimiento"
                value={produccion.objetivos.includes(OBJETIVO_PESO) && produccion.objetivos.includes(OBJETIVO_FECHA) ? 1 : produccion.factorCrecimiento}
                style={{width: 45 }}
                onValueChange={e => props.fijarFactorCrecimiento(e.floatValue)}
                disabled={produccion.objetivos.includes(OBJETIVO_PESO) && produccion.objetivos.includes(OBJETIVO_FECHA)}
              /> 
            </div>
          </div>
          <h1 style={{marginBottom: 12, paddingTop: 12, borderTop: '1px dotted lightgray'}}>Objetivo</h1>
          <div style={{display: 'flex', alignItems: 'baseline'}}>
            <input
              type="checkbox"
              name="objetivo"
              className="radio-button"
              checked={produccion.objetivos.includes(OBJETIVO_PESO)}
              onChange={e => props.fijarObjetivo(OBJETIVO_PESO, e.target.checked)}
            />
            <label style={{ fontSize: '.9em', marginRight: 8 }} htmlFor="peso-objetivo">Peso cosecha:</label>
            <CampoNumerico
              id="peso-smolt"
              value={produccion.pesoObjetivo}
              suffix={' g'}
              style={{width: 60}}
              onClick={() => props.fijarObjetivo(OBJETIVO_PESO, true)}
              onValueChange={e => props.fijarPesoObjetivo(e.floatValue)} />
          </div>
          <div style={{display: 'flex', alignItems: 'baseline'}}>
            <input
              type="checkbox"
              name="objetivo"
              className="radio-button"
              checked={produccion.objetivos.includes(OBJETIVO_FECHA)}
              onChange={e => props.fijarObjetivo(OBJETIVO_FECHA, e.target.checked)}
            />
            <label style={{ fontSize: '.9em', marginRight: 8 }} htmlFor="fecha-objetivo">Meses ciclo:</label>
            <CampoNumerico
              id="fecha-objetivo"
              value={mesesObjetivo}
              style={{width: 45}}
              onClick={() => props.fijarObjetivo(OBJETIVO_FECHA, true)}
              onValueChange={e => props.fijarMesesObjetivo(e.floatValue)} />
          </div>
        </div>
      </div>
      <div className="contenido-secundario">
        <div className="titulo-contenido-secundario">
          <h1>Proyección</h1>
        </div>
        <div className="contenido-secundario-contenido">
          <div style={{width: '640px', height: '320px'}}>
            <Bar
              onClick={e => alert(document.getElementAtEvent(e))}
              data={{
                labels: curvaBiomasa.map((v, i) => i + 1),
                datasets: [
                  {
                    label: 'Peso final',
                    data: curvaCrecimiento.filter((peso, i) => (i + 1) % 30 === 0 || i === curvaCrecimiento.length - 1),
                    backgroundColor: '#E35205',
                    type: 'line',
                    yAxisID: 'EjeYPesoPromedio',
                    fill: false
                  },
                  {
                    label: 'Biomasa total',
                    data: curvaBiomasa,
                    backgroundColor: '#6AB96F',
                    yAxisID: 'EjeYBiomasa'
                  }
                ]
              }}
              options={{
                legend: {
                  display: false,
                  fillStyle: '#E35205',
                },
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem, data) {
                      var label = data.datasets[tooltipItem.datasetIndex].label || '';
                      if (label === 'Biomasa total') {
                        label += ': ' +  tooltipItem.yLabel.toLocaleString(undefined, { maximumFractionDigits: 0});
                      }
                      else {
                        label += ': ' +  (tooltipItem.yLabel / 1000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2});
                      }
                      label += ' kg'
                      return label;
                    },
                    title: () => ''
                  }
                },
                scales: {
                  xAxes: [{
                    gridLines: {
                      display: false
                    },
                    stacked: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Mes del ciclo'
                    }
                  }],
                  yAxes: [
                    {
                      id: 'EjeYBiomasa',
                      type: 'linear',
                      position: 'left',
                      scaleLabel: {
                        display: true,
                        labelString: 'Biomasa total (kg)'
                      },
                      ticks: {
                        callback: function(v, i, vs) { return `${v.toLocaleString()}` }
                      }
                    },
                    { 
                      id: 'EjeYPesoPromedio',
                      type: 'linear',
                      position: 'right',
                      scaleLabel: {
                        display: true,
                        labelString: 'Peso (kg)'
                      },
                      ticks: {
                        callback: function(v, i, vs) { return `${(v / 1000).toLocaleString(undefined, { minimumFractionDigits: 1})}` }
                      },
                      gridLines: {
                        display: false
                      }
                    }
                  ]
                }
              }}
            />
          </div>
          <div className="cuadro-biomasa">
            <div className="fondo-cuadro-biomasa">
              <h1>Biomasa cosechada</h1>
              <div className="resultados-estrategia">
                <h2>{Math.round(curvaBiomasa.slice(-1)[0] / 1000.0).toLocaleString('de-DE', { maximumFractionDigits: 0})} ton</h2>
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
  produccion: state.produccion,
  modelo: state.centro.barrios[state.centro.indiceBarrioSeleccionado].modelosCrecimientoMacrozona,
  modeloMortalidad: state.centro.barrios[state.centro.indiceBarrioSeleccionado].modeloMortalidad,
  macrozona: state.centro.barrios[state.centro.indiceBarrioSeleccionado].macrozona
})

const mapDispatchToProps = dispatch => ({
  fijarFechaInicio: fecha => {
    dispatch(produccionActions.fijarFechaInicio(fecha))
  },
  fijarNumeroSmolts: n => {
    dispatch(produccionActions.fijarNumeroSmolts(n))
  },
  fijarPesoSmolt: peso => {
    dispatch(produccionActions.fijarPesoSmolt(peso))
  },
  fijarCostoSmolt: usd => {
    dispatch(produccionActions.fijarCostoSmolt(Number(usd)))
  },
  fijarMortalidad: tasa => {
    dispatch(produccionActions.fijarMortalidad(Math.max(0, Math.min(Number(tasa), 100))))
  },
  fijarPesoObjetivo: g => {
    dispatch(produccionActions.fijarPesoObjetivo(g))
  },
  fijarFactorCrecimiento: tasa => {
    dispatch(produccionActions.fijarFactorCrecimiento(Number(tasa)))
  },
  fijarBFCR: valor => {
    dispatch(produccionActions.fijarBFCR(Number(valor)))
  },
  fijarCostoAlimento: usd => {
    dispatch(produccionActions.fijarCostoAlimento(Number(usd)))
  },
  fijarObjetivo: (objetivo, valor) => {
    console.log({valor});
    dispatch(produccionActions.fijarObjetivo(objetivo, valor))
  },
  fijarMesesObjetivo: meses => {
    dispatch(produccionActions.fijarMesesObjetivo(meses))
  },
  fijarNumeroJaulas: numero => {
    dispatch(produccionActions.fijarNumeroJaulas(numero))
  },
  fijarVolumenJaula: numero => {
    dispatch(produccionActions.fijarVolumenJaula(numero))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Produccion);