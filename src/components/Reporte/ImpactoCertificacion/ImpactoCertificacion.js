import React from 'react';
import GraficoPTI from '../GraficoPTI';
import { redondearYAString } from '../../../helpers/helpers';
import './../Anexos/Anexos.css'
import './ImpactosCertificacion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const ImpactoCertificacion = ({numeroBañosTradicional, numeroBañosImvixa}) => {
  return (
    <div id="impactos-certificacion">
      <h2>4. IMPACTOS DE CERTIFICACIÓN</h2>
      <h3>4.1 Distancia entre Weighted Number of Medicinal Treatments (WNMT) y óptimos ASC </h3>
      <table className="tabla-reporte-certificacion">
        <thead>
          <tr>
            <th></th>
            <th>WNMT</th>
            <th>Certificación ASC</th>
            <th>Reducción de baños para llegar a Entry Level</th>
            <th>Reducción de baños para llegar a Global Level</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Estrategia 1</td>
            <td>{numeroBañosTradicional}</td>
            <td>{numeroBañosTradicional <= 3 ? 'Global Level' : numeroBañosTradicional <= 9 ? 'Entry Level' : <FontAwesomeIcon icon={faTimesCircle} size="lg" style={{marginRight: 4, color:'#B22222'}}/>}</td>
            <td>{numeroBañosTradicional <= 9 ?  <FontAwesomeIcon icon={faCheckCircle} size="lg" style={{marginRight: 4, color:'green'}}/> : numeroBañosTradicional - 9}</td>
            <td>{numeroBañosTradicional <= 3 ? <FontAwesomeIcon icon={faCheckCircle} size="lg" style={{marginRight: 4, color:'green'}}/> : numeroBañosTradicional - 3}</td>
          </tr>
          <tr>
            <td>Estrategia 2</td>
            <td>{numeroBañosImvixa}</td>
            <td>{numeroBañosImvixa <= 3 ? 'Global Level' :numeroBañosImvixa <= 9 ? 'Entry Level' :  <FontAwesomeIcon icon={faTimesCircle} size="lg" style={{marginRight: 4, color:'#B22222'}}/>}</td>
            <td>{numeroBañosImvixa <= 9 ? <FontAwesomeIcon icon={faCheckCircle} size="lg" style={{marginRight: 4, color:'green'}}/> : numeroBañosImvixa - 9}</td>
            <td>{numeroBañosImvixa <= 3 ? <FontAwesomeIcon icon={faCheckCircle} size="lg" style={{marginRight: 4, color:'green'}} /> : numeroBañosImvixa- 3}</td>
          </tr>
        </tbody>
      </table>
      <GraficoPTI
        ptiImvixa={numeroBañosImvixa}
        ptiTradicional={numeroBañosTradicional}
      />
      <div className="nota">
        Fuente: Cálculo Simulador VisiOn basado en la estrategias de tratamientos indicadas por el usuario, según criterio de cálculo del WNMT del ASC. <br/>ASC Salmon Standard Version 1.3.
      </div>
    </div>
  );
};

export default ImpactoCertificacion;