import React from 'react';
import './Contenedor.css'
import BarraLateral from '../BarraLateral';
import Inicio from '../Inicio';
import { Route, Switch } from 'react-router-dom'
import ResumenComparacion from '../ResumenComparacion';
import Entorno from '../Entorno';
import Produccion from '../Produccion';
import Cosecha from '../Cosecha';
import Transporte from '../Transporte';
import Ventas from '../Ventas';
import Tratamientos from '../Tratamientos';
import Otros from '../Otros';

const Contenedor = () => {
  return (
    <div id="contenedor">
      <BarraLateral />
      <Switch>
        <Route path="/" exact component={Inicio} />
        <Route path="/entorno" exact component={Entorno} />
        <Route path="/produccion" exact component={Produccion} />
        <Route path="/cosecha" exact component={Cosecha} />
        <Route path="/transporte" exact component={Transporte} />
        <Route path="/ventas" exact component={Ventas} />
        <Route path="/tratamientos" exact component={Tratamientos} />
        <Route path="/otros" exact component={Otros} />
      </Switch>
      <ResumenComparacion />
    </div>
  );
};

export default Contenedor;