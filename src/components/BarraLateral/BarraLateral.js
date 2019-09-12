import React from 'react';
import { NavLink as Link } from 'react-router-dom'
import './BarraLateral.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShip, faFish, faWarehouse, faSyringe, faChartBar } from '@fortawesome/free-solid-svg-icons'

const BarraLateral = () => {
  console.log(window.location.href);
  return (
    <div id="barra-lateral">
      <h1 id="titulo-barra-lateral"><Link to="/">Parámetros simulación</Link></h1>
      <div id="lista-secciones">
        <Link activeClassName="seccion-seleccionada" className="link-seccion" to="/entorno">
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
        <Link activeClassName="seccion-seleccionada" className="link-seccion" to="/tratamientos">
          <div>
            <FontAwesomeIcon icon={faSyringe} size="lg" />
            Tratamientos
          </div>
        </Link>
        {/*<Link to="/cosecha">
          <div className="link-seccion">
            <FontAwesomeIcon icon={faShip} size="lg" />
            Cosecha
          </div>
        </Link>
        {/*<Link to="/transporte">
          <div className="link-seccion">
            <FontAwesomeIcon icon={faTruckMoving} size="lg" />
            Transporte
          </div>
        </Link>*/}
        {/*<Link to="/ventas">
          <div className="link-seccion">
            <FontAwesomeIcon icon={faDollarSign} size="lg" />
            Ventas
          </div>
        </Link>*/}
        <Link activeClassName="seccion-seleccionada" className="link-seccion" to="/otros">
          <div>
            <FontAwesomeIcon icon={faChartBar} size="lg" />
            Otros
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BarraLateral;