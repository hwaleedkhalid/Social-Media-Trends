import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function ChartCard({ title, data, color }) {
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: title,
        data,
        borderColor: color,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 w-full">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <Line data={chartData} />
    </div>
  );
}
