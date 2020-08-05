import React from 'react';
import ImagenBienvenida from '../../assets/Fondo simulador IMVIXA_3296x1742_1.jpg'
import './Inicio.css'

const Inicio = () => {
  return (
    <div className="contenido">
      <div className="barra-superior-contenido">
        <div className="titulo-contenido">
          Acerca de
        </div>
      </div>
      <div id="bienvenida">
        <img src={ImagenBienvenida} alt="Bienvenida" />
        <div className="texto_copyright">
          <p>
            Imvixa, Elanco y el logo de la barra diagonal son marcas registradas de Elanco o sus afiliadas.
          </p>
          <p>
            ©2020 Elanco   PM-CL-20-00XX
          </p>
        </div> 
      </div>
    </div>
  );
};

export default Inicio;