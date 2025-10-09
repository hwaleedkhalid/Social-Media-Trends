import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Positive", value: 64 },
  { name: "Neutral", value: 22 },
  { name: "Negative", value: 14 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function SentimentGauge() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Sentiment Overview
      </h2>

      <PieChart width={300} height={220}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
}
