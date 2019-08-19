import React from 'react';
import './Contenedor.css'
import BarraLateral from '../BarraLateral';
import Inicio from '../Inicio';
import { Route, Switch } from 'react-router-dom'
import Produccion from '../Produccion';
import ResumenComparacion from '../ResumenComparacion';

const Contenedor = () => {
  return (
    <div id="contenedor">
      <BarraLateral />
      <Switch>
        <Route path="/" exact component={Inicio} />
        <Route path="/produccion" exact component={Produccion} />
      </Switch>
      <ResumenComparacion />
    </div>
  );
};

export default Contenedor;