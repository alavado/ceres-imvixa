import React from 'react';
import './FilaNuevoMedicamento.css'
import CampoNumerico from '../../../Produccion/CampoNumerico';
import { FARMACO_APLICACION_BAÑO } from '../../../../helpers/constantes';

const FilaNuevoMedicamento = props => {

  const {nuevoMedicamento, setNuevoMedicamento, formaFarmaceutica} = props
  const esBaño = formaFarmaceutica === FARMACO_APLICACION_BAÑO

  return (
    <tr id="fila-nuevo-medicamento">
      <td></td>
      <td>
        <input type="text" onChange={e => setNuevoMedicamento({...nuevoMedicamento, nombre: e.target.value})} />
      </td>
      <td>
        <CampoNumerico
          onValueChange={e => setNuevoMedicamento({...nuevoMedicamento, costoUnitarioInferior: e.floatValue})}
          suffix={formaFarmaceutica === FARMACO_APLICACION_BAÑO ? ' USD/lt' : ' USD/kg'}
        />
      </td>
      <td>
        <CampoNumerico
          onValueChange={e => setNuevoMedicamento({...nuevoMedicamento, costoUnitarioSuperior: e.floatValue})}
          suffix={formaFarmaceutica === FARMACO_APLICACION_BAÑO ? ' USD/lt' : ' USD/kg'}
        />
      </td>
      <td>
        { esBaño ?
          <CampoNumerico
            onValueChange={e => setNuevoMedicamento({...nuevoMedicamento, volumen: e.floatValue})}
            suffix={' m3'}
          /> :
          <CampoNumerico
            suffix={' %'}
            onValueChange={e => setNuevoMedicamento({...nuevoMedicamento, presentacion: e.floatValue})}
          />
        }
      </td>
      <td>
        <CampoNumerico
          onValueChange={e => {
            if (formaFarmaceutica === FARMACO_APLICACION_BAÑO){
              return setNuevoMedicamento({...nuevoMedicamento, cantidadPorJaula: e.floatValue})
            }
            return setNuevoMedicamento({...nuevoMedicamento, dosis: e.floatValue})
            }}
          suffix={esBaño ? ' lt' : ' mg/kg'}
        />
      </td>
      <td>
        <CampoNumerico
          onValueChange={e => setNuevoMedicamento({...nuevoMedicamento, costoOperacional: e.floatValue})}
          suffix={esBaño ? ' USD' : ' USD/ton'}
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