import React, { useState } from 'react';
import { connect } from 'react-redux'
import './Tratamientos.css'
import tratamientosActions from '../../redux/tratamientos/actions';

// Costo de tratamiento de imvixa depende del peso debe poder especificarse la duracion del tratamiento
// que aparezca una pantalla grande

const Tratamientos = props => {

  const [nuevoTratamiento, setNuevoTratamiento] = useState({
    id: 0,
    estrategia: 'A',
    semana: 1
  })

  let semanas = []
  for (let i = 1; i <= 70; i++) {
    semanas.push(i)
  }

  const moverPopup = (e, semana) => {
    var rect = document.getElementById('contenedor-semanas').getBoundingClientRect();
    var x = e.clientX - rect.left
    var y = e.clientY - rect.top
    var popup = document.getElementById('popup-semana')
    popup.innerHTML = `Semana ${semana}`
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

  return (
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
              <h2>Semanas estrategia {estrategia}</h2>
              <div id={`semanas-estrategia-${estrategia.toLowerCase()}`}>
                {semanas.map(s => (
                  <div
                    onClick={e => mostrarPopupNuevoTratamiento(e, s, estrategia)}
                    onMouseMove={e => moverPopup(e, s)}
                    onMouseLeave={esconderPopup}
                    className={props[`tratamientos${estrategia}`][s] ? 'tratamiento-activo' : 'tratamiento-inactivo'}
                  >
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div id="popup-semana">Semana 1</div>
          <div id="popup-tratamiento">
            <label
              for="nombre-nuevo-tratamiento"
              id="titulo-popup-tratamiento"
            >
              Tratamiento semana
            </label>
            <select
              id="nombre-nuevo-tratamiento"
              onChange={e => setNuevoTratamiento({...nuevoTratamiento, id: Number(e.target.value)})}
            >
              <option value={0}>Ninguno</option>
              {props.tratamientos.map(t => <option value={t.id}>{t.nombre}</option>)}
            </select>
            <label for="dia-nuevo-tratamiento">Día de aplicación</label>
            <select id="dia-nuevo-tratamiento">
              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(dia => <option>{dia}</option>)}
            </select>
            <br />
            <button onClick={agregarTratamiento}>Aplicar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  tratamientos: state.tratamientos.tratamientos,
  tratamientosA: state.tratamientos.tratamientosA,
  tratamientosB: state.tratamientos.tratamientosB
})

const mapDispatchToProps = dispatch => ({
  agregarTratamiento: tratamiento => {
    const { id, semana, estrategia } = tratamiento
    dispatch(tratamientosActions.agregarTratamiento(id, semana, estrategia))
  },
  eliminarTratamiento: tratamiento => {
    const { semana, estrategia } = tratamiento
    dispatch(tratamientosActions.eliminarTratamiento(semana, estrategia))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tratamientos);