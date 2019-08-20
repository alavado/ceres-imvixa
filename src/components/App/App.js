import React from 'react';
import Contenedor from '../Contenedor';
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'

const App = ()  => {
  return (
    <Provider store={store}>
      <div id="fondo">
        <BrowserRouter>
          <Contenedor />
        </BrowserRouter> 
      </div>
    </Provider>
  );
}

export default App;
