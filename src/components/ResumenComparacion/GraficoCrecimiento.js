import React from 'react';
import { Chart } from 'react-google-charts'

const GraficoCrecimiento = ({curvasCrecimiento, pesoObjetivo}) => {
  curvasCrecimiento[0].push('Objetivo')
  for (let i = 1; i < curvasCrecimiento.length; i++) {
    curvasCrecimiento[i].push(pesoObjetivo)
  }
  return (
    <Chart
      width={'640px'}
      height={'350px'}
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
          2: { curveType: 'function', color: '#FFB74D', lineDashStyle: [4, 4] },
        },
        animation: {
          startup: true,
          easing: 'inAndOut',
          duration: 1000,
        },
      }}
    />
  );
};

export default GraficoCrecimiento;