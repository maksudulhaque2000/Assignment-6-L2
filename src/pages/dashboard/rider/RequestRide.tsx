import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { useRequestRideMutation } from '../../../redux/features/ride/rideApi';
import { toast } from 'react-hot-toast';

const RequestRide = () => {
    const { register, handleSubmit, reset } = useForm();
    const [requestRide, { isLoading }] = useRequestRideMutation();

    const onSubmit = async (data: FieldValues) => {
        const rideData = {
            pickupLocation: { coordinates: data.pickup.split(',').map(Number) },
            destinationLocation: { coordinates: data.destination.split(',').map(Number) }
        }
        
        const toastId = toast.loading("Requesting ride...");
        try {
            await requestRide(rideData).unwrap();
            toast.success("Ride requested successfully!", { id: toastId });
            reset();
        } catch {
            toast.error("Failed to request ride.", { id: toastId });
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Request a New Ride</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-8 rounded-lg shadow-md">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Pickup Location (lat,lng)</label>
                    <input
                    type="text"
                    placeholder="e.g., 23.777, 90.399"
                    {...register('pickup', { required: true })}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Destination Location (lat,lng)</label>
                    <input
                    type="text"
                    placeholder="e.g., 23.810, 90.412"
                    {...register('destination', { required: true })}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" disabled={isLoading} className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400">
                    {isLoading ? "Requesting..." : "Request Ride"}
                </button>
            </form>
        </div>
    )
}
export default RequestRide;