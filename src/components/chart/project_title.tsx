import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Accepted", value: 25 },
  { name: "NotAccepted", value: 15 },
];

const COLORS = ["#0088FE", "#FFBB28"]; // Colors for pie chart segments

function TitleAcceptedPieChart() {
  return (
    <div>
      <PieChart width={500} height={400}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={130}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default TitleAcceptedPieChart;
