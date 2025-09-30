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
import ActiveRide from '../pages/dashboard/driver/ActiveRide';
import Profile from '../pages/dashboard/common/Profile';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Earnings from '../pages/dashboard/driver/Earnings';
import Faq from '../pages/Faq';
import PersistLogin from '../layouts/PersistLogin';
import RideOversight from '../pages/dashboard/admin/RideOversight';

export const router = createBrowserRouter([
  {
    element: <PersistLogin />,
    children: [
      {
    path: '/',
    element: <MainLayout />,
    children: [ 
      { path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
          path: '/faq',
          element: <Faq />,
      },
     ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
    ]
  },

  {
    path: '/dashboard',
    element: ( <PrivateRoute> <DashboardLayout /> </PrivateRoute> ),
    children: [
      {
        index: true,
        element: <DashboardRedirect />,
      },
      {
        path: 'user-management',
        element: <UserManagement />,
      },
      {
          path: 'ride-oversight',
          element: <RideOversight />,
      },
      {
        path: 'request-ride',
        element: <RequestRide />,
      },
      {
        path: 'ride-history',
        element: <RideHistory />,
      },
      {
        path: 'ride-requests',
        element: <RideRequests />,
      },
      {
        path: 'active-ride',
        element: <ActiveRide />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
          path: 'earnings',
          element: <Earnings />,
      },
    ],
  },
]);