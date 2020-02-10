import React from 'react';
import { redondearYAString } from '../../../helpers/helpers';
import './../Anexos/Anexos.css'
import { TIPO_CAMBIO_DOLAR, SUFIJO_TIPO_CAMBIO_DOLAR, SUFIJO_TIPO_CAMBIO_PESO } from '../../../helpers/constantes';

const ImpactoEconomico = props => {

  const {
      costoMarginalBañosImvixa, costoMarginalBañosTradicional,
      costoAyunoImvixa, costoAyunoTradicional,
      costoOtrosImvixa, costoOtrosTradicional,
      costoImvixaImvixa, costoImvixaTradicional,
      costoProduccionSinAyunoImvixa, costoProduccionSinAyunoTradicional,
      valorDolar, tipoCambio
    } = props

  const usarDolares = tipoCambio === TIPO_CAMBIO_DOLAR
  const sufijoTipoCambio = usarDolares ? SUFIJO_TIPO_CAMBIO_DOLAR : SUFIJO_TIPO_CAMBIO_PESO
  const multiplicadorCambio = usarDolares ? 1 : valorDolar

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
      nombre: 'Imvixa',
      imvixa: costoImvixaImvixa,
      tradicional: costoImvixaTradicional
    },
    {
      nombre: 'Otros tratamientos orales',
      imvixa: costoOtrosImvixa,
      tradicional: costoOtrosTradicional
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
            const round = usarDolares ? (i < 4 ? 3 : 3) : 0
            return (
              <div key={`lengueta-tradicional-${i}`}>
                <div className="lengueta" style={{
                  width: anchoLengueta,
                  marginLeft: 16 + anchoMaximoLengueta - anchoLengueta
                }}></div>
                <div className="valor">
                  {lengueta.tradicional > 0 && redondearYAString(multiplicadorCambio * lengueta.tradicional, round)}
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
              {redondearYAString(multiplicadorCambio * totalTradicional, usarDolares ? 3 : 0)}
            </div>
          </div>
        </div>
        <div>
          <h3>COSTO {sufijoTipoCambio}/KG EX-JAULA</h3>
          {lenguetas.map((lengueta, i) => (
            <div key={`lengueta-central-${i}`}>
              {lengueta.nombre}
            </div>
          ))}
          <div>Costo marginal {sufijoTipoCambio}/KG<br /> ex-jaula</div>
        </div>
        <div>
        <h3>ESTRATEGIA 2</h3>
        {lenguetas.map((lengueta, i) => {
          const anchoLengueta = (i < 4 ? 3: 1) * (lengueta.imvixa / totalImvixa) * anchoMaximoLenguetaColoreada
          const round = usarDolares ? (i < 4 ? 3 : 3) : 0
          return (
            <div key={`lengueta-tradiconal-${i}`}>
              <div className="lengueta imvixa" style={{
                width: anchoLengueta
              }}></div>
              <div className="valor">
                {lengueta.imvixa > 0 && redondearYAString(multiplicadorCambio * lengueta.imvixa, round)}
              </div>
            </div>
          )
        })}
        <div>
          <div className="lengueta imvixa-grande" style={{
            width: anchoMaximoLenguetaColoreada
            }}></div>
            <div className="valor">
              {redondearYAString(multiplicadorCambio * totalImvixa, usarDolares ? 3 : 0)}
            </div>
          </div>
        </div>
      </div>
      <div className="nota">
        <p>[1] Costo baños, Emamectina e Imvixa considera el costo del producto y el costo operacional de aplicarlo.</p>
        <p>[2] Costo ayuno considera todos los costos promedio de producción de 1 día ciclo, excluye costos alimento y control de cáligus.</p> 
      </div>
    </>
  );
};

export default ImpactoEconomico;