import React from 'react';
import './GraficoWNMT.css'
import logoASC from '../../../assets/asc-label-landscape.svg'
import { redondearYAString } from '../../../helpers/helpers';

const GraficoWNMT = ({ numeroBañosImvixa, numeroBañosTradicional }) => {

  const anchoBarra = 600
  const maxNumBaños = 15
  const posicionImvixa = anchoBarra / maxNumBaños *  (maxNumBaños - numeroBañosImvixa)
  const posicionTradicional = anchoBarra / maxNumBaños * (maxNumBaños - numeroBañosTradicional)
  return (
    <div id="grafico-wnmt">
      <div id="contenedor-marcadores-wnmt" style={{ width: anchoBarra }}>
        <div id="indicador-wnmt-imvixa" style={{ marginLeft:posicionImvixa }}>
          <p>Estrategia 2<br />(WNMT: {numeroBañosImvixa})</p>
          <span></span>
        </div>
        <div id="indicador-wnmt-tradicional" style={{ marginLeft: posicionTradicional }}>
          <p>Estrategia 1<br />(WNMT: {numeroBañosTradicional})</p>
          <span></span>
        </div>
        <div id="logo-asc" style={{ marginLeft: anchoBarra }}>
          <img src={logoASC} alt="logo asc" />
        </div>
      </div>
      <div id="barra-wnmt" style={{ width: anchoBarra }}></div>
      <div id="barra-wnmt-labels" style={{ width: anchoBarra*1.5 }}>
        <div className="barra-wnmt-label" style={{ marginLeft: anchoBarra *0.75, color:'#7cdad3'}}>Entry Level</div>
        <div className="barra-wnmt-label" style={{ marginLeft: anchoBarra * 0.08, color:'#12b4aa'}}>Global Level</div>
      </div>
    </div>
  );
};

export default GraficoWNMT;