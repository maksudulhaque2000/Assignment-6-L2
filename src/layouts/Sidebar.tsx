import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { selectCurrentUser } from '../redux/features/auth/authSlice';


// ধাপ ১: নেভিগেশন আইটেমের জন্য একটি টাইপ তৈরি করা হলো
type TNavItem = {
  name: string;
  path: string;
};

const adminNavItems: TNavItem[] = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'User Management', path: '/dashboard/user-management' },
  { name: 'Ride Oversight', path: '/dashboard/ride-oversight' },
];

const driverNavItems: TNavItem[] = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Ride Requests', path: '/dashboard/ride-requests' },
  { name: 'Ride History', path: '/dashboard/ride-history' },
  { name: 'Earnings', path: '/dashboard/earnings' },
];

const riderNavItems: TNavItem[] = [
  { name: 'Request a Ride', path: '/dashboard/request-ride' },
  { name: 'Ride History', path: '/dashboard/ride-history' },
  { name: 'My Profile', path: '/dashboard/profile' },
];

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);
  
  // ধাপ ২: ভেরিয়েবল ঘোষণার সময় নতুন টাইপটি ব্যবহার করা হলো
  let navItems: TNavItem[];

  switch (user?.role) {
    case 'admin':
      navItems = adminNavItems;
      break;
    case 'driver':
      navItems = driverNavItems;
      break;
    case 'rider':
      navItems = riderNavItems;
      break;
    default:
      navItems = [];
  }

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul>
          {navItems.map((item) => ( // এখন TypeScript `item`-এর টাইপ জানে
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block p-2 rounded-md transition-colors ${
                    isActive ? 'bg-gray-700' : 'hover:bg-gray-600'
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;