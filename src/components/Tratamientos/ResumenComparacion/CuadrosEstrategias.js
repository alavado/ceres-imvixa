import React from 'react';
import { OBJETIVO_PESO } from '../../../helpers/constantes';

const CuadrosEstrategias = ({ objetivos, curvaImvixa, curvaTradicional }) => {

  return objetivos.includes(OBJETIVO_PESO) ?
    <div id="cuadros-estrategias">
      <div id="fondo-estrategia-b">
        <h1>Estrategia 1</h1>
          <div className="resultados-estrategia">
            <h2>{(Math.round(10 * curvaTradicional.length / 30.0) / 10.0).toLocaleString(undefined, { minimumFractionDigits: 1})}</h2>
            <p>meses para alcanzar el peso de cosecha</p>
          </div>
      </div>
      <div id="fondo-estrategia-a">
        <h1>Estrategia 2</h1>
          <div className="resultados-estrategia">
            <h2>{(Math.round(10 * curvaImvixa.length / 30.0) / 10.0).toLocaleString(undefined, { minimumFractionDigits: 1})}</h2>
            <p>meses para alcanzar el peso de cosecha</p>
          </div>
      </div>
    </div> :
    <div id="cuadros-estrategias">
      <div id="fondo-estrategia-b">
        <h1>Estrategia 1</h1>
          <div className="resultados-estrategia">
            <h2>{(Math.round(.1 * curvaTradicional[curvaTradicional.length - 1]) / 100.0).toLocaleString(undefined, { minimumFractionDigits: 1})}</h2>
            <p>kg a la cosecha</p>
          </div>
      </div>
      <div id="fondo-estrategia-a">
        <h1>Estrategia 2</h1>
          <div className="resultados-estrategia">
            <h2>{(Math.round(.1 * curvaImvixa[curvaImvixa.length - 1]) / 100.0).toLocaleString(undefined, { minimumFractionDigits: 1})}</h2>
            <p>kg a la cosecha</p>
          </div>
      </div>
    </div>
}

export default CuadrosEstrategias;