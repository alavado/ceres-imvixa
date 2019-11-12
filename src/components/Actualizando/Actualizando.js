import React, { useState } from 'react'
import './Actualizando.css'

const Actualizando = () => {

  const [mostrar, setMostrar] = useState(false)

  const ipcRenderer = window.require('electron').ipcRenderer;
  ipcRenderer.on('descargando-actualizacion', function (event, centros) {
    setMostrar(true)
  })

  return (
    mostrar && <div id="contenedor-actualizando">
      Descargando actualización
    </div>
  )
}

export default Actualizando