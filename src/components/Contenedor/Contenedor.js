import React from 'react';
import './Contenedor.css'
import BarraLateral from '../BarraLateral';
import Inicio from '../Inicio';

const Contenedor = () => {
  return (
    <div id="contenedor">
      <BarraLateral />
      <Inicio />
    </div>
  );
};

export default Contenedor;