import { useGetDashboardAnalyticsQuery } from "../../../redux/features/admin/adminApi";
import AnalyticsChart from "../AnalyticsChart";
import StatCard from "../StatCard";


const AdminDashboard = () => {
  const { data, isLoading } = useGetDashboardAnalyticsQuery(undefined);

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  const analyticsData = data?.data;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Riders" value={analyticsData?.totalRiders} />
        <StatCard title="Total Drivers" value={analyticsData?.totalDrivers} />
        <StatCard title="Total Rides" value={analyticsData?.totalRides} />
        <StatCard title="Total Revenue" value={`$${analyticsData?.totalRevenue.toFixed(2)}`} />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Ride Trends</h2>
        <AnalyticsChart />
      </div>
    </div>
  );
};

export default AdminDashboard;