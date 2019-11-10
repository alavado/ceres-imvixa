import React from 'react';
import GraficoPTI from '../GraficoPTI';
import { redondearYAString } from '../../../helpers/helpers';
import './../Anexos/Anexos.css'

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
            <td>{redondearYAString(ptiTradicional.suma)}</td>
            <td>{redondearYAString(ptiImvixa.suma)}</td>
            <td>{13.0}</td>
            <td>{ptiTradicional.suma - 13 <= 0 ? 'OK' : redondearYAString(ptiTradicional.suma - 13)}</td>
            <td>{ptiImvixa.suma - 13 <= 0 ? 'OK' : redondearYAString(ptiImvixa.suma - 13)}</td>
          </tr>
        </tbody>
      </table>
      <GraficoPTI
        ptiImvixa={ptiImvixa.suma}
        ptiTradicional={ptiTradicional.suma}
      />
      <div className="nota">
        Fuente: Cálculo simulador Ceres-Imvixa según criterio de cálculo del PTI del ASC, basado en la estrategias de tratamientos indicadas por el usuario.
      </div>
    </>
  );
};

export default ImpactoCertificacion;