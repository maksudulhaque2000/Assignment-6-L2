import { useState, useEffect } from 'react';
import { useGetAllRidersQuery, useManageUserBlockStatusMutation } from '../../../redux/features/admin/adminApi';

// Debounce Hook for search functionality
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

// Define a type for the rider object for type safety
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

  const handleBlockStatus = async (userId: string, isBlocked: boolean) => {
    try {
      await manageUserBlockStatus({ userId, isBlocked }).unwrap();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to update block status:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rider Management</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider: TRider) => (
              <tr key={rider._id}>
                <td className="py-2 px-4 border">{rider.name}</td>
                <td className="py-2 px-4 border">{rider.email}</td>
                <td className="py-2 px-4 border">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${rider.isBlocked ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                    {rider.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleBlockStatus(rider._id, !rider.isBlocked)}
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

       {/* Pagination Controls */}
       <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {meta?.page} of {meta?.totalPages}</span>
          <button
             onClick={() => setPage(page + 1)}
             disabled={!meta || page === meta.totalPages}
            className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
       </div>
    </div>
  );
};

export default UserManagement;