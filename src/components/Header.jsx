import { useState } from "react";
import { FaSearch, FaCircle } from "react-icons/fa";

export default function Header() {
  const [status, setStatus] = useState("online");

  return (
    <header className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg">
      <h1 className="text-2xl font-bold text-blue-600">RealTime Dashboard</h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <FaSearch className="absolute top-2 left-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search topics or hashtags..."
            className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <FaCircle
            className={`text-sm ${
              status === "online" ? "text-green-500" : "text-red-500"
            }`}
          />
          <span className="text-sm font-medium capitalize">{status}</span>
        </div>
      </div>
    </header>
  );
}
