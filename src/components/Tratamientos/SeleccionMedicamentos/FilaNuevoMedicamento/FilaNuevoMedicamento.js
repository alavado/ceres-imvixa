import React from 'react';
import './FilaNuevoMedicamento.css'
import CampoNumerico from '../../../Produccion/CampoNumerico';
import { FARMACO_APLICACION_BAÑO } from '../../../../helpers/constantes';

const FilaNuevoMedicamento = props => {

  const {nuevoMedicamento, setNuevoMedicamento, formaFarmaceutica} = props

  return (
    <tr id="fila-nuevo-medicamento">
      <td></td>
      <td>
        <input type="text" onChange={e => setNuevoMedicamento({...nuevoMedicamento, nombre: e.target.value})} />
      </td>
      <td>
        <input type="text" onChange={e => setNuevoMedicamento({...nuevoMedicamento, principioActivo: e.target.value})} />
      </td>
      <td>
        <CampoNumerico
          onValueChange={e => setNuevoMedicamento({...nuevoMedicamento, costoUnitario: e.floatValue})}
          suffix={formaFarmaceutica === FARMACO_APLICACION_BAÑO ? ' USD/lt' : ' USD/kg'}
        />
      </td>
      <td>
        <CampoNumerico
          onValueChange={e => setNuevoMedicamento({...nuevoMedicamento, cantidadPorJaula: e.floatValue})}
          suffix={' kg'}
        />
      </td>
      <td>
        <CampoNumerico
          onValueChange={e => setNuevoMedicamento({...nuevoMedicamento, costoOperacional: e.floatValue})}
          suffix={' USD'}
        />
      </td>
      <td>
        <CampoNumerico
          onValueChange={e => setNuevoMedicamento({...nuevoMedicamento, mortalidad: e.floatValue})}
          suffix={nuevoMedicamento && nuevoMedicamento.mortalidad >= 1 ? (nuevoMedicamento.mortalidad === 1 ? ' pez' : ' peces') : ' %'}
        />
      </td>
    </tr>
  )
}

export default FilaNuevoMedicamento;