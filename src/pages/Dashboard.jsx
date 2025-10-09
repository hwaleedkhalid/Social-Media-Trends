import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChartCard from "../components/ChartCard";

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ChartCard title="CPU Usage" data={[20, 35, 40, 55, 30]} color="#4F46E5" />
          <ChartCard title="Network Traffic" data={[50, 60, 70, 40, 80]} color="#10B981" />
          <ChartCard title="Database Load" data={[15, 25, 45, 30, 20]} color="#F59E0B" />
        </div>
      </div>
    </>
  );
}
