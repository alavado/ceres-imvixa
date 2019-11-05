import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { redondear, calcularCantidadDeProductosVertidos } from '../../../helpers/helpers';
import { JORNADAS_POR_BAÑO_POR_JAULA } from '../../../helpers/constantes';
import { useSelector } from 'react-redux'

const ImpactosLaborales = ({numeroBañosTradicional, numeroBañosImvixa, curvaTradicional, curvaImvixa}) => {

  const produccion = useSelector(state => state.produccion)
  const { numeroJaulas } = produccion
  const tratamientosSt = useSelector(state => state.tratamientos)
  const { medicamentos, tratamientos } = tratamientosSt

  const jornadasPorBaño = JORNADAS_POR_BAÑO_POR_JAULA * numeroJaulas

  const iconoImpactoLaboral = (diferencia) => {
    let icono = redondear(diferencia)
    if (diferencia > 0){
      icono = <><FontAwesomeIcon icon={faArrowDown} style={{marginRight: 4, color:'green'}} /> {redondear(diferencia)}</>
    }
    if (diferencia < 0){
      icono = <><FontAwesomeIcon icon={faArrowUp} style={{marginRight: 4, color:'red'}} />{redondear(Math.abs(diferencia))}</>
    }
    return icono
  }

  const obtenerTratamientosEnCiclo = (tratamientos, curvaCrecimiento) => {
    const semanasCiclo = curvaCrecimiento.length / 7
    return Object.keys(tratamientos).reduce((obj, s) => {
      if (s >  semanasCiclo){
        return obj
      }
      return {
        ...obj,
        [s]: tratamientos[s]
      }
    }, {})
  }

  const obtenerTratamientosEnCiclos = (tratamientos, curvaTradicional, curvaImvixa) =>{
    return {
      'imvixa': obtenerTratamientosEnCiclo(tratamientos['imvixa'], curvaImvixa),
      'tradicional': obtenerTratamientosEnCiclo(tratamientos['tradicional'], curvaTradicional)
    }
  }

  return (
    <>
      <h2>3. IMPACTOS LABORALES Y REPUTACIÓN DE MARCA</h2>
      <h3>3.1 Impactos laborales por ciclo</h3>
      <table className="tabla-reporte">
        <thead>
          <tr>
            <th style={{ width: 280 }}></th>
            <th>Estrategia 1</th>
            <th>Estrategia 2</th>
            <th>Diferencia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Número de Baños</td>
            <td>{numeroBañosTradicional}</td>
            <td>{numeroBañosImvixa}</td>
            <td>{iconoImpactoLaboral(numeroBañosTradicional-numeroBañosImvixa)}</td>
          </tr>
          <tr>
            <td>Jornadas laborales por concepto de baños</td>
            <td>{numeroBañosTradicional * jornadasPorBaño}</td>
            <td>{numeroBañosImvixa * jornadasPorBaño}</td>
            <td>{iconoImpactoLaboral((numeroBañosTradicional-numeroBañosImvixa) * jornadasPorBaño)}</td>
          </tr>
        </tbody>
      </table>
      <h3>3.2 Cantidad de productos vertidos al mar por ciclo</h3>
      <table className="tabla-reporte">
        <thead>
          <tr>
            <th style={{ width: 280 }}>Producto</th>
            <th>Estrategia 1</th>
            <th>Estrategia 2</th>
            <th>Diferencia</th>
          </tr>
        </thead>
        <tbody>
          {calcularCantidadDeProductosVertidos(medicamentos, obtenerTratamientosEnCiclos(tratamientos, curvaTradicional, curvaImvixa)).map((v, i) => {
            let icono = ''
            const diferencia = v.tradicional * numeroJaulas - v.imvixa * numeroJaulas
            if (diferencia > 0) {
              icono = <FontAwesomeIcon icon={faArrowDown} style={{ marginRight: 4, color: 'green' }} />
            }
            else if (diferencia < 0) {
              icono = <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: 4, color: 'red' }} />
            }
            return (<tr key={`vertidos-${i}`}>
              <td>{v.principioActivo}</td>
              <td>{redondear(v.tradicional * numeroJaulas)} {v.unidad}/centro</td>
              <td>{redondear(v.imvixa * numeroJaulas)} {v.unidad}/centro</td>
              <td>{icono} {redondear(Math.abs(diferencia))} {v.unidad}</td>
            </tr>)
          })}
        </tbody>
      </table>
    </>
  );
};

export default ImpactosLaborales;