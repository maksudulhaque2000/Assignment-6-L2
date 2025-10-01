import { useGetActiveRideAsDriverQuery, useUpdateRideStatusMutation } from "../../../redux/features/ride/rideApi";
import { toast } from 'react-hot-toast';

const ActiveRide = () => {
  const { data, isLoading } = useGetActiveRideAsDriverQuery(undefined, {
    pollingInterval: 5000, 
  });
  const [updateRideStatus] = useUpdateRideStatusMutation();

  const ride = data?.data;

  const handleUpdateStatus = async (status: string) => {
    if (!ride?._id) return;
    const toastId = toast.loading(`Updating status to ${status}...`);
    try {
      await updateRideStatus({ rideId: ride._id, status }).unwrap();
      toast.success("Status updated successfully!", { id: toastId });
    } catch (error) {
      toast.error("Failed to update status.", { id: toastId });
    }
  };

  if (isLoading) return <div>Loading active ride details...</div>;

  if (!ride) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold dark:text-white">No Active Ride</h1>
        <p className="mt-4 dark:text-gray-300">You do not have any ongoing rides at the moment.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Active Ride Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
        <p className="dark:text-gray-300"><strong>Rider:</strong> {ride.riderId?.name || 'N/A'}</p>
        <p className="dark:text-gray-300"><strong>Status:</strong> <span className="font-semibold capitalize">{ride.status}</span></p>
        
        <div className="mt-6 flex flex-wrap gap-2">
            {ride.status === 'accepted' && (
                <button onClick={() => handleUpdateStatus('picked_up')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Mark as Picked Up
                </button>
            )}
            {ride.status === 'picked_up' && (
                <button onClick={() => handleUpdateStatus('in_transit')} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                    Mark as In Transit
                </button>
            )}
             {ride.status === 'in_transit' && (
                <button onClick={() => handleUpdateStatus('completed')} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Complete Ride
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ActiveRide;