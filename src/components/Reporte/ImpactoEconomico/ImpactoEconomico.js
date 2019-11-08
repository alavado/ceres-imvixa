import React from 'react';
import { redondear } from '../../../helpers/helpers';

const ImpactoEconomico = props => {

  const {
      costoMarginalBañosImvixa, costoMarginalBañosTradicional,
      costoAyunoImvixa, costoAyunoTradicional,
      costoEmamectinaImvixa, costoEmamectinaTradicional,
      costoImvixaImvixa, costoImvixaTradicional,
      costoProduccionSinAyunoImvixa, costoProduccionSinAyunoTradicional
    } = props

  const lenguetas = [
    {
      nombre: 'Baños',
      imvixa: costoMarginalBañosImvixa,
      tradicional: costoMarginalBañosTradicional
    },
    {
      nombre: 'Ayunos',
      imvixa: costoAyunoImvixa,
      tradicional: costoAyunoTradicional
    },
    {
      nombre: 'Emamectina',
      imvixa: costoEmamectinaImvixa,
      tradicional: costoEmamectinaTradicional
    },
    {
      nombre: 'Imvixa',
      imvixa: costoImvixaImvixa,
      tradicional: costoImvixaTradicional
    },
    {
      nombre: 'Producción',
      imvixa: costoProduccionSinAyunoImvixa,
      tradicional: costoProduccionSinAyunoTradicional
    }
  ]

  const anchoMaximoLengueta = 120
  const anchoMaximoLenguetaColoreada = 100
  const totalImvixa = lenguetas.reduce((sum, x) => x.imvixa + sum, 0)
  const totalTradicional = lenguetas.reduce((sum, x) => x.tradicional + sum, 0)

  return (
    <>
      <h2>2. IMPACTO ECONÓMICO</h2>
      <div id="comparacion">
        <div>
          <h3>ESTRATEGIA 1</h3>
          {lenguetas.map((lengueta, i) => {
            const anchoLengueta = (i < 4 ? 3: 1) * (lengueta.tradicional / totalTradicional) * anchoMaximoLenguetaColoreada
            const round = i < 4 ? 3 : 3
            return (
              <div key={`lengueta-tradicional-${i}`}>
                <div className="lengueta" style={{
                  width: anchoLengueta,
                  marginLeft: 16 + anchoMaximoLengueta - anchoLengueta
                }}></div>
                <div className="valor">
                  {lengueta.tradicional > 0 && redondear(lengueta.tradicional, round)}
                </div>
              </div>
            )
          })}
          <div>
            <div className="lengueta" style={{
                width: anchoMaximoLenguetaColoreada,
                marginLeft: 36
              }}></div>
            <div className="valor">
              {redondear(totalTradicional, 2)}
            </div>
          </div>
        </div>
        <div>
          <h3>COSTO USD/KG EX-JAULA</h3>
          {lenguetas.map((lengueta, i) => (
            <div key={`lengueta-central-${i}`}>
              {lengueta.nombre}
            </div>
          ))}
          <div>Costo marginal USD/KG<br /> ex-jaula</div>
        </div>
        <div>
        <h3>ESTRATEGIA 2</h3>
        {lenguetas.map((lengueta, i) => {
          const anchoLengueta = (i < 4 ? 3: 1) * (lengueta.imvixa / totalImvixa) * anchoMaximoLenguetaColoreada
          const round = i < 4 ? 3 : 3
          return (
            <div key={`lengueta-tradiconal-${i}`}>
              <div className="lengueta" style={{
                width: anchoLengueta
              }}></div>
              <div className="valor">
                {lengueta.imvixa > 0 && redondear(lengueta.imvixa, round)}
              </div>
            </div>
          )
        })}
        <div>
          <div className="lengueta" style={{
            width: anchoMaximoLenguetaColoreada
            }}></div>
            <div className="valor">
              {redondear(totalImvixa, 2)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImpactoEconomico;