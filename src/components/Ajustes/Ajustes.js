import React from 'react'
import { connect } from 'react-redux'
import './Ajustes.css'
import { Link } from 'react-router-dom'
import tratamientosActions from '../../redux/tratamientos/actions';
import { FARMACO_APLICACION_ORAL, FARMACO_APLICACION_BAÑO } from '../../helpers/constantes';

const Ajustes = ({medicamentos, activarMedicamento, marcarMedicamentosFueronSeleccionados}) => {
  return (
    <div className="contenido">
      <div className="barra-superior-contenido">
        <div className="titulo-contenido">
          Calendarios de tratamientos
        </div>
      </div>
      <div id="contenedor-ajustes">
        {[FARMACO_APLICACION_ORAL, FARMACO_APLICACION_BAÑO].map(tipoAplicacion => (
          <>
            <h1>Seleccionar tratamientos de {tipoAplicacion === FARMACO_APLICACION_ORAL ? 'aplicación oral' : 'aplicación externa'}</h1>
            <table className="tabla-medicamentos">
              <thead>
                <tr>
                  <th>Usar</th>
                  <th>Nombre comercial</th>
                  <th>Principio activo</th>
                  <th>Proveedor</th>
                  <th>Costo unitario</th>
                  <th>Costo operacional</th>
                  <th>Mortalidad</th>
                  <th>Efectividad</th>
                </tr>
              </thead>
              <tbody>
                {medicamentos.filter(m => m.formaFarmaceutica === tipoAplicacion).sort((m1, m2) => m1.nombre > m2.nombre ? 1 : -1).map((m, i) => (
                  <tr style={{borderLeft: `8px solid ${m.activo ? m.color: 'transparent'}`}} key={`tabla-medicamentos-${i}`} className={m.activo ? 'medicamento-activo' : 'medicamento-inactivo'}>
                    <td  onClick={() => activarMedicamento(Number(m.id), !m.activo)}><input type="checkbox" checked={m.activo} onChange={e => activarMedicamento(Number(m.id), e.target.checked)} /></td>
                    <td>{m.nombre}</td>
                    <td>{m.principioActivo}</td>
                    <td>{m.empresa}</td>
                    <td>{m.costoUnitario} USD/{m.unidad}</td>
                    <td>{m.costoOperacional} USD</td>
                    <td>{m.mortalidad.toLocaleString(undefined, { minimumFractionDigits: 1})}%</td>
                    <td>{m.duracion} semanas</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ))}
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-start', marginTop: 16, marginLeft: 32}}>
        <button onClick={() => marcarMedicamentosFueronSeleccionados(true)}>Confirmar</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  medicamentos: state.tratamientos.medicamentos,
})

const mapDispatchToProps = dispatch => ({
  activarMedicamento: (id, valor) => dispatch(tratamientosActions.editarMedicamento(id, 'activo', valor)),
  marcarMedicamentosFueronSeleccionados: valor => dispatch(tratamientosActions.marcarMedicamentosFueronSeleccionados(valor))
})

// certificacion parametro disp a pagar
export default connect(mapStateToProps, mapDispatchToProps)(Ajustes);