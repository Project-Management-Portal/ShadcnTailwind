import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

// Sample data representing sponsorship status
const data = [
  { name: 'Got Sponsorship', value: 80 },
  { name: 'No Sponsorship', value: 20 },
];

// Colors for the pie chart segments
const COLORS = ['#0088FE', '#FF8042'];

const SponsorshipStatusPieChart = () => (
  <div style={{ width: '100%', height: 400 }}>
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default SponsorshipStatusPieChart;
