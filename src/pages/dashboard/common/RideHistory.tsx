import { useGetRideHistoryQuery } from "../../../redux/features/ride/rideApi";

type TRide = {
    _id: string;
    pickupLocation: { coordinates: [number, number] };
    destinationLocation: { coordinates: [number, number] };
    status: 'pending' | 'accepted' | 'completed' | 'cancelled';
    createdAt: string;
};

const RideHistory = () => {
  const { data, isLoading, isError } = useGetRideHistoryQuery(undefined);

  if (isLoading) return <div>Loading ride history...</div>;
  if (isError) return <div>Failed to load ride history.</div>;

  const rides = data?.data || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Ride History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Pickup Location</th>
              <th className="py-2 px-4 border">Destination</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {rides.length > 0 ? (
              rides.map((ride: TRide) => (
                <tr key={ride._id}>
                  <td className="py-2 px-4 border">{new Date(ride.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">{ride.pickupLocation.coordinates.join(', ')}</td>
                  <td className="py-2 px-4 border">{ride.destinationLocation.coordinates.join(', ')}</td>
                  <td className="py-2 px-4 border">
                    <span className="px-2 py-1 capitalize text-xs font-semibold rounded-full bg-blue-200 text-blue-800">
                      {ride.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">No ride history found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RideHistory;