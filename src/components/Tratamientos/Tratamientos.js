import React, { useState } from 'react';
import { connect } from 'react-redux'
import './Tratamientos.css'
import tratamientosActions from '../../redux/tratamientos/actions';
import { dias } from '../../helpers/constantes'
import ResumenComparacion from './ResumenComparacion/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { OBJETIVO_PESO } from '../../helpers/constantes';
import { obtenerCurvaCrecimientoPorPeso } from '../../helpers/modelo'

const Tratamientos = props => {

  const { tratamientos, medicamentos, produccion, macrozona } = props
  const { objetivo, fechaObjetivo, pesoSmolt, fechaInicio, pesoObjetivo } = produccion

  let curvaImvixa, curvaTradicional
  if (objetivo === OBJETIVO_PESO) {
    curvaImvixa = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivo, pesoObjetivo, tratamientos.imvixa)
    curvaTradicional = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivo, pesoObjetivo, tratamientos.tradicional)
  }
  else {
    curvaImvixa = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivo, fechaObjetivo, tratamientos.imvixa)
    curvaTradicional = obtenerCurvaCrecimientoPorPeso(macrozona, fechaInicio, pesoSmolt, objetivo, fechaObjetivo, tratamientos.tradicional)
  }

  const [nuevoTratamiento, setNuevoTratamiento] = useState({
    idMedicamento: medicamentos.sort((t1, t2) => t1.nombre > t2.nombre ? 1 : -1)[0].id,
    estrategia: 'imvixa',
    semana: 1,
    dia: 'Lunes',
    duracion: medicamentos.sort((t1, t2) => t1.nombre > t2.nombre ? 1 : -1)[0].duracion
  })

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
    setNuevoTratamiento({
      ...nuevoTratamiento,
      semana: Number(semana),
      estrategia
    })
    var rect = document.getElementById('contenedor-calendarios').getBoundingClientRect();
    var x = e.clientX - rect.left
    var y = e.clientY - rect.top
    const popup = document.getElementById('popup-tratamiento')
    popup.style.margin = `${y}px 0 0 ${x}px`
    popup.style.display = 'block'
  }

  const cambiarTratamiento = e => {
    const idMedicamento = Number(e.target.value) 
    setNuevoTratamiento({...nuevoTratamiento,
      idMedicamento,
      duracion: medicamentos.find(m => m.id === idMedicamento).duracion
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

  const construirCalendario = estrategia => {
    let semanas = []
    let diasTratamientoVigente = 0
    let imvixaActivo = false
    const totalSemanas = estrategia === 'imvixa' ? (curvaImvixa.length / 7): (curvaTradicional.length / 7)
    for (let semana = 0; semana <= totalSemanas; semana++) {
      let classSemana =  'tratamiento-inactivo'
      const tratamientoSemana = tratamientos[estrategia][semana]
      if (tratamientoSemana) {
        if (tratamientoSemana.idMedicamento === medicamentos.find(t => t.nombre.toLowerCase() === 'imvixa').id) {
          classSemana = 'imvixa tratamiento-aplicado'
          imvixaActivo = true
        }
        else {
          classSemana = 'tratamiento-aplicado'
          imvixaActivo = false
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
      >
        <span>{semana === 0 ? 'A' : semana}</span>
      </div>)
    }
    return semanas
  }

  return (
    <>
      <div className="contenido">
        <div className="barra-superior-contenido">
          <div className="titulo-contenido">
            Calendarios de tratamientos
          </div>
        </div>
        <div className="contenido-contenido">
          <div id="contenedor-calendarios">
            {Object.keys(tratamientos).map(estrategia => (
              <div
                key={`contenedor-calendario-${estrategia}`}
                className="contenedor-tratamientos-estrategia"
              >
                <h2>Semanas estrategia {estrategia}</h2>
                <div id={`semanas-estrategia-${estrategia}`}>
                  {construirCalendario(estrategia)}
                </div>
              </div>
            ))}
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
                  defaultValue={medicamentos.sort((t1, t2) => t1.nombre > t2.nombre ? 1 : -1)[0].id}
                  onChange={cambiarTratamiento}
                >
                  {/* <option value={0}>Ninguno</option> */}
                  {medicamentos
                    .sort((m1, m2) => m1.nombre > m2.nombre ? 1 : -1)
                    .filter(m =>
                      (nuevoTratamiento.semana === 0 && ((m.nombre === 'Imvixa' && nuevoTratamiento.estrategia === 'imvixa') || m.nombre === 'Emamectina')) ||
                      (nuevoTratamiento.semana !== 0 && m.nombre !== 'Imvixa'))
                    .map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)
                  }
                </select>
              </div>
              <div style={{display: 'flex'}}>
                <div>
                  <label htmlFor="dia-nuevo-tratamiento">Día aplicación</label>
                  <select
                    id="dia-nuevo-tratamiento"
                    onChange={e => setNuevoTratamiento({...nuevoTratamiento, dia: e.target.value})}
                  >
                    {dias.map(dia => <option key={dia} value={dia}>{dia}</option>)}
                  </select>
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
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <button id="boton-agregar-tratamiento" onClick={agregarTratamiento}>Aplicar</button>
                {tratamientos[nuevoTratamiento.estrategia][nuevoTratamiento.semana] &&
                  <button id="boton-eliminar-tratamiento" onClick={eliminarTratamiento}>
                    <FontAwesomeIcon icon={faTrash} size="sm" />
                  </button>
                }
              </div>
            </div>
          </div>
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
  macrozona: state.centro.barrios[state.centro.indiceBarrioSeleccionado].macrozona
})

const mapDispatchToProps = dispatch => ({
  agregarTratamiento: tratamiento => {
    const { idMedicamento, semana, estrategia, dia, duracion } = tratamiento
    dispatch(tratamientosActions.agregarTratamiento(idMedicamento, semana, dia, estrategia, duracion))
  },
  eliminarTratamiento: (estrategia, semana) => {
    dispatch(tratamientosActions.eliminarTratamiento(estrategia, semana))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tratamientos);