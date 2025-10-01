import { useGetRideHistoryQuery } from "../../../redux/features/ride/rideApi";
import Skeleton from "../../../components/ui/Skeleton";

type TRide = {
    _id: string;
    pickupLocation: { coordinates: [number, number] };
    destinationLocation: { coordinates: [number, number] };
    status: 'pending' | 'accepted' | 'completed' | 'cancelled';
    createdAt: string;
};

const RideHistory = () => {
  const { data, isLoading, isError } = useGetRideHistoryQuery(undefined);

  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          <Skeleton className="h-8 w-48" />
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border dark:bg-gray-800 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="py-2 px-4 border dark:border-gray-600">Date</th>
                <th className="py-2 px-4 border dark:border-gray-600">Pickup Location</th>
                <th className="py-2 px-4 border dark:border-gray-600">Destination</th>
                <th className="py-2 px-4 border dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border dark:border-gray-700">
                    <Skeleton className="h-5 w-24" />
                  </td>
                  <td className="py-2 px-4 border dark:border-gray-700">
                    <Skeleton className="h-5 w-40" />
                  </td>
                  <td className="py-2 px-4 border dark:border-gray-700">
                    <Skeleton className="h-5 w-40" />
                  </td>
                  <td className="py-2 px-4 border dark:border-gray-700">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (isError) return <div>Failed to load ride history.</div>;

  const rides = data?.data || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">My Ride History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border dark:bg-gray-800 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Date</th>
              <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Pickup Location</th>
              <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Destination</th>
              <th className="py-2 px-4 border dark:border-gray-600 dark:text-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {rides.length > 0 ? (
              rides.map((ride: TRide) => (
                <tr key={ride._id} className="dark:text-gray-300">
                  <td className="py-2 px-4 border dark:border-gray-700">{new Date(ride.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border dark:border-gray-700">{ride.pickupLocation.coordinates.join(', ')}</td>
                  <td className="py-2 px-4 border dark:border-gray-700">{ride.destinationLocation.coordinates.join(', ')}</td>
                  <td className="py-2 px-4 border dark:border-gray-700">
                    <span className="px-2 py-1 capitalize text-xs font-semibold rounded-full bg-blue-200 text-blue-800">
                      {ride.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 dark:text-gray-300">No ride history found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RideHistory;