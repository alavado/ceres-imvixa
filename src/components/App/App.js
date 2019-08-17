import React from 'react';
import Contenedor from '../Contenedor';
import { BrowserRouter } from 'react-router-dom'
import './App.css'

const App = ()  => {
  return (
    <div id="fondo">
      <BrowserRouter>
        <Contenedor />
      </BrowserRouter> 
    </div>
  );
}

export default App;
