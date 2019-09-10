import React from 'react';
import './Tratamientos.css'

// Costo de tratamiento de imvixa depende del peso debe poder especificarse la duracion del tratamiento
// que aparezca una pantalla grande

const Tratamientos = () => {

  let semanas = []
  for (let i = 1; i <= 60; i++) {
    semanas.push(i)
  }

  const moverPopup = (e, semana) => {
    var rect = document.getElementById('contenedor-semanas').getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
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
              <h2>Estrategia {letra.toUpperCase()}</h2>
              <div id={`semanas-estrategia-${letra}`}>
                {semanas.map(s => (
                  <div
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
        </div>
      </div>
    </div>
  );
};

export default Tratamientos;