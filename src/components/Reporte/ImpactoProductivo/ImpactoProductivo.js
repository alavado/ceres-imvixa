import React from 'react';
import { useSelector } from 'react-redux'
import { OBJETIVO_PESO, OBJETIVO_FECHA } from '../../../helpers/constantes';
import { redondear } from '../../../helpers/helpers';
import './ImpactoProductivo.css'

const ImpactoProductivo = ({curvaImvixa, curvaTradicional, biomasaImvixa, biomasaTradicional}) => {

  const produccion = useSelector(state => state.produccion)
  const { objetivos } = produccion
  
  return (
    <div id="impacto-productivo">
      <h2>1. IMPACTO PRODUCTIVO</h2>
      <div id="tabla-impacto-productivo">
        <div className="columna-impacto-productivo">
          <h1>Estrategia 1</h1>
          <div className="indicadores-impacto-productivo">
            {objetivos.includes(OBJETIVO_PESO) && objetivos.includes(OBJETIVO_FECHA) ?
              <>
                <h2>{redondear(curvaTradicional.length / 30.0)}</h2>
                <p>meses ciclo</p>
                <h2>{redondear(curvaTradicional[curvaTradicional.length - 1] / 1000.0, 2)}</h2>
                <p>kg a la cosecha</p>
                <h2>{redondear(biomasaTradicional / 1000, 0)}</h2>
                <p>toneladas cosechadas</p>
              </> :
              objetivos.includes(OBJETIVO_PESO) ?
              <>
                <h2>{redondear(curvaImvixa.length / 30.0)}</h2>
                <p>meses ciclo</p>
                <h2>{redondear(biomasaImvixa / 1000, 0)}</h2>
                <p>toneladas cosechadas</p>
              </> :
              <>
                <h2>{redondear(curvaTradicional[curvaTradicional.length - 1] / 1000.0, 2)}</h2>
                <p>kg a la cosecha</p>
                <h2>{redondear(biomasaTradicional / 1000, 0)}</h2>
                <p>toneladas cosechadas</p>
              </> // falta la biomasa cosechada en toneladas en cada cuadrito y la tercera columna el diferencial
            }
          </div>
        </div>
        <div className="columna-impacto-productivo">
          <h1>Estrategia 2</h1>
          <div className="indicadores-impacto-productivo">
            {objetivos.includes(OBJETIVO_PESO) && objetivos.includes(OBJETIVO_FECHA)?
              <>
                <h2>{redondear(curvaImvixa.length / 30.0)}</h2>
                <p>meses ciclo</p>
                <h2>{redondear(curvaImvixa[curvaImvixa.length - 1] / 1000.0, 2)}</h2>
                <p>kg a la cosecha</p>
                <h2>{redondear(biomasaImvixa / 1000, 0)}</h2>
                <p>toneladas cosechadas</p>
              </> :
              objetivos.includes(OBJETIVO_PESO) ?
              <>
                <h2>{redondear(curvaImvixa.length / 30.0)}</h2>
                <p>meses ciclo</p>
                <h2>{redondear(biomasaImvixa / 1000, 0)}</h2>
                <p>toneladas cosechadas</p>
              </> :
              <>
                <h2>{redondear(curvaImvixa[curvaImvixa.length - 1] / 1000.0, 2)}</h2>
                <p>kg a la cosecha</p>
                <h2>{redondear(biomasaImvixa / 1000, 0)}</h2>
                <p>toneladas cosechadas</p>
              </>
            }
          </div>
        </div>
        <div className="columna-impacto-productivo">
          <h1>Diferencia (E2 - E1)</h1>
          <div className="indicadores-impacto-productivo">
            {objetivos.includes(OBJETIVO_PESO) && objetivos.includes(OBJETIVO_FECHA)?
              <>
                <h2>{redondear(-curvaTradicional.length / 30.0 + curvaImvixa.length / 30.0)}</h2>
                <p>meses</p>
                <h2>{redondear(-curvaTradicional[curvaImvixa.length - 1] / 1000.0 + curvaImvixa[curvaImvixa.length - 1] / 1000.0, 2)}</h2>
                <p>kg a {redondear(curvaImvixa.length / 30.0)} meses</p>
                <h2>{redondear(-biomasaTradicional / 1000 + biomasaImvixa / 1000, 0)}</h2>
                <p>toneladas cosechadas</p>
              </> :
              objetivos.includes(OBJETIVO_PESO) ?
              <>
                <h2>{redondear(-curvaTradicional.length / 30.0 + curvaImvixa.length / 30.0)}</h2>
                <p>meses</p>
                <h2>{redondear(-biomasaTradicional / 1000 + biomasaImvixa / 1000, 0)}</h2>
                <p>toneladas cosechadas</p>
              </> :
              <>
                <h2>{redondear(-curvaTradicional[curvaImvixa.length - 1] / 1000.0 + curvaImvixa[curvaImvixa.length - 1] / 1000.0, 2)}</h2>
                <p>kg</p>
                <h2>{redondear(-biomasaTradicional / 1000 + biomasaImvixa / 1000, 0)}</h2>
                <p>toneladas cosechadas</p>
              </>
            }
          </div>
        </div>
      </div>
    </div>
    );
};

export default ImpactoProductivo;