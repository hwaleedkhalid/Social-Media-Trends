import { FaTwitter, FaChartLine } from "react-icons/fa";

export default function TotalPosts() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Total Posts</h2>
        <FaTwitter className="text-blue-400 text-2xl" />
      </div>

      <div className="text-4xl font-bold text-blue-600">12,458</div>
      <p className="text-sm text-gray-500 mt-1">Updated just now</p>

      <div className="flex items-center gap-2 mt-3 text-green-600 text-sm font-medium">
        <FaChartLine />
        <span>+4.2% from last hour</span>
      </div>
    </div>
  );
}
