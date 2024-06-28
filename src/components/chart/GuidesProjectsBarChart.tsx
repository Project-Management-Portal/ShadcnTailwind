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
  { guide: 'Guide A', projects: 5 },
  { guide: 'Guide B', projects: 8 },
  { guide: 'Guide C', projects: 3 },
  { guide: 'Guide D', projects: 7 },
  { guide: 'Guide E', projects: 6 },
];

function GuidesProjectsBarChart() {
  return (
    <div>
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="guide" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="projects" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default GuidesProjectsBarChart;
