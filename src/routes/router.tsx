import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';

// ড্যাশবোর্ডের জন্য একটি placeholder পেইজ তৈরি করুন
const DashboardHome = () => <div>Welcome to your Dashboard!</div>; 

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      // এখানে অন্যান্য পাবলিক পেইজ (About, Contact) যোগ হবে
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },

  // Dashboard Routes (Protected)
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      // এখানে প্রতিটি রোলের জন্য ড্যাশবোর্ডের অন্যান্য পেইজ যোগ হবে
      // যেমন: path: 'user-management', element: <UserManagementPage />
    ],
  },
]);