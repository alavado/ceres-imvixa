import React from 'react';
import GraficoWNMT from '../GraficoWNMT';
import { redondearYAString } from '../../../helpers/helpers';
import './../Anexos/Anexos.css'
import './ImpactosCertificacion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const filaTablaCertificacion = (nombre, numeroBaños) => {
  return (
  <tr>
    <td>{nombre}</td>
    <td>{numeroBaños}</td>
    <td>{numeroBaños <= 3 ? 'Global Level' : numeroBaños <= 9 ? 'Entry Level' : <FontAwesomeIcon icon={faTimesCircle} size="lg" style={{marginRight: 4, color:'#B22222'}}/>}</td>
    <td>{numeroBaños <= 9 ?  <FontAwesomeIcon icon={faCheckCircle} size="lg" style={{marginRight: 4, color:'green'}}/> :  <div><FontAwesomeIcon icon={faArrowDown} style={{marginRight: 4, color:'#B22222'}} /> {numeroBaños - 9} baños</div>}</td>
    <td>{numeroBaños <= 3 ? <FontAwesomeIcon icon={faCheckCircle} size="lg" style={{marginRight: 4, color:'green'}}/> : <div><FontAwesomeIcon icon={faArrowDown} style={{marginRight: 4, color:'#B22222'}} /> {numeroBaños - 3} baños</div>}</td>
  </tr>
  )
}
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
          {filaTablaCertificacion('Estrategia 1', numeroBañosTradicional)}
          {filaTablaCertificacion('Estrategia 2', numeroBañosImvixa)}
        </tbody>
      </table>
      <GraficoWNMT
        numeroBañosImvixa={numeroBañosImvixa}
        numeroBañosTradicional={numeroBañosTradicional}
      />
      <div className="nota">
        Fuente: Cálculo Simulador VisiOn basado en las estrategias de tratamientos indicadas por el usuario, según criterio de cálculo del WNMT del ASC. <br/>ASC Salmon Standard Version 1.3.
      </div>
    </div>
  );
};

export default ImpactoCertificacion;