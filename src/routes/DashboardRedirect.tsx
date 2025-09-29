import { useAppSelector } from '../redux/hooks';
import { selectCurrentUser } from '../redux/features/auth/authSlice';
import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import RequestRide from '../pages/dashboard/rider/RequestRide';

const DashboardRedirect = () => {
  const user = useAppSelector(selectCurrentUser);

  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }
  if (user?.role === 'rider') {
    return <RequestRide />;
  }
  
  return <div>Welcome to your Dashboard! Please navigate using the sidebar.</div>;
};

export default DashboardRedirect;