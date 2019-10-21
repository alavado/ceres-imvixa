import React, { useState } from 'react'
import { connect } from 'react-redux'
import './SeleccionMedicamentos.css'
import tratamientosActions from '../../../redux/tratamientos/actions';
import { FARMACO_APLICACION_ORAL, FARMACO_APLICACION_BAÑO } from '../../../helpers/constantes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle as iconoAgregar } from '@fortawesome/free-solid-svg-icons';
import FilaMedicamento from './FilaMedicamento';
import FilaNuevoMedicamento from './FilaNuevoMedicamento/';

const SeleccionMedicamentos = ({medicamentos, activarMedicamento, marcarMedicamentosFueronSeleccionados}) => {

  const [agregandoMedicamento, setAgregandoMedicamento] = useState({
    [FARMACO_APLICACION_ORAL]: true,
    [FARMACO_APLICACION_BAÑO]: true
  })

  const activarAgregarMedicamento = (tipo, valor) => {
    setAgregandoMedicamento({
      ...agregandoMedicamento,
      [tipo]: valor
    })
  }

  return (
    <div className="contenido">
      <div className="barra-superior-contenido">
        <div className="titulo-contenido">
          Selección de medicamentos
        </div>
      </div>
      <div id="contenedor-ajustes">
        {[FARMACO_APLICACION_ORAL, FARMACO_APLICACION_BAÑO].map(tipoAplicacion => (
          <React.Fragment key={`tipo-${tipoAplicacion}`}>
            <h1>Medicamentos de aplicación {tipoAplicacion === FARMACO_APLICACION_ORAL ? 'oral' : 'externa'}</h1>
            <div>
              <table className="tabla-medicamentos">
                <thead>
                  <tr>
                    <th>Usar</th>
                    <th>Nombre comercial</th>
                    <th>Principio activo</th>
                    <th>Costo unitario</th>
                    <th>Dosis por m3 de agua</th>
                    <th>Costo operacional por baño</th>
                    <th>Mortalidad por jaula</th>
                  </tr>
                </thead>
                <tbody>
                  {medicamentos.filter(m => m.formaFarmaceutica === tipoAplicacion).sort((m1, m2) => m1.nombre > m2.nombre ? 1 : -1).map((m, i) => (
                    <FilaMedicamento
                      key={`tabla-medicamentos-${i}`}
                      id={m.id}
                      activarMedicamento={activarMedicamento}
                    />
                  ))}
                  {agregandoMedicamento[tipoAplicacion] && <FilaNuevoMedicamento mostrar={v => activarAgregarMedicamento(tipoAplicacion, v)} />}
                </tbody>
              </table>
              {!agregandoMedicamento[tipoAplicacion] ?
                <div className="contenedor-boton-agregar-medicamento">
                  <FontAwesomeIcon icon={iconoAgregar} size="sm" onClick={() => activarAgregarMedicamento(tipoAplicacion, true)} />
                </div> :
                <div className="botones-nuevo-medicamento">
                  <button onClick={() => activarAgregarMedicamento(tipoAplicacion, false)}>Agregar</button>
                  <button onClick={() => activarAgregarMedicamento(tipoAplicacion, false)}>Cancelar</button>
                </div>
              }
            </div>
          </React.Fragment>
        ))}
      </div>
      <div id="contenedor-fondo-lista-medicamentos">
        <button onClick={() => marcarMedicamentosFueronSeleccionados(true)}>Confirmar</button>
        <span>Medicamentos seleccionados:</span>
        <ul>
          {medicamentos
            .filter(m => m.activo)
            .map(m => (
              <li>
                <div className="cuadradito-medicamento" style={{ backgroundColor: m.color }}></div>{m.nombre}
              </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  medicamentos: state.tratamientos.medicamentos,
})

const mapDispatchToProps = dispatch => ({
  activarMedicamento: (id, valor) => dispatch(tratamientosActions.editarMedicamento(id, 'activo', valor)),
  marcarMedicamentosFueronSeleccionados: valor => dispatch(tratamientosActions.marcarMedicamentosFueronSeleccionados(valor))
})

// certificacion parametro disp a pagar
export default connect(mapStateToProps, mapDispatchToProps)(SeleccionMedicamentos);