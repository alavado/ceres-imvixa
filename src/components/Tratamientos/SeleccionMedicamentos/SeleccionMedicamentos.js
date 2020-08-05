import React, { useState } from 'react'
import { connect } from 'react-redux'
import './SeleccionMedicamentos.css'
import tratamientosActions from '../../../redux/tratamientos/actions';
import { FARMACO_APLICACION_ORAL, FARMACO_APLICACION_BAÑO } from '../../../helpers/constantes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle as iconoAgregar } from '@fortawesome/free-solid-svg-icons';
import FilaMedicamento from './FilaMedicamento';
import FilaNuevoMedicamento from './FilaNuevoMedicamento/';
import DialogoNuevoMedicamento from './DialogoNuevoMedicamento';
import DialogoDisclaimer from './DialogoDisclaimer';

const SeleccionMedicamentos = ({medicamentos, activarMedicamento, marcarMedicamentosFueronSeleccionados, agregarMedicamento}) => {

  const [agregandoMedicamento, setAgregandoMedicamento] = useState({
    [FARMACO_APLICACION_ORAL]: false,
    [FARMACO_APLICACION_BAÑO]: false
  })

  const [mostrarDialogoNuevoMedicamento, setMostrarDialogoNuevoMedicamento] = useState(false)
  const [formaFarmaceuticaNuevomedicamento, setFormaFarmaceuticaNuevomedicamento] = useState(FARMACO_APLICACION_BAÑO)

  const [nuevoMedicamento, setNuevoMedicamento] = useState({})

  const activarAgregarMedicamento = (tipo, valor) => {
    setAgregandoMedicamento({
      ...agregandoMedicamento,
      [tipo]: valor
    })
  }

  const [mostrarDialogoDisclaimer, setMostrarDialogoDisclaimer] = useState(true)

  return (
    <div className="contenido">
      <DialogoNuevoMedicamento
        ocultar={() => setMostrarDialogoNuevoMedicamento(false)}
        formaFarmaceutica={formaFarmaceuticaNuevomedicamento}
        mostrar={mostrarDialogoNuevoMedicamento}
      />
      <DialogoDisclaimer
        ocultar={() => setMostrarDialogoDisclaimer(true)}
        mostrar={mostrarDialogoDisclaimer}
      />
      <div className="barra-superior-contenido">
        <div className="titulo-contenido">
          Selección de medicamentos
        </div>
      </div>
      <div id="contenedor-ajustes">
        {[FARMACO_APLICACION_ORAL, FARMACO_APLICACION_BAÑO].map(formaFarmaceutica => (
          <React.Fragment key={`tipo-${formaFarmaceutica}`}>
            <div className="titulo-tabla-medicamentos">
              <h1>Medicamentos de aplicación {formaFarmaceutica === FARMACO_APLICACION_ORAL ? 'oral' : 'externa'}</h1>
              <div
                className="contenedor-agregar-medicamento"
                onClick={() => {
                  setFormaFarmaceuticaNuevomedicamento(formaFarmaceutica)
                  setMostrarDialogoNuevoMedicamento(true)
                }}
              >
                <FontAwesomeIcon icon={iconoAgregar}/>
                <span>Agregar medicamento<br />de aplicación {formaFarmaceutica === FARMACO_APLICACION_ORAL ? 'oral' : 'externa'}</span>
              </div>
            </div>
            <div>
              <table className="tabla-medicamentos">
                <thead>
                  <tr>
                    <th>Usar</th>
                    <th>Nombre / Principio Activo</th>
                    <th>Costo unitario producto comercial <br/>Rango Inferior</th>
                    <th>Costo unitario producto comercial <br/>Rango Superior</th>
                    {formaFarmaceutica === FARMACO_APLICACION_ORAL && <th>Presentación (% principio activo)</th>}
                    {formaFarmaceutica === FARMACO_APLICACION_BAÑO && <th>Volumen de agua para baño</th>}
                    <th>{formaFarmaceutica === FARMACO_APLICACION_ORAL ? 'Dosis producto comercial total por kg de peso' : 'Dosis producto comercial'}</th>
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
  agregarMedicamento: medicamento => dispatch(tratamientosActions.agregarMedicamento(medicamento))
})

// certificacion parametro disp a pagar
export default connect(mapStateToProps, mapDispatchToProps)(SeleccionMedicamentos);