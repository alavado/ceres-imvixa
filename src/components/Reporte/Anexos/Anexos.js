import React from 'react';
import { redondearYAString } from '../../../helpers/helpers';
import './Anexos.css'

const Anexos = props => {
  const {estructuraCostos, ptiTradicional, ptiImvixa, costoSmolts,
    costoTotalAlimentoImvixa, costoTotalAlimentoTradicional,
    costoProduccionImvixa, costoProduccionTradicional
    } = props
  const costoTotalImvixa = costoSmolts + costoTotalAlimentoImvixa + costoProduccionImvixa
  const costoTotalTradicional = costoSmolts + costoTotalAlimentoTradicional + costoProduccionTradicional

  const estructuraCostosModificada = {
    'Alimento' : {
      1 : costoTotalAlimentoTradicional,
      2 : costoTotalAlimentoImvixa
    },
    'Smolts' : {
      1 : costoSmolts,
      2 : costoSmolts
    },
    'Personal' : {
      1 : costoTotalTradicional * estructuraCostos['personal'] / 100,
      2 : costoTotalImvixa * estructuraCostos['personal'] / 100
    },
    'Operaciones' : {
      1 : costoTotalTradicional * estructuraCostos['operaciones'] / 100,
      2 : costoTotalImvixa * estructuraCostos['operaciones'] / 100
    },
    'Depreciación' : {
      1 : costoTotalTradicional * estructuraCostos['depreciación'] / 100,
      2 : costoTotalImvixa * estructuraCostos['depreciación'] / 100
    },
    'Sanidad' : {
      1 : costoTotalTradicional * estructuraCostos['sanidad'] / 100,
      2 : costoTotalImvixa * estructuraCostos['sanidad'] / 100
    },
    'Seguros' : {
      1 : costoTotalTradicional * estructuraCostos['seguros'] / 100,
      2 : costoTotalImvixa * estructuraCostos['seguros'] / 100
    },
    'Otros' : {
      1 : costoTotalTradicional * estructuraCostos['otros'] / 100,
      2 : costoTotalImvixa * estructuraCostos['otros'] / 100
    }
  }
  return (
    <div id="anexos">
      <h2>Anexos</h2>
      <h3>Estructura costos ex-jaula por centro</h3>
      <table id="reporte-estructura-costos">
        <thead>
          <tr>
            <th>Ítem</th>
            <th>Estrategia 1</th>
            <th>Estrategia 2</th>
            <th>Diferencia (E2 - E1)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(estructuraCostosModificada).map((elemento, i) => (
            <tr key={`fila-estructura-costos-anexos-${i}`}>
              <td>{elemento}</td>
              <td>
                <div>
                    {redondearYAString(estructuraCostosModificada[elemento][1], 0)} USD
                </div>
              </td>
              <td>
                <div>
                    {redondearYAString(estructuraCostosModificada[elemento][2], 0)} USD
                </div>
              </td>
              <td>
                <div>
                    {redondearYAString(estructuraCostosModificada[elemento][2] - estructuraCostosModificada[elemento][1], 0)} USD 
                </div>
              </td>
            </tr> 
          ))}
          <tr>
            <td>Total</td>
            <td>{redondearYAString(costoTotalTradicional, 0)} USD</td>
            <td>{redondearYAString(costoTotalImvixa, 0)} USD</td>
            <td>{redondearYAString(costoTotalImvixa - costoTotalTradicional, 0)} USD</td>
          </tr>
        </tbody>
      </table>
      <div className="nota">
        <p>
          * El costo de los smolts y el costo por kg de alimento es entregado por el usuario. 
          El costo total del alimento a nivel de centro se calcula estimando la cantidad de alimento necesaria para obtener el crecimiento que alcanzan los salmones. 
          Para los otros ítems se utiliza un porcentaje de referencia sobre el total de costos.
        </p>
        <p>
          ** Las diferencias en alimento se ven afectadas por el peso final de cada estrategia y el largo del ciclo. Las diferencias en el resto de los ítems dependen del largo del ciclo productivo.
        </p>
      </div>
      <h3>Detalle de estrategias antiparasitarias</h3>
      <div id="tratamientos-resumen">
        <div className="estrategia-resumen">
          <h3>Tratamientos estrategia 1</h3>
          <table className="tabla-reporte">
            <thead>
              <tr>
                <th>Semana</th>
                <th>Principio activo</th>
              </tr>
            </thead>
            <tbody>
              {ptiTradicional.trataciones.map((elemento, i) => (
              <tr key={`fila-pti-tradicional-${i}`}>
                <td>{elemento.semana === '0' ? 'Antes de mar' : elemento.semana}</td>
                <td>{elemento.principioActivo}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="estrategia-resumen">
          <h3>Tratamientos estrategia 2</h3>
          <table className="tabla-reporte">
            <thead>
              <tr>
                <th>Semana</th>
                <th>Principio activo</th>
              </tr>
            </thead>
            <tbody>
              {ptiImvixa.trataciones.map((elemento, i) => (
                <tr key={`fila-pti-imvixa-${i}`}>
                  <td>{elemento.semana === '0' ? 'Antes de mar' : elemento.semana}</td>
                  <td>{elemento.principioActivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h3>Referencias</h3>
      <div id="referencias">
        <p>
          Este informe fue generado con el simulador Ceres-Imvixa. El simulador ceres-imvixa permite al usuario ingresar los datos característicos de un centro para comparar el resultado de dos estrategias de tratamientos contra Cáligus.
        </p>
        <p>El simulador está compuesto por una función de crecimiento y calculadores de impacto de las estrategias de tratamientos.
        <br/>Fuente pesos de cosecha y N° de baños: Reporte Aquabench SM101.1018 OCTUBRE 2018 (2015 a Jun 2018), CERES en base a datos de parámetros productivos 2015 – 2018;  Reporte Aquabench SM101.1018, y Memorias 2018 de 4 empresas productoras de salmón.
        <br/>Fuente reglamentación: Reglamento N° 319 Subpesca.
        <br/>Fuente certificación: Criterio de cálculo del PTI del ASC
        </p>
        <p>
          La función de crecimiento es una regresión polinomial que utiliza el peso del smolt y las unidades térmicas acumuladas (UTA) para estimar el crecimiento diario del pez. 
          La información de la macrozona y la fecha se utilizan para determinar las UTAs asociadas a cada día del ciclo.
        </p><p>
          El usuario puede modificar la función de crecimiento mediante el factor de crecimiento o fijando meses y peso objetivo.
        </p>
      </div>
    </div>
  );
};

export default Anexos;