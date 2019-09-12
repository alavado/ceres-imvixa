import React from 'react';
import { Link } from 'react-router-dom'
import './BarraLateral.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShip, faFish, faWarehouse, faSyringe, faChartBar } from '@fortawesome/free-solid-svg-icons'

const BarraLateral = () => {
  return (
    <div id="barra-lateral">
      <h1 id="titulo-barra-lateral"><Link to="/">Parámetros</Link></h1>
      <div id="lista-secciones">
        <Link to="/entorno">
          <div className="link-seccion">
            <FontAwesomeIcon icon={faWarehouse} size="lg" />
            Centro
          </div>
        </Link>
        <Link to="/produccion">
          <div className="link-seccion">
            <FontAwesomeIcon icon={faFish} size="lg" />
            Producción
          </div>
        </Link>
        <Link to="/tratamientos">
          <div className="link-seccion">
            <FontAwesomeIcon icon={faSyringe} size="lg" />
            Tratamientos
          </div>
        </Link>
        <Link to="/cosecha">
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
        <Link to="/otros">
          <div className="link-seccion">
            <FontAwesomeIcon icon={faChartBar} size="lg" />
            Otros
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BarraLateral;