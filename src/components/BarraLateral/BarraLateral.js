import React from 'react';
import { Link } from 'react-router-dom'
import './BarraLateral.css'

const BarraLateral = () => {
  return (
    <div id="barra-lateral">
      <Link to="/"><h1>Ev. Imvixa Elanco</h1></Link>
      <Link to="/parametros-productivos">Productivos</Link>
    </div>
  );
};

export default BarraLateral;