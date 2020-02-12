import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { redondearYAString, agruparProductosVertidos } from '../../../helpers/helpers';
import { JORNADAS_POR_BAÑO_POR_JAULA } from '../../../helpers/constantes';
import { useSelector } from 'react-redux'
import './../Anexos/Anexos.css'
import './ImpactosLaborales.css'

const ImpactosLaborales = props => {
  const {numeroBañosTradicional, numeroBañosImvixa, curvaTradicional, 
    curvaImvixa, curvaMortalidadAcumuladaTradicional, 
    curvaMortalidadAcumuladaImvixa, biomasaTradicional, biomasaImvixa} = props
  const produccion = useSelector(state => state.produccion)
  const { numeroJaulas, volumenJaula, numeroSmolts } = produccion
  const tratamientosSt = useSelector(state => state.tratamientos)
  const { medicamentos, tratamientos } = tratamientosSt

  const jornadasPorBaño = JORNADAS_POR_BAÑO_POR_JAULA * numeroJaulas
  const curvas = {
    tradicional : {
      curvaMortalidadAcumulada : curvaMortalidadAcumuladaTradicional,
      curvaCrecimiento: curvaTradicional
    },
    imvixa : {
      curvaMortalidadAcumulada : curvaMortalidadAcumuladaImvixa,
      curvaCrecimiento: curvaImvixa
    }
  }
  const iconoImpactoLaboral = (diferencia) => {
    let icono = redondearYAString(diferencia)
    if (diferencia > 0){
      icono = <><FontAwesomeIcon icon={faArrowDown} style={{marginRight: 4, color:'green'}} /> {redondearYAString(diferencia)}</>
    }
    if (diferencia < 0){
      icono = <><FontAwesomeIcon icon={faArrowUp} style={{marginRight: 4, color:'red'}} />{redondearYAString(Math.abs(diferencia))}</>
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
    <div id="impactos-laborales">
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
      <div className="nota">
        [3] Jornadas calculadas a partir de valor promedio para XI Región de 2 jornadas laborales equivalentes por jaula por baño. Considera 8 horas diarias por jornada laboral.
      <br/>
      Fuente: CERES BCA con base en datos de parámetros productivos 2015 – 2018 y Reporte Aquabench SM101.1018.
      </div>
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
          {agruparProductosVertidos(medicamentos, obtenerTratamientosEnCiclos(tratamientos, curvaTradicional, curvaImvixa), volumenJaula, numeroJaulas, numeroSmolts, curvas).map((v, i) => {
            let icono = ''
            const diferencia = v.tradicional - v.imvixa
            if (diferencia > 0) {
              icono = <FontAwesomeIcon icon={faArrowDown} style={{ marginRight: 4, color: 'green' }} />
            }
            else if (diferencia < 0) {
              icono = <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: 4, color: 'red' }} />
            }
            return (<tr key={`vertidos-${i}`} className="fila-vertidos">
              <td>{v.principioActivo}</td>
              <td>{redondearYAString(v.tradicional / 1000)} Kg/centro</td>
              <td>{redondearYAString(v.imvixa / 1000)} Kg/centro</td>
              <td>{icono} {redondearYAString(Math.abs(diferencia / 1000))} Kg</td>
            </tr>)
          })}
        </tbody>
      </table>
      <div className="nota">
      Fuente: Cálculo basado en dosis de principio activo por tratamientos confirmados por usuario.
      </div>
      <h3>3.3 Índice de uso de antiparasitario por producto* (g de principio activo por tonelada)</h3>
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
          {agruparProductosVertidos(medicamentos, obtenerTratamientosEnCiclos(tratamientos, curvaTradicional, curvaImvixa), volumenJaula, numeroJaulas, numeroSmolts, curvas).map((v, i) => {
            let icono = ''
            const diferencia = (v.tradicional / biomasaTradicional - v.imvixa / biomasaImvixa) * 1000 // a Toneladas
            if (diferencia > 0) {
              icono = <FontAwesomeIcon icon={faArrowDown} style={{ marginRight: 4, color: 'green' }} />
            }
            else if (diferencia < 0) {
              icono = <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: 4, color: 'red' }} />
            }
            return (<tr key={`vertidos-${i}`} className="fila-vertidos">
              <td>{v.principioActivo}</td>
              <td>{redondearYAString(v.tradicional * 1000 / biomasaTradicional)} g/Ton</td>
              <td>{redondearYAString(v.imvixa * 1000 / biomasaImvixa)} g/Ton</td>
              <td>{icono} {redondearYAString(Math.abs(diferencia))} g</td>
            </tr>)
          })}
        </tbody>
      </table>
      <div className="nota">
      * Calculado como la cantidad de principio activo usado (en gramos) por tonelada de pescado producido
      </div>
    </div>
  );
};

export default ImpactosLaborales;