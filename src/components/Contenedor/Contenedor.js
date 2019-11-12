import React from 'react';
import './Contenedor.css'
import BarraLateral from '../BarraLateral';
import Inicio from '../Inicio';
import { Route } from 'react-router-dom'
import Centro from '../Centro';
import Produccion from '../Produccion';
import Tratamientos from '../Tratamientos';
import SeleccionMedicamentos from '../Tratamientos/SeleccionMedicamentos';
import Economico from '../Economico';
import Actualizando from '../Actualizando';

const Contenedor = () => {
  return (
    <div id="contenedor">
      <BarraLateral />
      <Actualizando />
      <Route path="/" exact component={Inicio} />
      <Route path="/centro" exact component={Centro} />
      <Route path="/produccion" exact component={Produccion} />
      <Route path="/tratamientos" exact component={Tratamientos} />
      <Route path="/antiparasitarios" exact component={SeleccionMedicamentos} />
      <Route path="/economico" exact component={Economico} />
    </div>
  );
};

export default Contenedor;