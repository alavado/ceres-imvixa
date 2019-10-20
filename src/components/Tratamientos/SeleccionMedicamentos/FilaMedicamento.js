import React from 'react';
import { connect } from 'react-redux'
import CampoNumerico from '../../Produccion/CampoNumerico';

const FilaMedicamento = ({id, activarMedicamento, medicamentos}) => {

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
      <td>{m.activo && <CampoNumerico value={m.costoUnitario} suffix={' USD'} />}</td>
      <td>{m.activo && <CampoNumerico value={m.costoOperacional} suffix={' USD'} />}</td>
      <td>{m.activo && <CampoNumerico value={m.mortalidad} suffix={' %'} />}</td>
    </tr>
  );
};

const mapStateToProps = state => ({
  medicamentos: state.tratamientos.medicamentos,
})

export default connect(mapStateToProps)(FilaMedicamento);