import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'

const GraficoCrecimientoRecharts = ({curvasCrecimiento}) => {
  return (
    <LineChart width={730} height={250} data={curvasCrecimiento} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="0" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="1" stroke="#8884d8" />
      <Line type="monotone" dataKey="2" stroke="#82ca9d" />
    </LineChart>
  );
};

export default GraficoCrecimientoRecharts;