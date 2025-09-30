import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectCurrentToken, setUser } from '../redux/features/auth/authSlice';
import { useGetMyProfileQuery } from '../redux/features/auth/authApi';

const PersistLogin = () => {
    const token = useAppSelector(selectCurrentToken);
    const dispatch = useAppDispatch();
    
    const { data: userData, isLoading } = useGetMyProfileQuery(undefined, {
        skip: !token,
    });

    useEffect(() => {
        if(userData?.data && token) {
            dispatch(setUser({ user: userData.data, token }))
        }
    }, [userData, token, dispatch]);


    if (isLoading && token) {
        return <div>Loading User...</div>;
    }

    return <Outlet />;
};

export default PersistLogin;