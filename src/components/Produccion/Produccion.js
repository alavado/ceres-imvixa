import React from 'react';
import { connect } from 'react-redux'
import produccionActions from '../../redux/produccion/actions'
import { obtenerCurvaMortalidadAcumulada, obtenerCurvaCrecimientoPorPeso, obtenerCurvaBiomasa } from '../../helpers/modelo'
import { Bar } from 'react-chartjs-2'
import './Produccion.css'
import { PESO_OBJETIVO_MAXIMO, PESO_OBJETIVO_MINIMO, OBJETIVO_PESO, OBJETIVO_FECHA } from '../../helpers/constantes';
import NumberFormat from 'react-number-format'

const Produccion = props => {

  const { produccion, macrozona } = props
  const { objetivo, mesesObjetivo, pesoSmolt, fechaInicio, pesoObjetivo, bFCR, eFCR, numeroSmolts } = produccion

  let curvaCrecimiento
  if (objetivo === OBJETIVO_PESO) {
    curvaCrecimiento = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivo, pesoObjetivo, [])
  }
  else {
    curvaCrecimiento = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivo, mesesObjetivo, [])
  }

  const curvaMortalidadAcumulada = obtenerCurvaMortalidadAcumulada(props.modeloMortalidad, curvaCrecimiento.length, produccion.mortalidad)
  
  //const curvaBiomasaPerdida = obtenerCurvaBiomasaPerdida(curvaMortalidadAcumulada, curvaCrecimiento, numeroSmolts, 30)
  const curvaBiomasa = obtenerCurvaBiomasa(curvaMortalidadAcumulada, curvaCrecimiento, numeroSmolts, 30)
  
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
          <label htmlFor="numero-smolts">N° de smolts al ingreso</label>
          <NumberFormat
            id="numero-smolts"
            value={produccion.numeroSmolts}
            thousandSeparator={','}
            decimalSeparator={'.'}
            min={500}
            max={5000000}
            step={50000}
            onChange={e => props.fijarNumeroSmolts(e.target.value)} />

          {/* <input
            id="numero-smolts"
            name="numero-smolts"
            type="number" min="50000" step="50000"
            defaultValue={produccion.numeroSmolts}
            onChange={e => props.fijarNumeroSmolts(e.target.value)}
            style={{width: 80}}
          /> */}
          <label htmlFor="peso-smolt">Peso de smolt al ingreso</label>
          <input
            id="peso-smolt"
            name="peso-smolt"
            type="number" min="5" step="5"
            defaultValue={produccion.pesoSmolt}
            onChange={e => props.fijarPesoSmolt(e.target.value)}
            style={{width: 46}}
          /> g
          <label htmlFor="jaulas">N° de jaulas</label>
          <input
            id="jaulas"
            name="jaulas"
            type="number" min="0" step="1" max="100"
            defaultValue={20}
            style={{width: 45}}
          /> 
          <div style={{display: 'flex', alignItems: 'baseline'}}>
            <div>
              <label style={{ marginRight: 8 }} htmlFor="bfcr">bFCR</label>
              <input
                id="bfcr"
                name="bfcr"
                type="number" min="1" step=".01" max="3"
                defaultValue={bFCR}
                onChange={e => props.fijarBFCR(e.target.value)}
                style={{width: 45, marginRight: 32 }}
              />
            </div>
            <div>
              <label style={{ marginRight: 8 }} htmlFor="efcr">eFCR</label>
              <input
                id="efcr"
                name="efcr"
                type="number" min="1" step=".01" max="3"
                disabled={true}
                defaultValue={eFCR}
                onChange={e => props.fijarEFCR(e.target.value)}
                style={{width: 45, marginRight: 8 }}
              /> 
            </div>
          </div>
          <label htmlFor="mortalidad">Mortalidad ciclo</label>
          <input
            id="mortalidad"
            name="mortalidad"
            type="number" min="0" step=".5" max="100"
            defaultValue={produccion.mortalidad}
            onChange={e => props.fijarMortalidad(e.target.value)}
            style={{width: 45}}
          /> %
          <h1 style={{marginBottom: 12, paddingTop: 12, borderTop: '1px dotted lightgray'}}>Objetivo</h1>
          <div style={{display: 'flex', alignItems: 'baseline'}}>
            <input
              type="radio"
              name="objetivo"
              className="radio-button"
              checked={produccion.objetivo === OBJETIVO_PESO} onChange={() => props.fijarObjetivo(OBJETIVO_PESO)}
            />
            <label style={{ fontSize: '.9em', marginRight: 8 }} htmlFor="peso-objetivo">Peso cosecha:</label>
            <input
              id="peso-objetivo"
              name="peso-objetivo"
              type="number" min="500" step="50"
              defaultValue={produccion.pesoObjetivo}
              onChange={e => props.fijarPesoObjetivo(e.target.value)}
              style={{width: 50, marginRight: 4}}
              onClick={() => props.fijarObjetivo(OBJETIVO_PESO)}
            /> g
          </div>
          <div style={{display: 'flex', alignItems: 'baseline'}}>
            <input
              type="radio"
              name="objetivo"
              className="radio-button"
              checked={produccion.objetivo !== OBJETIVO_PESO} onChange={() => props.fijarObjetivo(OBJETIVO_FECHA)}
            />
            <label style={{ fontSize: '.9em', marginRight: 8 }} htmlFor="fecha-objetivo">Meses ciclo:</label>
            <input
              id="fecha-objetivo"
              name="fecha-objetivo"
              type="number" step="0.5"
              defaultValue={mesesObjetivo}
              onChange={e => props.fijarMesesObjetivo(e.target.value)}
              style={{width: 48}}
              onClick={() => props.fijarObjetivo(OBJETIVO_FECHA)}
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
            <Bar
              data={{
                labels: curvaBiomasa.map((v, i) => i + 1),
                datasets: [
                  {
                    label: 'Peso promedio',
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
                  display: true
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
                        labelString: 'Peso promedio (kg)'
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
    dispatch(produccionActions.fijarNumeroSmolts(Number(n.replace(/,/g, ''))))
  },
  fijarPesoSmolt: peso => {
    dispatch(produccionActions.fijarPesoSmolt(Number(peso)))
  },
  fijarCostoSmolt: usd => {
    dispatch(produccionActions.fijarCostoSmolt(Number(usd)))
  },
  fijarMortalidad: tasa => {
    dispatch(produccionActions.fijarMortalidad(Math.max(0, Math.min(Number(tasa), 100))))
  },
  fijarPesoObjetivo: g => {
    dispatch(produccionActions.fijarPesoObjetivo(Math.min(PESO_OBJETIVO_MAXIMO, Math.max(Number(g), PESO_OBJETIVO_MINIMO))))
  },
  fijarAjusteCrecimiento: tasa => {
    dispatch(produccionActions.fijarAjusteCrecimiento(Number(tasa)))
  },
  fijarBFCR: valor => {
    dispatch(produccionActions.fijarBFCR(Number(valor)))
  },
  fijarEFCR: valor => {
    dispatch(produccionActions.fijarEFCR(Number(valor)))
  },
  fijarCostoAlimento: usd => {
    dispatch(produccionActions.fijarCostoAlimento(Number(usd)))
  },
  fijarObjetivo: objetivo => {
    dispatch(produccionActions.fijarObjetivo(objetivo))
  },
  fijarMesesObjetivo: meses => {
    dispatch(produccionActions.fijarMesesObjetivo(meses))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Produccion);