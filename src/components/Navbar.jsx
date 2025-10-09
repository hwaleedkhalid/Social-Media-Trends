export default function Navbar() {
  return (
    <div className="w-full bg-white shadow flex justify-between items-center px-6 py-3">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
}
