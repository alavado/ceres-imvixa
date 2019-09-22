import React from 'react';
import { Link } from 'react-router-dom'
const { ipcRenderer } = window.require('electron');

const Reporte = () => {
  return (
    <div>
      <Link to="/">
        Volver
      </Link>
      Reporte
      <button onClick={() => {
        ipcRenderer.send('imprimir')
      }}>PDF</button>
    </div>
  );
};

export default Reporte;