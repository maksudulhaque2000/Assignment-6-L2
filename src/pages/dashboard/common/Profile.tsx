import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { useAppSelector } from '../../../redux/hooks';
import { selectCurrentUser } from '../../../redux/features/auth/authSlice';
import { useUpdateProfileMutation } from '../../../redux/features/user/userApi';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const user = useAppSelector(selectCurrentUser);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: user?.name,
            email: user?.email,
        }
    });
    const [updateProfile] = useUpdateProfileMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Updating profile...");
        try {
            await updateProfile(data).unwrap();
            toast.success("Profile updated successfully!", { id: toastId });
        } catch {
            toast.error("Failed to update profile.", { id: toastId });
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-8 rounded-lg shadow-md">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        {...register('name', { required: true })}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address (Cannot be changed)</label>
                    <input
                        type="email"
                        {...register('email')}
                        disabled
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md bg-gray-100"
                    />
                </div>
                <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;