import React from 'react';
import { connect } from 'react-redux'
import './ResumenComparacion.css'
import { obtenerCurvasDeCrecimiento } from '../../helpers/modelo'
import { Chart } from 'react-google-charts'

const ResumenComparacion = ({parametrosProductivos}) => {

  const curvasCrecimiento = obtenerCurvasDeCrecimiento({}, parametrosProductivos, {})

  return (
    <div id="fondo-resumen">
      <div id="barra-superior-resumen">
        <h1>Resumen resultados estrategias</h1>
      </div>
      <div id="contenido-resumen">
        <div id="grafico-crecimiento">
          <Chart
            width={'640px'}
            height={'320px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={curvasCrecimiento}
            options={{
              hAxis: {
                title: 'Días',
              },
              vAxis: {
                title: 'Peso promedio salmón (g)',
              },
              series: {
                0: { curveType: 'function', color: '#E65100' },
                1: { curveType: 'function', color: '#0097A7' },
              },
              animation: {
                startup: true,
                easing: 'linear',
                duration: 1000,
              },
            }}
          />
        </div>
        <div id="cuadros-estrategias">
          <div id="fondo-estrategia-a">
            <h1>Estrategia A</h1>
            <div className="resultados-estrategia">
              <h2>{curvasCrecimiento.find(v => v[1] > parametrosProductivos.pesoObjetivo)[0]}</h2>
              <p>días para alcanzar el peso objetivo</p>
            </div>
          </div>
          <div id="fondo-estrategia-b">
            <h1>Estrategia B</h1>
            <div className="resultados-estrategia">
              <h2>{curvasCrecimiento.find(v => v[2] > parametrosProductivos.pesoObjetivo)[0]}</h2>
              <p>días para alcanzar el peso objetivo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  parametrosProductivos: state.produccion
})

export default connect(mapStateToProps)(ResumenComparacion);