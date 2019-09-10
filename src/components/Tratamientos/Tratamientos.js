import React from 'react';
import './Tratamientos.css'

// Costo de tratamiento de imvixa depende del peso debe poder especificarse la duracion del tratamiento
// que aparezca una pantalla grande

const Tratamientos = () => {

  let semanas = []
  for (let i = 1; i <= 60; i++) {
    semanas.push(i)
  }

  const nombresTratamientos = [
    'Tratamiento 1',
    'Tratamiento 2',
    'Tratamiento 3',
    'Tratamiento 4',
    'Tratamiento 5',
    'Tratamiento 6'
  ]

  const moverPopup = (e, semana) => {
    var rect = document.getElementById('contenedor-semanas').getBoundingClientRect();
    var x = e.clientX - rect.left; 
    var y = e.clientY - rect.top;
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

  const agregarTratamiento = (e, semana) => {
    var rect = document.getElementById('contenedor-semanas').getBoundingClientRect();
    var x = e.clientX - rect.left; 
    var y = e.clientY - rect.top;
    const popup = document.getElementById('popup-tratamiento')
    popup.style.marginLeft = `${x}px`
    popup.style.marginTop = `${y}px`
    popup.style.display = 'block'
    document.getElementById('titulo-popup-tratamiento').innerHTML = `Tratamiento semana ${semana}`
  }

  const cancelarAgregarTratamiento = () => {
    const popupTratamiento = document.getElementById('popup-tratamiento')
    popupTratamiento.style.display = 'none'
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
          {['a', 'b'].map(letra => (
            <div className="contenedor-tratamientos-estrategia">
              <h2>Semanas estrategia {letra.toUpperCase()}</h2>
              <div id={`semanas-estrategia-${letra}`}>
                {semanas.map(s => (
                  <div
                    onClick={e => agregarTratamiento(e, s)}
                    onMouseMove={e => moverPopup(e, s)}
                    onMouseLeave={esconderPopup}
                  >
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div id="popup-semana">Semana 1</div>
          <div id="popup-tratamiento">
            <h2 id="titulo-popup-tratamiento">Tratamiento semana </h2>
            <label for="nombre-nuevo-tratamiento">Tratamiento</label>
            <select id="nombre-nuevo-tratamiento">
              {nombresTratamientos.map(nombre => <option>{nombre}</option>)}
            </select>
            <label for="dia-nuevo-tratamiento">Día de aplicación</label>
            <select id="dia-nuevo-tratamiento">
              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(dia => <option>{dia}</option>)}
            </select>
            <br />
            <button onClick={cancelarAgregarTratamiento}>Cancelar</button>
            <button>Agregar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tratamientos;