import React from 'react';
import './Reporte.css'
const { ipcRenderer } = window.require('electron');

const Reporte = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <button onClick={() => window.history.back()}>Volver</button>
      <h1>Reporte</h1>
      <button onClick={() => {
        ipcRenderer.send('imprimir')
      }}>Imprimir PDF</button>
    </div>
  );
};

export default Reporte;