import React from 'react';
import { Link } from 'react-router-dom'
import './BarraLateral.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndustry, faTruckMoving, faFish, faWater, faDollarSign, faSyringe, faChartBar } from '@fortawesome/free-solid-svg-icons'

const BarraLateral = () => {
  return (
    <div id="barra-lateral">
      <Link to="/"><h1>Ev. Imvixa Elanco</h1></Link>
      <div id="lista-secciones">
        <Link to="/entorno">
          <div className="link-seccion">
            <FontAwesomeIcon icon={faWater} />
            Entorno
          </div>
        </Link>
        <Link to="/produccion">
          <div className="link-seccion">
            <FontAwesomeIcon icon={faIndustry} />
            Producción
          </div>
        </Link>
        <Link to="/cosecha">
          <div className="link-seccion">
            <FontAwesomeIcon icon={faFish} />
            Cosecha
          </div>
        </Link>
        <Link to="/transporte">
          <div className="link-seccion">
            <FontAwesomeIcon icon={faTruckMoving} />
            Transporte
          </div>
        </Link>
        <Link to="/ventas">
          <div className="link-seccion">
            <FontAwesomeIcon icon={faDollarSign} />
            Ventas
          </div>
        </Link>
        <Link to="/tratamientos">
          <div className="link-seccion">
            <FontAwesomeIcon icon={faSyringe} />
            Tratamientos
          </div>
        </Link>
        <Link to="/otros">
          <div className="link-seccion">
            <FontAwesomeIcon icon={faChartBar} />
            Otros
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BarraLateral;