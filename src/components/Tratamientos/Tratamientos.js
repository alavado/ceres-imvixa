import React, { useState } from 'react'
import { connect } from 'react-redux'
import './Tratamientos.css'
import tratamientosActions from '../../redux/tratamientos/actions';
import { dias, FARMACO_APLICACION_ORAL } from '../../helpers/constantes'
import ResumenComparacion from './ResumenComparacion/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTrash, faShower, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { obtenerCurvaCrecimientoPorPeso } from '../../helpers/modelo'
import { calcularNumeroDeBaños, obtenerBaños } from '../../helpers/helpers'
import SeleccionMedicamentos from './SeleccionMedicamentos'
import CampoNumerico from '../Produccion/CampoNumerico'

const Tratamientos = props => {

  const { tratamientos, medicamentos, produccion, macrozona, medicamentosFueronSeleccionados, 
          marcarMedicamentosFueronSeleccionados, replicarEstrategia } = props
  const { objetivos, mesesObjetivo, pesoSmolt, fechaInicio, pesoObjetivo } = produccion
  
  const curvaImvixa = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivos, pesoObjetivo, mesesObjetivo, obtenerBaños(tratamientos.imvixa, medicamentos))
  const curvaTradicional = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivos, pesoObjetivo, mesesObjetivo, obtenerBaños(tratamientos.tradicional, medicamentos))

  const [nuevoTratamiento, setNuevoTratamiento] = useState({
    idMedicamento: medicamentos[0].id,
    estrategia: 'tradicional',
    semana: 1,
    pesoDeAplicacion: Math.max(pesoSmolt - 20, 40),
    dia: 'Lunes',
    duracion: medicamentos[0].duracion,
    aplicaciones: 1
  })

  const [medicamentosDisponibles, setMedicamentosDisponibles] = useState(medicamentos)

  const moverPopup = (e, semana, estrategia) => {
    var rect = document.getElementById('contenedor-calendarios').getBoundingClientRect();
    var x = e.clientX - rect.left
    var y = e.clientY - rect.top
    var popup = document.getElementById('popup-semana')
    const textoSemana = semana === 0 ? 'Antes del ingreso' : `Semana ${semana}`
    if (tratamientos[estrategia][semana]) {
      popup.innerHTML = `${textoSemana}<br />${medicamentos.find(t => t.id === tratamientos[estrategia][semana].idMedicamento).nombre}`
    }
    else {
      popup.innerHTML = textoSemana
    }
    popup.style.margin = `${y - 18}px 0 0 ${x + 5}px`
    popup.style.display = 'block'
  }

  const esconderPopup = () => {
    var popup = document.getElementById('popup-semana')
    popup.style.display = 'none'
  }

  const mostrarPopupNuevoTratamiento = (e, semana, estrategia) => {
    let meds = medicamentos
      .filter(m =>
        m.activo &&
        ((semana === 0 && (
          (estrategia === 'tradicional' && m.formaFarmaceutica === FARMACO_APLICACION_ORAL/* && m.nombre !== 'Imvixa'*/) ||
          (estrategia === 'imvixa' && m.formaFarmaceutica === FARMACO_APLICACION_ORAL/* && m.nombre === 'Imvixa'*/))) ||
        (semana !== 0)))
      .sort((m1, m2) => m1.nombre > m2.nombre ? 1 : -1)
    setMedicamentosDisponibles(meds)
    setNuevoTratamiento({
      ...nuevoTratamiento,
      idMedicamento: meds[0].id,
      semana: Number(semana),
      duracion: meds[0].duracion,
      estrategia,
      aplicaciones: meds[0].aplicaciones
    })
    var rect = document.getElementById('contenedor-calendarios').getBoundingClientRect();
    var x = e.clientX - rect.left
    var y = e.clientY - rect.top
    const popup = document.getElementById('popup-tratamiento')
    popup.style.margin = `${y}px 0 0 ${x}px`
    popup.style.display = 'block'
  }

  const cambiarTratamiento = e => {
    const { id: idMedicamento, duracion, aplicaciones } = medicamentos.find(m => m.id === Number(e.target.value))
    setNuevoTratamiento({...nuevoTratamiento,
      idMedicamento,
      duracion,
      aplicaciones
    })
  }

  const esconderPopupNuevoTratamiento = () => {
    const popupTratamiento = document.getElementById('popup-tratamiento')
    popupTratamiento.style.display = 'none'
  }

  const agregarTratamiento = () => {
    esconderPopupNuevoTratamiento()
    props.agregarTratamiento(nuevoTratamiento)
  }

  const eliminarTratamiento = () => {
    esconderPopupNuevoTratamiento()
    props.eliminarTratamiento(nuevoTratamiento.estrategia, nuevoTratamiento.semana)
  }

  const medicamentoImvixa = medicamentos.find(t => t.nombre.toLowerCase() === 'imvixa')

  const construirCalendario = estrategia => {
    let semanas = []
    let diasTratamientoVigente = 0
    let imvixaActivo = false
    const totalSemanas = estrategia === 'imvixa' ? (curvaImvixa.length / 7): (curvaTradicional.length / 7)
    for (let semana = 0; semana <= totalSemanas; semana++) {
      let classSemana =  'tratamiento-inactivo'
      const tratamientoSemana = tratamientos[estrategia][semana]
      let estilo = {}
      if (tratamientoSemana) {
        if (tratamientoSemana.idMedicamento === medicamentoImvixa.id) {
          classSemana = 'imvixa tratamiento-aplicado'
          imvixaActivo = true
        }
        else {
          classSemana = 'tratamiento-aplicado'
          imvixaActivo = false
          estilo.backgroundColor = medicamentos.find(t => t.id === tratamientoSemana.idMedicamento).color
        }
        diasTratamientoVigente = tratamientoSemana.duracion - 1
      }
      else if (diasTratamientoVigente-- > 0) {
        classSemana = imvixaActivo ? 'imvixa tratamiento-activo' : 'tratamiento-activo'
      }
      semanas.push(<div
        key={`semana-${semana}-estrategia-${estrategia}`}
        onClick={e => mostrarPopupNuevoTratamiento(e, semana, estrategia)}
        onMouseMove={e => moverPopup(e, semana, estrategia)}
        onMouseLeave={esconderPopup}
        className={classSemana}
        style={estilo}
      >
        <span>{semana === 0 ? 'A' : semana}</span>
      </div>)
    }
    return semanas
  }

  const replicarEstrategiaTradicional = () => {
    esconderPopupNuevoTratamiento()
    replicarEstrategia('tradicional', 'imvixa', (curvaImvixa.length / 7))
  }

  return !medicamentosFueronSeleccionados ? <SeleccionMedicamentos /> : (
    <>
      <div className="contenido">
        <div className="barra-superior-contenido">
          <div className="titulo-contenido">
            Calendarios de tratamientos
          </div>
        </div>
        <div className="contenido-contenido">
          <div id="contenedor-calendarios">
            {Object.keys(tratamientos).map(estrategia => {
              const calendario = construirCalendario(estrategia)
              return (
                <div
                  key={`contenedor-calendario-${estrategia}`}
                  className="contenedor-tratamientos-estrategia"
                >
                  <div className="contenedor-header-calendario">
                    <h2>Semanas estrategia {estrategia === 'imvixa' ? '2' : '1'}</h2>
                    <div className="numero-baños">
                      <div>
                        {calcularNumeroDeBaños(estrategia, medicamentos, tratamientos, estrategia === 'imvixa' ? curvaImvixa : curvaTradicional)}
                      </div>
                      <FontAwesomeIcon icon={faShower} size="sm" title='Número de baños'/>
                    </div>
                  </div>
                  <div id={`semanas-estrategia-${estrategia}`}>
                    {calendario}
                  </div>
                </div>
              )
            })}
            <div id="popup-semana">Semana 1</div>
            <div id="popup-tratamiento">
              <button
                id="boton-cerrar-popup-tratamiento"
                onClick={esconderPopupNuevoTratamiento}
              >
                <FontAwesomeIcon icon={faTimes} size="sm" />
              </button>
              <div>
                <label
                  htmlFor="nombre-nuevo-tratamiento"
                  id="titulo-popup-tratamiento"
                >
                  Tratamiento
                </label>
                <select
                  id="nombre-nuevo-tratamiento"
                  value={nuevoTratamiento.idMedicamento}
                  onChange={cambiarTratamiento}
                >
                  {medicamentosDisponibles.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                </select>
              </div>
              <div style={{display: 'flex'}}>
                <div>
                  {nuevoTratamiento.semana === 0 ? 
                    <>
                      <label htmlFor="peso-tratamiento-antes">Peso de aplicación</label>
                      <CampoNumerico
                        id="peso-tratamiento-antes"
                        value={((nuevoTratamiento.estrategia === 'imvixa' && tratamientos.imvixa['0'] && tratamientos.imvixa['0'].pesoDeAplicacion) || (nuevoTratamiento.estrategia === 'tradicional' && tratamientos.tradicional['0'] && tratamientos.tradicional['0'].pesoDeAplicacion)) || nuevoTratamiento.pesoDeAplicacion}
                        suffix={' g'}
                        style={{width: 60}}
                        onValueChange={e => setNuevoTratamiento({...nuevoTratamiento, pesoDeAplicacion: e.floatValue})} />
                    </> :
                    <>
                      <label htmlFor="dia-nuevo-tratamiento">Día aplicación</label>
                      <select
                        id="dia-nuevo-tratamiento"
                        onChange={e => setNuevoTratamiento({...nuevoTratamiento, dia: e.target.value})}
                        value={nuevoTratamiento.dia}
                      >
                        {dias.map(dia => <option key={dia} value={dia}>{dia}</option>)}
                      </select>
                    </>
                  }
                </div>
                <div>
                  <label htmlFor="dia-nuevo-tratamiento">Efectividad</label>
                  <input
                    type="number"
                    min={1}
                    onChange={e => setNuevoTratamiento({...nuevoTratamiento, duracion: Number(e.target.value)})}
                    value={nuevoTratamiento.duracion} />
                  <span>sem.</span>
                </div>
              </div>
              <div id="contenedor-acciones-tratamiento-extra">
                <div id="contenedor-acciones-tratamiento">
                  <div>
                    <button id="boton-agregar-tratamiento" onClick={agregarTratamiento}>Aplicar</button>
                    <input
                      id="numero-aplicaciones"
                      type="number" min="1" max="3" step="1"
                      value={nuevoTratamiento.aplicaciones}
                      onChange={e => setNuevoTratamiento({...nuevoTratamiento, aplicaciones: Number(e.target.value)})}
                    />
                    <label htmlFor="numero-aplicaciones">{nuevoTratamiento.aplicaciones > 1 ? 'veces' : 'vez'}</label>
                  </div>
                  {tratamientos[nuevoTratamiento.estrategia][nuevoTratamiento.semana] &&
                    <button id="boton-eliminar-tratamiento" onClick={eliminarTratamiento}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  }
                </div>
                {nuevoTratamiento.semana === medicamentoImvixa.duracion && nuevoTratamiento.estrategia === 'imvixa' &&
                  <button id="boton-agregar-tratamiento" onClick={replicarEstrategiaTradicional}>Replicar estr. tradicional</button>
                }
              </div>
            </div>
          </div>
          <button id="boton-volver-tratamientos" onClick={() => marcarMedicamentosFueronSeleccionados(false)}>
            <FontAwesomeIcon icon={faChevronLeft} size="sm" />
            Selección de medicamentos
          </button>
        </div>
      </div>
      <ResumenComparacion
        curvaImvixa={curvaImvixa}
        curvaTradicional={curvaTradicional}
      />
    </>
  );
};

const mapStateToProps = state => ({
  tratamientos: state.tratamientos.tratamientos,
  medicamentos: state.tratamientos.medicamentos,
  produccion: state.produccion,
  macrozona: state.centro.barrios[state.centro.indiceBarrioSeleccionado].macrozona,
  medicamentosFueronSeleccionados: state.tratamientos.medicamentosFueronSeleccionados
})

const mapDispatchToProps = dispatch => ({
  agregarTratamiento: tratamiento => {
    const { idMedicamento, semana, estrategia, pesoDeAplicacion, dia, duracion, aplicaciones } = tratamiento
    dispatch(tratamientosActions.agregarTratamiento(idMedicamento, semana, pesoDeAplicacion, dia, estrategia, duracion, aplicaciones))
  },
  eliminarTratamiento: (estrategia, semana) => dispatch(tratamientosActions.eliminarTratamiento(estrategia, semana)),
  marcarMedicamentosFueronSeleccionados: valor => dispatch(tratamientosActions.marcarMedicamentosFueronSeleccionados(valor)),
  replicarEstrategia: (base, objetivo, semanas) => dispatch(tratamientosActions.replicarEstrategia(base, objetivo, semanas))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tratamientos);