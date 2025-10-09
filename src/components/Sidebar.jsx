import { FaChartLine, FaDatabase, FaCog } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-600 text-white flex flex-col p-5">
      <h2 className="text-2xl font-bold mb-6">RealTimeDash</h2>
      <ul className="space-y-4">
        <li className="hover:bg-blue-500 p-2 rounded cursor-pointer flex items-center gap-2">
          <FaChartLine /> Dashboard
        </li>
        <li className="hover:bg-blue-500 p-2 rounded cursor-pointer flex items-center gap-2">
          <FaDatabase /> Analytics
        </li>
        <li className="hover:bg-blue-500 p-2 rounded cursor-pointer flex items-center gap-2">
          <FaCog /> Settings
        </li>
      </ul>
    </div>
  );
}
