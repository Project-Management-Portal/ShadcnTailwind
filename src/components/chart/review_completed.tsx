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
  { name: "Week 1", completed: 30 },
  { name: "Week 2", completed: 45 },
  { name: "Week 3", completed: 60 },
  { name: "Week 4", completed: 55 },
  { name: "Week 5", completed: 70 },
];

function StudentReviewBarChart() {
  return (
    <div>
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
        <Bar dataKey="completed" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default StudentReviewBarChart;
