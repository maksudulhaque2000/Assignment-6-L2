import { useGetPendingRequestsQuery, useAcceptRideMutation } from "../../../redux/features/ride/rideApi";
import { toast } from 'react-hot-toast';

type TRideRequest = {
  _id: string;
  riderId: { name: string };
  pickupLocation: { coordinates: [number, number] };
  destinationLocation: { coordinates: [number, number] };
};

const RideRequests = () => {
  // pollingInterval ব্যবহার করতে চাইলে: { pollingInterval: 5000 } আর্গুমেন্ট হিসেবে দিন
  const { data, isLoading, isError } = useGetPendingRequestsQuery(undefined);
  const [acceptRide] = useAcceptRideMutation();

  const handleAcceptRide = async (rideId: string) => {
    const toastId = toast.loading("Accepting ride...");
    try {
        await acceptRide(rideId).unwrap();
        toast.success("Ride accepted successfully!", { id: toastId });
    } catch (error) {
        toast.error("Failed to accept ride.", { id: toastId });
    }
  }

  if (isLoading) return <div>Loading requests...</div>;
  if (isError) return <div>Error loading requests.</div>;

  const requests = data?.data || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Incoming Ride Requests</h1>
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((ride: TRideRequest) => (
            <div key={ride._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold">Rider: {ride.riderId?.name || 'N/A'}</h3>
              <p className="text-sm text-gray-600">
                From: {ride.pickupLocation.coordinates.join(', ')}
              </p>
              <p className="text-sm text-gray-600">
                To: {ride.destinationLocation.coordinates.join(', ')}
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                  Reject
                </button>
                <button 
                    onClick={() => handleAcceptRide(ride._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No pending ride requests at the moment.</p>
      )}
    </div>
  );
};

export default RideRequests;