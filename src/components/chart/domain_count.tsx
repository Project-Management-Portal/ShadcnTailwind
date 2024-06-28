import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  { domain: 'Math', count: 30 },
  { domain: 'Science', count: 45 },
  { domain: 'History', count: 60 },
  { domain: 'Literature', count: 55 },
  { domain: 'Art', count: 70 },
];

function DomainCountBarChart() {
  return (
    <div>
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="domain" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default DomainCountBarChart;
