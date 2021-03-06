import React from 'react';
import { NavLink as Link } from 'react-router-dom'
import './BarraLateral.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFish, faWarehouse, faSyringe, faChartBar } from '@fortawesome/free-solid-svg-icons'
import logoElanco from '../../assets/elanco.svg'
import logoCeres from '../../assets/logo_ceres.png'
import { version } from '../../../package.json'

const BarraLateral = () => {
  console.log(window.location.href);
  return (
    <div id="barra-lateral">
      <div>
        <div id="herramientas">

        </div>
        <div id="lista-secciones">
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
              Costos
            </div>
          </Link>
          <Link activeClassName="seccion-seleccionada" className="link-seccion" to="/tratamientos">
            <div>
              <FontAwesomeIcon icon={faSyringe} size="lg" />
              Tratamientos
            </div>
          </Link>
        </div>
      </div>
      <div id="contenedor-logo">
        <Link to="/">
          <img src={logoElanco} alt="logo elanco" id="logo-elanco" onDragEnter={() => false} />
        </Link>
        <div id="version">
          Desarrollado por CERES BCA<br/>
          Versión {version}
        </div>
      </div>
    </div>
  );
};

export default BarraLateral;