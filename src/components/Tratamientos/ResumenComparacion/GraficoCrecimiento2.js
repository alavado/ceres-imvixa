import React from 'react';
import {Line} from 'react-chartjs-2';

const GraficoCrecimiento2 = ({curvasCrecimiento, pesoObjetivo}) => {

  const data = {
    labels: curvasCrecimiento.reduce((arr, v, i) => (i + 1) % 7 === 1 ? [...arr, `${v[0]}`] : arr, []),
    datasets: [
      {
        label: 'Imvixa',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#EF6C00',
        borderColor: '#EF6C00',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#EF6C00',
        pointBackgroundColor: '#EF6C00',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#EF6C00',
        pointHoverBorderColor: '#EF6C00',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: curvasCrecimiento.reduce((arr, v, i) => i % 7 === 1 ? [...arr, v[1]] : arr, []),
      },
      {
        label: 'Tradicional',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#0097A7',
        borderColor: '#0097A7',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#0097A7',
        pointBackgroundColor: '#0097A7',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#0097A7',
        pointHoverBorderColor: '#0097A7',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: curvasCrecimiento.reduce((arr, v, i) => i % 7 === 1 ? [...arr, v[2]] : arr, []),
      }
    ],
  }

  const options = {
    legend: {
      position: 'right',
      display: true,
      labels: {
        boxWidth: 14,
      }
    },
    scales: {
      xAxes: [{
         gridLines: {
            display: false
         }
      }],
    }
  }
  
  return (
    <div style={{marginTop: 32, width: '640px', height: '350px'}}>
      <Line
        data={data}
        options={options}
      />
    </div>
  );
};

export default GraficoCrecimiento2;