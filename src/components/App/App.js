import React from 'react';
import Contenedor from '../Contenedor';
import { HashRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import Reporte from '../Reporte';

const App = ()  => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/reporte" exact component={Reporte} />
          <div id="fondo">
            <Contenedor />
          </div>
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
