import { TourProvider, useTour } from '@reactour/tour';
import type { StepType } from '@reactour/tour';
import { useEffect } from 'react';
import { useGetDashboardAnalyticsQuery } from "../../../redux/features/admin/adminApi";
import StatCard from '../StatCard';

import Skeleton from '../../../components/ui/Skeleton';

const steps: StepType[] = [
  { 
    selector: '#admin-dashboard-title', 
    content: 'Welcome to the Admin Dashboard! Here you can get a quick overview of the platform.' 
  },
  {
    selector: '#stats-grid',
    content: 'These cards show you the most important real-time statistics like total users, drivers, and revenue.'
  },
  {
    selector: '#chart-section',
    content: 'This chart provides a visual representation of ride trends over time.'
  },
  {
    selector: '[href="/dashboard/user-management"]',
    content: 'You can manage all riders and drivers by navigating to the User Management page.'
  },
  {
    selector: '[href="/dashboard/ride-oversight"]',
    content: 'And here, you can oversee all the rides happening on the platform.'
  }
];

const AdminDashboardContent = () => {
  const { data, isLoading } = useGetDashboardAnalyticsQuery(undefined);
  const { setIsOpen } = useTour();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setIsOpen]);


  if (isLoading) {
    return <div>
        <h1 className="text-3xl font-bold mb-6"><Skeleton className="h-9 w-72" /></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4"><Skeleton className="h-8 w-48" /></h2>
          <Skeleton className="h-96" />
        </div>
      </div>
  }

  const analyticsData = data?.data;

  return (
    <div>
      <h1 id="admin-dashboard-title" className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div id="stats-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Riders" value={analyticsData?.totalRiders} />
        <StatCard title="Total Drivers" value={analyticsData?.totalDrivers} />
        <StatCard title="Total Rides" value={analyticsData?.totalRides} />
        <StatCard title="Total Revenue" value={analyticsData ? `$${analyticsData.totalRevenue.toFixed(2)}` : '$0.00'} />
      </div>

      <div id="chart-section">
        <h2 className="text-2xl font-semibold mb-4">Ride Trends</h2>
        
      </div>
    </div>
  );
};

const AdminDashboard = () => {
    return (
        <TourProvider steps={steps}>
            <AdminDashboardContent />
        </TourProvider>
    )
}

export default AdminDashboard;