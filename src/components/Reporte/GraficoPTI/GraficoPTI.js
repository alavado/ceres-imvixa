import React from 'react';
import './GraficoPTI.css'

const GraficoPTI = ({ ptiImvixa, ptiTradicional }) => {

  const anchoBarra = 600

  return (
    <div id="grafico-pti">
      <div id="contenedor-marcadores-pti" style={{ width: anchoBarra }}>
        <div id="pti-tradicional" style={{ marginLeft: 0 }}>Tradicional</div>
        <div id="pti-imvixa" style={{ marginLeft: anchoBarra * ptiImvixa / ptiTradicional }}>Imvixa</div>
        <div id="pti-objetivo" style={{ marginLeft: anchoBarra }}>Certificación ASC</div>
      </div>
      <div id="barra-pti" style={{ width: anchoBarra }}>
        
      </div>
    </div>
  );
};

export default GraficoPTI;