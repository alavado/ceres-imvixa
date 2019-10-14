import React from 'react'
import { connect } from 'react-redux'
import './Ajustes.css'
import { Link } from 'react-router-dom'
import tratamientosActions from '../../redux/tratamientos/actions';

const Ajustes = ({medicamentos, activarMedicamento, setMostrarTabla}) => {
  return (
    <div className="contenido">
      <div className="barra-superior-contenido">
        <div className="titulo-contenido">
          Calendarios de tratamientos
        </div>
      </div>
      <div id="contenedor-ajustes">
        <h1>Seleccione los antiparasitarios</h1>
        <table id="tabla-medicamentos">
          <thead>
            <tr>
              <th>Usar</th>
              <th>Nombre comercial</th>
              <th>Principio activo</th>
              <th>Proveedor</th>
              <th>Forma farmacéutica</th>
              <th>Costo unitario</th>
              <th>Costo operacional</th>
              <th>Mortalidad</th>
              <th>Efectividad</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.sort((m1, m2) => m1.nombre > m2.nombre ? 1 : -1).map((m, i) => (
              <tr key={`tabla-medicamentos-${i}`} className={m.activo ? 'medicamento-activo' : 'medicamento-inactivo'}>
                <td><input type="checkbox" checked={m.activo} onChange={e => activarMedicamento(Number(m.id), e.target.checked)} /></td>
                <td>{m.nombre}</td>
                <td>{m.principioActivo}</td>
                <td>{m.empresa}</td>
                <td>{m.formaFarmaceutica}</td>
                <td>{m.costoUnitario} USD/{m.unidad}</td>
                <td>{m.costoOperacional} USD</td>
                <td>{m.mortalidad.toLocaleString(undefined, { minimumFractionDigits: 1})}%</td>
                <td>{m.duracion} semanas</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display: 'flex', justifyContent: 'flex-start', marginTop: 16}}>
          <button onClick={() => setMostrarTabla(false)}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  medicamentos: state.tratamientos.medicamentos
})

const mapDispatchToProps = dispatch => ({
  activarMedicamento: (id, valor) => dispatch(tratamientosActions.editarMedicamento(id, 'activo', valor))
})

// certificacion parametro disp a pagar
export default connect(mapStateToProps, mapDispatchToProps)(Ajustes);