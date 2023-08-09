'use client';
import React from 'react';
import { Pie, ResponsiveContainer, Tooltip } from 'recharts';

const PieChart = () => {
  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
  ];

  const data02 = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 },
    { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 },
    { name: 'Group F', value: 4800 },
  ];

  return (
    // <ResponsiveContainer width={1000} height={1000}>
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data01}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      />
      <Pie
        dataKey="value"
        data={data02}
        cx={500}
        cy={200}
        innerRadius={40}
        outerRadius={80}
        fill="#82ca9d"
      />
      <Tooltip />
    </PieChart>
    // </ResponsiveContainer>
  );
};

export default PieChart;
