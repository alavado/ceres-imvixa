import React from 'react';
import Contenedor from '../Contenedor';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import Reporte from '../Reporte';

const App = ()  => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/reporte" exact component={Reporte} />
          <Route path="/">
            <div id="fondo">
              <Contenedor />
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
