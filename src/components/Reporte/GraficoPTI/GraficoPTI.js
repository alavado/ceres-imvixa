import React from 'react';
import './GraficoPTI.css'
import logoASC from '../../../assets/asc-label-landscape.svg'
import { redondear } from '../../../helpers/helpers';

const GraficoPTI = ({ ptiImvixa, ptiTradicional }) => {

  const anchoBarra = 600

  return (
    <div id="grafico-pti">
      <div id="contenedor-marcadores-pti" style={{ width: anchoBarra }}>
        <div id="indicador-pti-imvixa" style={{ marginLeft: anchoBarra * (ptiTradicional - ptiImvixa) / ptiTradicional }}>
          <p>Estrategia 2<br />(PTI {redondear(ptiImvixa, 1)})</p>
          <span></span>
        </div>
        <div id="indicador-pti-tradicional" style={{ marginLeft: 0 }}>
          <p>Estrategia 1<br />(PTI {redondear(ptiTradicional, 1)})</p>
          <span></span>
        </div>
        <div id="logo-asc" style={{ marginLeft: anchoBarra }}>
          <img src={logoASC} alt="logo asc" />
        </div>
      </div>
      <div id="barra-pti" style={{ width: anchoBarra }}>
      </div>
    </div>
  );
};

export default GraficoPTI;