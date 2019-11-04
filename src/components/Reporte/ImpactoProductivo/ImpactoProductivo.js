import React from 'react';
import { useSelector } from 'react-redux'
import { OBJETIVO_PESO } from '../../../helpers/constantes';
import { redondear } from '../../../helpers/helpers';

const ImpactoProductivo = ({curvaImvixa, curvaTradicional, biomasaImvixa, biomasaTradicional}) => {

  const produccion = useSelector(state => state.produccion)
  const { objetivos } = produccion
  
  return (
    <div id="contenido-resumen-reporte">
    <h2>1. IMPACTO PRODUCTIVO</h2>
    <div id="cuadros-reporte-estrategias">
      <div id="fondo-reporte-estrategia-b">
        <h1>Estrategia 1</h1>
        <div className="resultados-reporte-estrategia">
          {objetivos.includes(OBJETIVO_PESO) ?
            <>
              <h2>{redondear(curvaTradicional.length / 30.0)}</h2>
              <p>meses para alcanzar el peso de cosecha</p>
              <h2>{redondear(biomasaTradicional / 1000, 0)}</h2>
              <p>Ton</p>
            </> :
            <>
              <h2>{redondear(curvaTradicional[curvaTradicional.length - 1] / 1000.0, 2)}</h2>
              <p>kg a la cosecha</p>
            </> // falta la biomasa cosechada en toneladas en cada cuadrito y la tercera columna el diferencial
          }
        </div>
      </div>
      <div id="fondo-reporte-estrategia-a">
        <h1>Estrategia 2</h1>
        <div className="resultados-reporte-estrategia">
          {objetivos.includes(OBJETIVO_PESO) ?
            <>
              <h2>{redondear(curvaImvixa.length / 30.0)}</h2>
              <p>meses para alcanzar el peso de cosecha</p>
              <h2>{redondear(biomasaImvixa / 1000, 0)}</h2>
              <p>Ton</p>
            </> :
            <>
              <h2>{redondear(curvaImvixa[curvaImvixa.length - 1] / 1000.0, 2)}</h2>
              <p>kg a la cosecha</p>
            </>
          }
        </div>
      </div>
    </div>
  </div>
  );
};

export default ImpactoProductivo;