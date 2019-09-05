import React from 'react';
import { connect } from 'react-redux'
import ventasActions from '../../redux/ventas/actions'

const Ventas = props => {
  const { datos } = props
  return (
    <div className="contenido">
      <div className="barra-superior-contenido">
        <div className="titulo-contenido">
          Parámetros de ventas
        </div>
      </div>
      <div className="contenido-contenido">
        <div id="contenedor-grados-salmon">
          <label htmlFor="grado-superior">Grado superior (%)</label>
          <input
            id="grado-superior"
            name="grado-superior"
            type="number" min="1" max ="100" step="0.1"
            defaultValue={datos.gradoSuperior}
            onChange={e => props.fijarPorcentajeVentas('gradoSuperior', e.target.value)}
          />
          <label htmlFor="grado-ordinario">Grado ordinario (%)</label>
          <input
            id="grado-ordinario"
            name="grado-ordinario"
            type="number" min="1" max ="100" step="0.1"
            defaultValue={datos.gradoOrdinario}
            onChange={e => props.fijarPorcentajeVentas('gradoOrdinario', e.target.value)}
          />
          <label htmlFor="grado-produccion">Grado producción (%)</label>
          <input
            id="grado-produccion"
            name="grado-produccion"
            type="number" min="1" max ="15" step="0.1"
            defaultValue={datos.gradoProduccion}
            onChange={e => props.fijarPorcentajeVentas('gradoProduccion', e.target.value)}
          />
        </div>
        <div id="contenedor-precios-grados-salmon">
          <label htmlFor="precios-grado-superior">Precio grado superior ($USD)</label>
          <input
            id="precios-grado-superior"
            name="precios-grado-superior"
            type="number" min="1" max ="15" step="0.1"
            defaultValue={datos.precioSuperior}
            onChange={e => props.fijarPorcentajeVentas('precioGradoSuperior', e.target.value)}
          />
          <label htmlFor="precios-grado-ordinario">Precio grado ordinario ($USD)</label>
          <input
            id="precios-grado-ordinario"
            name="precios-grado-ordinario"
            type="number" min="1" max ="15" step="0.1"
            defaultValue={datos.precioOrdinario}
            onChange={e => props.fijarPorcentajeVentas('precioGradoOrdinario', e.target.value)}
          />
          <label htmlFor="precios-grado-produccion">Precio grado producción ($USD)</label>
          <input
            id="precios-grado-produccion"
            name="precios-grado-produccion"
            type="number" min="1" max ="15" step="0.1"
            defaultValue={datos.precioProduccion}
            onChange={e => props.fijarPorcentajeVentas('precioGradoProduccion', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  datos: state.ventas
})


const mapDispatchToProps = dispatch => ({
  fijarPorcentajeVentas: (nombre, porcentaje) => dispatch(ventasActions.fijarPorcentajeVentas(nombre, porcentaje))
})

export default connect(mapStateToProps, mapDispatchToProps)(Ventas);