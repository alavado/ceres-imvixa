import React from 'react';
import './Contenedor.css'
import BarraLateral from '../BarraLateral';
import Inicio from '../Inicio';
import { Route } from 'react-router-dom'
import ParametrosProductivos from '../ParametrosProductivos';

const Contenedor = () => {
  return (
    <div id="contenedor">
      <BarraLateral />
      <Route path="/" exact component={Inicio} />
      <Route path="/parametros-productivos" exact component={ParametrosProductivos} />
    </div>
  );
};

export default Contenedor;