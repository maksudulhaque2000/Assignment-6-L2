import { useAppSelector } from '../redux/hooks';
import { selectCurrentUser } from '../redux/features/auth/authSlice';
import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import RequestRide from '../pages/dashboard/rider/RequestRide';
import ActiveRide from '../pages/dashboard/driver/ActiveRide';

const DashboardRedirect = () => {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return <div className="p-10 text-center text-xl">Loading Dashboard...</div>;
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }
  if (user.role === 'rider') {
    return <RequestRide />;
  }
  if (user.role === 'driver') {
    return <ActiveRide />;
  }
  
  return <div>Welcome! Please navigate using the sidebar.</div>;
};

export default DashboardRedirect;