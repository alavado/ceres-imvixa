import React from 'react';
import { NavLink as Link } from 'react-router-dom'
import './BarraLateral.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFish, faWarehouse, faSyringe, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons'

const BarraLateral = () => {
  console.log(window.location.href);
  return (
    <div id="barra-lateral">
      <h1 id="titulo-barra-lateral"><Link to="/"></Link></h1>
      <div id="lista-secciones">
        <div>
          <Link activeClassName="seccion-seleccionada" className="link-seccion" to="/centro">
            <div>
              <FontAwesomeIcon icon={faWarehouse} size="lg" />
              Centro
            </div>
          </Link>
          <Link activeClassName="seccion-seleccionada" className="link-seccion" to="/produccion">
            <div>
              <FontAwesomeIcon icon={faFish} size="lg" />
              Producción
            </div>
          </Link>
          <Link activeClassName="seccion-seleccionada" className="link-seccion" to="/economico">
            <div>
              <FontAwesomeIcon icon={faChartBar} size="lg" />
              Económicos
            </div>
          </Link>
          <Link activeClassName="seccion-seleccionada" className="link-seccion" to="/tratamientos">
            <div>
              <FontAwesomeIcon icon={faSyringe} size="lg" />
              Tratamientos
            </div>
          </Link>
        </div>
        <div>
          <Link activeClassName="seccion-seleccionada" className="link-seccion" to="/ajustes">
            <div>
              <FontAwesomeIcon icon={faCog} size="lg" />
              Ajustes
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BarraLateral;