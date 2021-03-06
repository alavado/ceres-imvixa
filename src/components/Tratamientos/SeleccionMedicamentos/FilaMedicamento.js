import React from 'react';
import { connect } from 'react-redux'
import CampoNumerico from '../../Produccion/CampoNumerico';
import { FARMACO_APLICACION_BAÑO } from '../../../helpers/constantes';
import tratamientosActions from '../../../redux/tratamientos/actions';

const FilaMedicamento = ({id, volumenJaulaOriginal, activarMedicamento, editarMedicamento, medicamentos}) => {

  const m = medicamentos.find(m => m.id === id)
  const esBaño = m.formaFarmaceutica === FARMACO_APLICACION_BAÑO

  return (
    <tr
      style={{borderLeft: `8px solid ${m.activo ? m.color: 'transparent'}`}}
      className={m.activo ? 'medicamento-activo' : 'medicamento-inactivo'}
    >
      <td onClick={() => activarMedicamento(Number(m.id), !m.activo)}>
        <input
          type="checkbox"
          checked={m.activo}
          onChange={e => activarMedicamento(Number(m.id), e.target.checked)}
        />
      </td>
      <td>{m.nombre}</td>

      <td>{m.activo &&
        <CampoNumerico
          value={m.costoUnitarioInf}
          suffix={` USD/${m.unidad}`}
          onValueChange={e => editarMedicamento(id, 'costoUnitarioInf', e.floatValue)}
        />
      }</td>
      <td>{m.activo &&
        <CampoNumerico
          value={m.costoUnitarioSup}
          suffix={` USD/${m.unidad}`}
          onValueChange={e => editarMedicamento(id, 'costoUnitarioSup', e.floatValue)}
        />
      }</td>
      {!esBaño &&
        <td>{m.activo && m.presentacion + ' %'}</td>
      }
      { esBaño &&
        <td>{m.activo &&
          <CampoNumerico
            value={m.volumen === undefined ? volumenJaulaOriginal : m.volumen}
            suffix={' m3'}
            onValueChange={e => editarMedicamento(id, 'volumen', e.floatValue)}
          />
        }</td>
      }
      <td>{m.activo &&
        <CampoNumerico
          value={esBaño ? m.cantidadPorJaula : m.dosis}
          suffix={` ${m.unidadDosis}`}
          onValueChange={e => editarMedicamento(id, esBaño ? 'cantidadPorJaula' : 'dosis', e.floatValue)}
        />
      }</td>
      <td>{m.activo &&
        <CampoNumerico
          value={m.costoOperacional}
          suffix={esBaño ? ' USD' : ' USD/ton'}
          onValueChange={e => editarMedicamento(id, 'costoOperacional', e.floatValue)}
        />
      }</td>
      <td>{m.activo &&
        <CampoNumerico
          value={m.mortalidad}
          suffix={m.mortalidad >= 1 ? (m.mortalidad === 1 ? ' pez' : ' peces') : ' %'}
          onValueChange={e => editarMedicamento(id, 'mortalidad', e.floatValue)}
        />
      }</td>
    </tr>
  );
};

const mapStateToProps = state => ({
  medicamentos: state.tratamientos.medicamentos,
  volumenJaulaOriginal: state.produccion.volumenJaula
})

const mapDispatchToProps = dispatch => ({
  editarMedicamento: (id, propiedad, valor) => dispatch(tratamientosActions.editarMedicamento(id, propiedad, valor))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilaMedicamento);