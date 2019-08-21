import React from 'react';
import { Chart } from 'react-google-charts'

const GraficoCrecimiento = ({curvasCrecimiento}) => {
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
        },
        animation: {
          startup: true,
          easing: 'linear',
          duration: 1000,
        },
      }}
    />
  );
};

export default GraficoCrecimiento;