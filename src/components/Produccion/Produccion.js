import React from 'react';
import { connect } from 'react-redux'
import produccionActions from '../../redux/produccion/actions'
import { curvaMortalidad } from '../../helpers/modelo'
import { Bar } from 'react-chartjs-2'
import './Produccion.css'

const Produccion = props => {
  const { datos } = props
  const curva = curvaMortalidad()
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
            defaultValue={datos.fechaInicio}
            onChange={e => props.fijarFechaInicio(e.target.value)}
            style={{width: 130}}
          />
          <label htmlFor="numero-smolts">N° smolts al ingreso</label>
          <input
            id="numero-smolts"
            name="numero-smolts"
            type="number" min="50000" step="50000"
            defaultValue={datos.numeroSmolts}
            onChange={e => props.fijarNumeroSmolts(e.target.value)}
            style={{width: 80}}
          />
          <label htmlFor="peso-objetivo">Peso objetivo</label>
          <input
            id="peso-objetivo"
            name="peso-objetivo"
            type="number" min="500" step="50"
            defaultValue={datos.pesoObjetivo}
            onChange={e => props.fijarPesoObjetivo(e.target.value)}
            style={{width: 50}}
          /> g
          <label htmlFor="mortalidad">Mortalidad ciclo</label>
          <input
            id="mortalidad"
            name="mortalidad"
            type="number" min="0" step=".5"
            defaultValue={datos.mortalidad}
            onChange={e => props.fijarMortalidad(e.target.value)}
            style={{width: 45}}
          /> %
          <h1 style={{marginBottom: 12, marginTop: 8}}>Pesos medios de ingreso</h1>
          <div style={{display: 'flex'}}>
            <div>
              <label htmlFor="peso-smolt">Estrategia Imvixa</label>
              <input
                id="peso-smolt"
                name="peso-smolt"
                type="number" min="5" step="5"
                defaultValue={datos.pesosSmolt.imvixa}
                onChange={e => props.fijarPesoSmoltEstrategiaImvixa(e.target.value)}
                style={{width: 46}}
              /> g
            </div>
            <div style={{marginLeft: 32}}>
              <label htmlFor="peso-smolt">Estrategia tradicional</label>
              <input
                id="peso-smolt"
                name="peso-smolt"
                type="number" min="5" step="5"
                defaultValue={datos.pesosSmolt.tradicional}
                onChange={e => props.fijarPesoSmoltEstrategiaTradicional(e.target.value)}
                style={{width: 46}}
              /> g
            </div>
          </div>
        </div>
      </div>
      <div className="contenido-secundario">
        <div className="titulo-contenido-secundario">
          <h1>Proyección</h1>
        </div>
        <div className="contenido-secundario-contenido">
          <h1>Se mueren estos pescados: { datos.numeroSmolts * datos.mortalidad / 100.0 }</h1>
          <Bar
            data={{
              labels: ['Peces al ingreso', 'Peces salida'],
              datasets: [
                {
                  label: 'Estrategia Imvixa',
                  data: [10, 50],
                  backgroundColor: '#EF6C00',
                },
                {
                  label: 'Estrategia tradicional',
                  data: [20, 30],
                  backgroundColor: '#546E7A'
                }
              ]
            }}
            options={{
              scales: {
                yAxes: [{
                  ticks: {
                    stepSize: 30,
                    min: 0
                  }
                }],
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  datos: state.produccion
})

const mapDispatchToProps = dispatch => ({
  fijarFechaInicio: fecha => {
    dispatch(produccionActions.fijarFechaInicio(fecha))
  },
  fijarNumeroSmolts: n => {
    dispatch(produccionActions.fijarNumeroSmolts(Number(n)))
  },
  fijarPesoSmoltEstrategiaImvixa: peso => {
    dispatch(produccionActions.fijarPesoSmolt('imvixa', Number(peso)))
  },
  fijarPesoSmoltEstrategiaTradicional: peso => {
    dispatch(produccionActions.fijarPesoSmolt('tradicional', Number(peso)))
  },
  fijarCostoSmolt: usd => {
    dispatch(produccionActions.fijarCostoSmolt(Number(usd)))
  },
  fijarMortalidad: tasa => {
    dispatch(produccionActions.fijarMortalidad(Number(tasa)))
  },
  fijarPesoObjetivo: g => {
    dispatch(produccionActions.fijarPesoObjetivo(Math.max(Number(g), 500)))
  },
  fijarAjusteCrecimiento: tasa => {
    dispatch(produccionActions.fijarAjusteCrecimiento(Number(tasa)))
  },
  fijarBFCR: valor => {
    dispatch(produccionActions.fijarBFCR(Number(valor)))
  },
  fijarCostoAlimento: usd => {
    dispatch(produccionActions.fijarCostoAlimento(Number(usd)))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Produccion);