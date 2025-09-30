import { useState, useEffect } from 'react';
import { useGetAllRidersQuery, useManageUserBlockStatusMutation } from '../../../redux/features/admin/adminApi';
import Skeleton from '../../../components/ui/Skeleton';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const useDebounced = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

type TRider = {
    _id: string;
    name: string;
    email: string;
    isBlocked: boolean;
};

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounced(searchTerm, 500);

  const { data, isLoading, isError } = useGetAllRidersQuery({ page, searchTerm: debouncedSearchTerm });
  const [manageUserBlockStatus] = useManageUserBlockStatusMutation();

  const riders = data?.data || [];
  const meta = data?.meta;

  const handleBlockStatus = (userId: string, isBlocked: boolean, riderName: string) => {
    const newStatus = !isBlocked;
    const actionText = newStatus ? 'block' : 'unblock';

    MySwal.fire({
      title: 'Are you sure?',
      text: `You are about to ${actionText} the user "${riderName}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${actionText} it!`,
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        const performAction = async () => {
          const toastId = toast.loading('Updating user status...');
          try {
            await manageUserBlockStatus({ userId, isBlocked: newStatus }).unwrap();
            toast.success(`User has been ${actionText}ed successfully!`, { id: toastId });
          } catch {
            toast.error('Failed to update status. Please try again.', { id: toastId });
          }
        };
        performAction();
      }
    });
  };


  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4"><Skeleton className="h-8 w-64" /></h1>
        <div className="mb-4">
          <Skeleton className="h-10 w-full max-w-xs" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border dark:bg-gray-800 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="py-2 px-4 border dark:border-gray-600">Name</th>
                <th className="py-2 px-4 border dark:border-gray-600">Email</th>
                <th className="py-2 px-4 border dark:border-gray-600">Status</th>
                <th className="py-2 px-4 border dark:border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border dark:border-gray-700"><Skeleton className="h-5 w-32" /></td>
                  <td className="py-2 px-4 border dark:border-gray-700"><Skeleton className="h-5 w-48" /></td>
                  <td className="py-2 px-4 border dark:border-gray-700"><Skeleton className="h-5 w-20" /></td>
                  <td className="py-2 px-4 border dark:border-gray-700"><Skeleton className="h-8 w-20" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  if (isError) return <div>Error loading users.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Rider Management</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border dark:bg-gray-800 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Name</th>
              <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Email</th>
              <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Status</th>
              <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider: TRider) => (
              <tr key={rider._id} className="dark:text-gray-300">
                <td className="py-2 px-4 border dark:border-gray-700">{rider.name}</td>
                <td className="py-2 px-4 border dark:border-gray-700">{rider.email}</td>
                <td className="py-2 px-4 border dark:border-gray-700">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${rider.isBlocked ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                    {rider.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="py-2 px-4 border dark:border-gray-700">
                  <button
                    onClick={() => handleBlockStatus(rider._id, rider.isBlocked, rider.name)}
                    className={`px-3 py-1 rounded-md text-white ${rider.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                  >
                    {rider.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 mx-1 bg-gray-300 dark:bg-gray-600 dark:text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 dark:text-gray-300">Page {meta?.page} of {meta?.totalPages}</span>
          <button
             onClick={() => setPage(page + 1)}
             disabled={!meta || page === meta.totalPages}
            className="px-4 py-2 mx-1 bg-gray-300 dark:bg-gray-600 dark:text-white rounded disabled:opacity-50"
          >
            Next
          </button>
       </div>
    </div>
  );
};

export default UserManagement;