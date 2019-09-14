import React from 'react';
import './Contenedor.css'
import BarraLateral from '../BarraLateral';
import Inicio from '../Inicio';
import { Route, Switch } from 'react-router-dom'
import Centro from '../Centro';
import Produccion from '../Produccion';
import Cosecha from '../Cosecha';
import Transporte from '../Transporte';
import Ventas from '../Ventas';
import Tratamientos from '../Tratamientos';
import Otros from '../Otros';
import Economico from '../Economico';

const Contenedor = () => {
  return (
    <div id="contenedor">
      <BarraLateral />
      <Switch>
        <Route path="/" exact component={Inicio} />
        <Route path="/centro" exact component={Centro} />
        <Route path="/produccion" exact component={Produccion} />
        <Route path="/cosecha" exact component={Cosecha} />
        <Route path="/transporte" exact component={Transporte} />
        <Route path="/ventas" exact component={Ventas} />
        <Route path="/tratamientos" exact component={Tratamientos} />
        <Route path="/otros" exact component={Otros} />
        <Route path="/economico" exact component={Economico} />
      </Switch>
    </div>
  );
};

export default Contenedor;