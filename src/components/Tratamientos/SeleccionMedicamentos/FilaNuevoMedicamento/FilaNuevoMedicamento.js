import React from 'react';
import './FilaNuevoMedicamento.css'

const FilaNuevoMedicamento = ({mostrar}) => {
  return (
    <tr id="fila-nuevo-medicamento">
      <td></td>
      <td><input type="text" /></td>
      <td><input type="text" /></td>
      <td colSpan="3">
        <button onClick={() => mostrar(false)}>Agregar</button>
        <button onClick={() => mostrar(false)}>Cancelar</button>
      </td>
    </tr>
  )
}

export default FilaNuevoMedicamento;