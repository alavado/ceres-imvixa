import React, { useState } from 'react'
import { connect } from 'react-redux'
import './SeleccionMedicamentos.css'
import tratamientosActions from '../../../redux/tratamientos/actions';
import { FARMACO_APLICACION_ORAL, FARMACO_APLICACION_BAÑO } from '../../../helpers/constantes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle as iconoAgregar } from '@fortawesome/free-solid-svg-icons';
import FilaMedicamento from './FilaMedicamento';
import FilaNuevoMedicamento from './FilaNuevoMedicamento/';

const SeleccionMedicamentos = ({medicamentos, activarMedicamento, marcarMedicamentosFueronSeleccionados, agregarMedicamento}) => {

  const [agregandoMedicamento, setAgregandoMedicamento] = useState({
    [FARMACO_APLICACION_ORAL]: false,
    [FARMACO_APLICACION_BAÑO]: false
  })

  const [nuevoMedicamento, setNuevoMedicamento] = useState({})

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
        {[FARMACO_APLICACION_ORAL, FARMACO_APLICACION_BAÑO].map(formaFarmaceutica => (
          <React.Fragment key={`tipo-${formaFarmaceutica}`}>
            <h1>Medicamentos de aplicación {formaFarmaceutica === FARMACO_APLICACION_ORAL ? 'oral' : 'externa'}</h1>
            <div>
              <table className="tabla-medicamentos">
                <thead>
                  <tr>
                    <th>Usar</th>
                    <th>Nombre comercial</th>
                    <th>Costo unitario producto comercial</th>
                    <th>Principio activo</th>
                    {formaFarmaceutica === FARMACO_APLICACION_ORAL ? 
                    <th>Presentación (% principio activo)</th>
                    : ''}
                    <th>{formaFarmaceutica === FARMACO_APLICACION_ORAL ? 'Dosis total por kg de peso' : 'Dosis por jaula'}</th>
                    <th>Costo operacional {formaFarmaceutica === FARMACO_APLICACION_ORAL ? 'por mezcla de alimento' : 'por baño'}</th>
                    <th>Mortalidad por jaula</th>
                  </tr>
                </thead>
                <tbody>
                  {medicamentos.filter(m => m.formaFarmaceutica === formaFarmaceutica).sort((m1, m2) => m1.nombre > m2.nombre ? 1 : -1).map((m, i) => (
                    <FilaMedicamento
                      key={`tabla-medicamentos-${m.id}`}
                      id={m.id}
                      activarMedicamento={activarMedicamento}
                    />
                  ))}
                  {agregandoMedicamento[formaFarmaceutica] &&
                    <FilaNuevoMedicamento
                      nuevoMedicamento={nuevoMedicamento}
                      setNuevoMedicamento={setNuevoMedicamento}
                      formaFarmaceutica={formaFarmaceutica}
                    />
                  }
                </tbody>
              </table>
              {!agregandoMedicamento[formaFarmaceutica] ?
                <div className="contenedor-boton-agregar-medicamento">
                  <FontAwesomeIcon icon={iconoAgregar} size="sm" onClick={() => activarAgregarMedicamento(formaFarmaceutica, true)} />
                </div> :
                <div className="botones-nuevo-medicamento">
                  <button onClick={() => {
                    agregarMedicamento({...nuevoMedicamento, formaFarmaceutica})
                    activarAgregarMedicamento(formaFarmaceutica, false)}
                  }>Agregar</button>
                  <button onClick={() => activarAgregarMedicamento(formaFarmaceutica, false)}>Cancelar</button>
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
              <li key={`minilista-medicamentos-item-${m.id}`}>
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
  marcarMedicamentosFueronSeleccionados: valor => dispatch(tratamientosActions.marcarMedicamentosFueronSeleccionados(valor)),
  agregarMedicamento: medicamento => {
    const { nombre, formaFarmaceutica, principioActivo, costoUnitario, costoOperacional, cantidadPorJaula } = medicamento
    console.log(medicamento);
    dispatch(tratamientosActions.agregarMedicamento(nombre, formaFarmaceutica, principioActivo, costoUnitario, costoOperacional, cantidadPorJaula))
  }
})

// certificacion parametro disp a pagar
export default connect(mapStateToProps, mapDispatchToProps)(SeleccionMedicamentos);