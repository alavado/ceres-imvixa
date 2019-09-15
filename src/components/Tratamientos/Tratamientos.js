import React, { useState } from 'react';
import { connect } from 'react-redux'
import './Tratamientos.css'
import tratamientosActions from '../../redux/tratamientos/actions';
import {dias} from '../../helpers/constantes'
import ResumenComparacion from './ResumenComparacion/';

// Costo de tratamiento de imvixa depende del peso debe poder especificarse la duracion del tratamiento
// que aparezca una pantalla grande

const Tratamientos = props => {

  const [nuevoTratamiento, setNuevoTratamiento] = useState({
    id: 0,
    estrategia: 'A',
    semana: 1,
    dia: 'Lunes',
    duracion: 3
  })

  const moverPopup = (e, semana, estrategia) => {
    var rect = document.getElementById('contenedor-semanas').getBoundingClientRect();
    var x = e.clientX - rect.left
    var y = e.clientY - rect.top
    var popup = document.getElementById('popup-semana')
    if (props[`tratamientos${estrategia}`][semana]) {
      popup.innerHTML = `Semana ${semana}<br />${props.tratamientos.find(t => t.id === props[`tratamientos${estrategia}`][semana].id).nombre}`
    }
    else {
      popup.innerHTML = `Semana ${semana}`
    }
    popup.style.marginLeft = `${x + 5}px`
    popup.style.marginTop = `${y - 18}px`
    popup.style.display = 'block'
  }

  const esconderPopup = () => {
    var popup = document.getElementById('popup-semana')
    popup.style.display = 'none'
  }

  const mostrarPopupNuevoTratamiento = (e, semana, estrategia) => {
    setNuevoTratamiento({...nuevoTratamiento, semana: Number(semana), estrategia})
    var rect = document.getElementById('contenedor-semanas').getBoundingClientRect();
    var x = e.clientX - rect.left
    var y = e.clientY - rect.top
    const popup = document.getElementById('popup-tratamiento')
    popup.style.marginLeft = `${x}px`
    popup.style.marginTop = `${y}px`
    popup.style.display = 'block'
    document.getElementById('titulo-popup-tratamiento').innerHTML = `Tratamiento semana ${semana}`
  }

  const esconderPopupNuevoTratamiento = () => {
    const popupTratamiento = document.getElementById('popup-tratamiento')
    popupTratamiento.style.display = 'none'
  }

  const agregarTratamiento = () => {
    esconderPopupNuevoTratamiento()
    if (nuevoTratamiento.id !== 0) { 
      props.agregarTratamiento(nuevoTratamiento)
    }
    else {
      props.eliminarTratamiento(nuevoTratamiento)
    }
  }

  const replicarTratamientos = () => {
    const tratamientosEstrategia = `tratamientos${nuevoTratamiento.estrategia}`
    const semanasTratamientosPrevios = Object
      .keys(props[tratamientosEstrategia])
      .filter(key => props[tratamientosEstrategia][key].id !== props.tratamientos.find(t => t.nombre.toLowerCase() === 'imvixa').id)
      .sort()
    let diferenciaEntreCiclos = nuevoTratamiento.semana - semanasTratamientosPrevios[0]
    for (let ciclo = 0; nuevoTratamiento.semana + diferenciaEntreCiclos * ciclo <= 70; ciclo++) {
      semanasTratamientosPrevios.forEach(semana => {
        let semanaAplicacion = nuevoTratamiento.semana + Number(semana) + diferenciaEntreCiclos * ciclo - semanasTratamientosPrevios[0]
        props.agregarTratamiento({
          ...props[tratamientosEstrategia][semana],
          semana: semanaAplicacion,
          estrategia: nuevoTratamiento.estrategia
        })
      })
    }
  }

  const construirCalendario = (estrategia) => {
    let semanas = []
    let diasTratamientoVigente = 0
    for (let semana = 1; semana <= 70; semana++) {
      let classSemana =  'tratamiento-inactivo'
      if (props[`tratamientos${estrategia}`][semana]) {
        classSemana = 'tratamiento-aplicado'
        diasTratamientoVigente = props[`tratamientos${estrategia}`][semana].duracion - 1
      }
      else if (diasTratamientoVigente-- > 0) {
        classSemana = 'tratamiento-activo'
      }
      semanas.push(<div
        onClick={e => mostrarPopupNuevoTratamiento(e, semana, estrategia)}
        onMouseMove={e => moverPopup(e, semana, estrategia)}
        onMouseLeave={esconderPopup}
        className={classSemana}
      >
        <span>{semana}</span>
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
          <div id="contenedor-semanas">
            {['A', 'B'].map(estrategia => (
              <div className="contenedor-tratamientos-estrategia">
                <h2>Semanas estrategia {estrategia === 'A' ? 'Imvixa' : 'tradicional'}</h2>
                <div id={`semanas-estrategia-${estrategia.toLowerCase()}`}>
                  {construirCalendario(estrategia)}
                </div>
              </div>
            ))}

            <div id="popup-semana">Semana 1</div>
            <div id="popup-tratamiento">
              <label
                htmlFor="nombre-nuevo-tratamiento"
                id="titulo-popup-tratamiento"
              >
                Tratamiento semana
              </label>
              <select
                id="nombre-nuevo-tratamiento"
                onChange={e => setNuevoTratamiento({...nuevoTratamiento, id: Number(e.target.value)})}
              >
                <option value={0}>Ninguno</option>
                {props
                  .tratamientos
                  .sort((t1, t2) => t1.nombre > t2.nombre ? 1 : -1)
                  .map(t => <option value={t.id}>{t.nombre}</option>)
                }
              </select>
              <label htmlFor="dia-nuevo-tratamiento">Día de aplicación</label>
              <select
                id="dia-nuevo-tratamiento"
                onChange={e => setNuevoTratamiento({...nuevoTratamiento, dia: e.target.value})}
              >
                {dias.map(dia => <option value={dia}>{dia}</option>)}
              </select>
              <label htmlFor="dia-nuevo-tratamiento">Duración (semanas)</label>
              <input
                type="number"
                min={1}
                onChange={e => setNuevoTratamiento({...nuevoTratamiento, duracion: Number(e.target.value)})}
                defaultValue={3} />
              <br />
              <button onClick={agregarTratamiento}>Aplicar</button>
              <button onClick={replicarTratamientos}>!!!</button>
              <button onClick={esconderPopupNuevoTratamiento}>X</button>
            </div>
          </div>
        </div>
      </div>
      <ResumenComparacion />
    </>
  );
};

const mapStateToProps = state => ({
  tratamientos: state.tratamientos.tratamientos,
  tratamientosA: state.tratamientos.tratamientosA,
  tratamientosB: state.tratamientos.tratamientosB
})

const mapDispatchToProps = dispatch => ({
  agregarTratamiento: tratamiento => {
    const { id, semana, estrategia, dia, duracion } = tratamiento
    dispatch(tratamientosActions.agregarTratamiento(id, semana, dia, estrategia, duracion))
  },
  eliminarTratamiento: tratamiento => {
    const { semana, estrategia } = tratamiento
    dispatch(tratamientosActions.eliminarTratamiento(semana, estrategia))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tratamientos);