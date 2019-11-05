import React from 'react';
import GraficoPTI from '../GraficoPTI';
import { redondear } from '../../../helpers/helpers';

const ImpactoCertificacion = ({ptiTradicional, ptiImvixa}) => {
  return (
    <>
      <h2>4. IMPACTOS DE CERTIFICACIÓN</h2>
      <h3>4.1 Distancia entre óptimo ASC y posición REGULACIÓN</h3>
      <table className="tabla-reporte">
        <thead>
          <tr>
            <th></th>
            <th>Estrategia 1</th>
            <th>Estrategia 2</th>
            <th>Certificación ASC</th>
            <th>Distancia a certificación estrategia 1</th>
            <th>Distancia a certificación estrategia 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Indíce de tratamiento antiparasitario (PTI)</td>
            <td>{redondear(ptiTradicional.suma)}</td>
            <td>{redondear(ptiImvixa.suma)}</td>
            <td>{13.0}</td>
            <td>{redondear(ptiTradicional.suma - 13)}</td>
            <td>{ptiImvixa.suma - 13 <= 0 ? 'OK' : redondear(ptiImvixa.suma - 13)}</td>
          </tr>
        </tbody>
      </table>
      <GraficoPTI
        ptiImvixa={ptiImvixa.suma}
        ptiTradicional={ptiTradicional.suma}
      />
    </>
  );
};

export default ImpactoCertificacion;