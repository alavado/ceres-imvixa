import React from 'react';
import { connect } from 'react-redux'
import produccionActions from '../../redux/produccion/actions'
import './Produccion.css'

const Produccion = props => {
  const { datos } = props
  return (
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
        />
        <label htmlFor="numero-smolts">Número smolts al ingreso</label>
        <input
          id="numero-smolts"
          name="numero-smolts"
          type="number" min="50000" step="50000"
          defaultValue={datos.numeroSmolts}
          onChange={e => props.fijarNumeroSmolts(e.target.value)}
        />
        <label htmlFor="peso-smolt">Peso medio smolt al ingreso (g)</label>
        <input
          id="peso-smolt"
          name="peso-smolt"
          type="number" min="5" step="5"
          defaultValue={datos.pesoSmolt}
          onChange={e => props.fijarPesoSmolt(e.target.value)}
        />
        <label htmlFor="costo-smolt">Costo smolt (USD)</label>
        <input
          id="costo-smolt"
          name="costo-smolt"
          type="number" min="0" step="0.01"
          defaultValue={datos.costoSmolt}
          onChange={e => props.fijarCostoSmolt(e.target.value)}
        />
        <label htmlFor="costo-alimento">Costo alimento (USD/kg)</label>
        <input
          id="costo-alimento"
          name="costo-alimento"
          type="number" min="0" step="0.01"
          defaultValue={datos.costoAlimento}
          onChange={e => props.fijarCostoAlimento(e.target.value)}
        />
        <label htmlFor="peso-objetivo">Peso objetivo (g)</label>
        <input
          id="peso-objetivo"
          name="peso-objetivo"
          type="number" min="500" step="50"
          defaultValue={datos.pesoObjetivo}
          onChange={e => props.fijarPesoObjetivo(e.target.value)}
        />
        <label htmlFor="mortalidad">Mortalidad sin considerar piojo (%)</label>
        <input
          id="mortalidad"
          name="mortalidad"
          type="number" min="0" step="1"
          defaultValue={Math.round(100 * datos.mortalidad)}
          onChange={e => props.fijarMortalidad(e.target.value)}
        />
      </div>
    </div>
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
  fijarPesoSmolt: g => {
    dispatch(produccionActions.fijarPesoSmolt(Number(g)))
  },
  fijarCostoSmolt: usd => {
    dispatch(produccionActions.fijarCostoSmolt(Number(usd)))
  },
  fijarMortalidad: tasa => {
    dispatch(produccionActions.fijarMortalidad(Number(tasa) / 100))
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