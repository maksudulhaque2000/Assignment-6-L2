import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import UserManagement from '../pages/dashboard/admin/UserManagement';
import DashboardRedirect from './DashboardRedirect';
import RequestRide from '../pages/dashboard/rider/RequestRide';
import RideHistory from '../pages/dashboard/common/RideHistory';
import RideRequests from '../pages/dashboard/driver/RideRequests';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [ { path: '/', element: <Home /> } ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },

  {
    path: '/dashboard',
    element: ( <PrivateRoute> <DashboardLayout /> </PrivateRoute> ),
    children: [
      {
        index: true,
        element: <DashboardRedirect />,
      },
      { path: 'user-management', element: <UserManagement /> },
      { path: 'request-ride', element: <RequestRide /> },
      { path: 'ride-history', element: <RideHistory /> },
      { path: 'ride-requests', element: <RideRequests /> },
    ],
  },
]);