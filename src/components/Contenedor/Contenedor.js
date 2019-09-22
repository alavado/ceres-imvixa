import React from 'react';
import './Contenedor.css'
import BarraLateral from '../BarraLateral';
import Inicio from '../Inicio';
import { Route, Switch } from 'react-router-dom'
import Centro from '../Centro';
import Produccion from '../Produccion';
import Tratamientos from '../Tratamientos';
import Ajustes from '../Ajustes';
import Economico from '../Economico';

const Contenedor = () => {
  return (
    <div id="contenedor">
      <BarraLateral />
      <Route path="/" exact component={Inicio} />
      <Route path="/centro" exact component={Centro} />
      <Route path="/produccion" exact component={Produccion} />
      <Route path="/tratamientos" exact component={Tratamientos} />
      <Route path="/ajustes" exact component={Ajustes} />
      <Route path="/economico" exact component={Economico} />
    </div>
  );
};

export default Contenedor;