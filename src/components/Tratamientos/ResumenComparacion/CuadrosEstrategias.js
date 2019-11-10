import React from 'react';
import { OBJETIVO_PESO, OBJETIVO_FECHA } from '../../../helpers/constantes';
import { redondearYAString } from '../../../helpers/helpers';

const CuadrosEstrategias = ({ objetivos, curvaImvixa, curvaTradicional, pesoObjetivo, mesesObjetivo }) => {

  let contenidoEstrategiaTradicional, contenidoEstrategiaImvixa

  if (objetivos.includes(OBJETIVO_PESO) && objetivos.includes(OBJETIVO_FECHA)) {
    contenidoEstrategiaTradicional = 
      <>
        <p>{`Los ${redondearYAString(pesoObjetivo / 1000, 1)} kg se alcanzan a los ${(Math.round(10 * curvaTradicional.length / 30.0) / 10.0).toLocaleString(undefined, { minimumFractionDigits: 1})} meses`}</p>
        <p>{`A los ${mesesObjetivo} meses, el peso alzanzado es de ${(Math.round(10 * curvaTradicional[mesesObjetivo * 30 - 1]) / 10000.0).toLocaleString(undefined, { minimumFractionDigits: 1})}`}</p>
      </>
    contenidoEstrategiaImvixa = 
      <>
        <p>{`Los ${redondearYAString(pesoObjetivo / 1000, 1)} kg se alcanzan a los ${(Math.round(10 * curvaImvixa.length / 30.0) / 10.0).toLocaleString(undefined, { minimumFractionDigits: 1})} meses`}</p>
        <p>{`A los ${mesesObjetivo} meses, el peso alzanzado es de ${(Math.round(10 * curvaImvixa[mesesObjetivo * 30 - 1]) / 10000.0).toLocaleString(undefined, { minimumFractionDigits: 1})}`}</p>
      </>
  }
  else if (objetivos.includes(OBJETIVO_PESO)) {
    contenidoEstrategiaTradicional =
      <>
        <h2>{(Math.round(10 * curvaTradicional.length / 30.0) / 10.0).toLocaleString(undefined, { minimumFractionDigits: 1})}</h2>
        <p>meses para alcanzar el peso de cosecha</p>
      </>
    contenidoEstrategiaImvixa =
      <>
        <h2>{(Math.round(10 * curvaImvixa.length / 30.0) / 10.0).toLocaleString(undefined, { minimumFractionDigits: 1})}</h2>
        <p>meses para alcanzar el peso de cosecha</p>
      </>
  }
  else {
    contenidoEstrategiaTradicional =
      <>
        <h2>{(Math.round(.1 * curvaTradicional[curvaTradicional.length - 1]) / 100.0).toLocaleString(undefined, { minimumFractionDigits: 1})}</h2>
        <p>kg a la cosecha</p>
      </>
    contenidoEstrategiaImvixa =
      <>
        <h2>{(Math.round(.1 * curvaImvixa[curvaImvixa.length - 1]) / 100.0).toLocaleString(undefined, { minimumFractionDigits: 1})}</h2>
        <p>kg a la cosecha</p>
      </>
  }

  return (
    <div id="cuadros-estrategias">
      <div id="fondo-estrategia-b">
        <h1>Estrategia 1</h1>
          <div className="resultados-estrategia">
            {contenidoEstrategiaTradicional}
          </div>
      </div>
      <div id="fondo-estrategia-a">
        <h1>Estrategia 2</h1>
          <div className="resultados-estrategia">
            {contenidoEstrategiaImvixa}
          </div>
      </div>
    </div>
  )
}

export default CuadrosEstrategias;