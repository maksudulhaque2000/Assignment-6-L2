import { NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout, selectCurrentUser } from '../redux/features/auth/authSlice';
import ThemeToggle from '../components/ui/ThemeToggle';

const Navbar = () => {
    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged out successfully!");
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

  return (
    <header className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-indigo-600 dark:text-white">
          RideX
        </NavLink>
        <ul className="flex items-center space-x-4">
          <li><NavLink to="/" className="text-gray-600 hover:text-indigo-600 dark:text-white">Home</NavLink></li>
          <li><NavLink to="/about" className="text-gray-600 hover:text-indigo-600 dark:text-white">About</NavLink></li>
          <li><NavLink to="/contact" className="text-gray-600 hover:text-indigo-600 dark:text-white">Contact</NavLink></li>
          <li><NavLink to="/faq" className="text-gray-600 hover:text-indigo-600 dark:text-white">F&Q</NavLink></li>
          {user ? (
            <>
                 <li><NavLink to="/dashboard" className="text-gray-600 hover:text-indigo-600 dark:text-white">Dashboard</NavLink></li>
                 <li><button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Logout</button></li>
            </>
          ) : (
            <>
                <li><NavLink to="/login" className="text-gray-600 hover:text-indigo-600 dark:text-white">Login</NavLink></li>
                <li><NavLink to="/register" className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700">Register</NavLink></li>
            </>
          )}
          <li><ThemeToggle /></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;