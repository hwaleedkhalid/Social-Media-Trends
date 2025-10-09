import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "1 AM", posts: 240 },
  { time: "4 AM", posts: 360 },
  { time: "7 AM", posts: 420 },
  { time: "10 AM", posts: 610 },
  { time: "1 PM", posts: 740 },
  { time: "4 PM", posts: 890 },
  { time: "7 PM", posts: 1020 },
];

export default function PostsOverTime() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Posts Over Time
      </h2>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="posts"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
