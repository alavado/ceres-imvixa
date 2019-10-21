import React from 'react';
import { connect } from 'react-redux'
import CampoNumerico from '../../Produccion/CampoNumerico';
import { FARMACO_APLICACION_BAÑO } from '../../../helpers/constantes';
import tratamientosActions from '../../../redux/tratamientos/actions';

const FilaMedicamento = ({id, activarMedicamento, editarMedicamento, medicamentos}) => {

  const m = medicamentos.find(m => m.id === id)

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
      <td>{m.principioActivo}</td>
      <td>{m.activo &&
        <CampoNumerico
          value={m.costoUnitario}
          suffix={m.formaFarmaceutica === FARMACO_APLICACION_BAÑO ? ' USD/lt' : ' USD/kg'}
          onValueChange={e => editarMedicamento(id, 'costoUnitario', e.floatValue)}
        />
      }</td>
      <td>{m.activo &&
        <CampoNumerico
          value={m.cantidadPorJaula}
          suffix={m.formaFarmaceutica === FARMACO_APLICACION_BAÑO ? ' lt' : ' kg'}
          onValueChange={e => editarMedicamento(id, 'cantidadPorJaula', e.floatValue)}
        />
      }</td>
      <td>{m.activo &&
        <CampoNumerico
          value={m.costoOperacional}
          suffix={' USD'}
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
})

const mapDispatchToProps = dispatch => ({
  editarMedicamento: (id, propiedad, valor) => dispatch(tratamientosActions.editarMedicamento(id, propiedad, valor))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilaMedicamento);