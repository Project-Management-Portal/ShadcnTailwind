import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Reviewer 1", allocated: 15, unallocated: 5 },
  { name: "Reviewer 2", allocated: 10, unallocated: 10 },
  { name: "Reviewer 3", allocated: 20, unallocated: 0 },
  { name: "Reviewer 4", allocated: 18, unallocated: 2 },
];

function ReviewersAllocationBarChart() {
  return (
    <BarChart
      width={600}
      height={400}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="allocated" stackId="a" fill="#8884d8" />
      <Bar dataKey="unallocated" stackId="a" fill="#82ca9d" />
    </BarChart>
  );
}

export default ReviewersAllocationBarChart;
