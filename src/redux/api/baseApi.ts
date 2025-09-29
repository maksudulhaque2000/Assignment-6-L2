import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ride-booking-backend-smmak.vercel.app/api',
  }),
  
  tagTypes: ['users', 'drivers', 'rides'], 
  
  endpoints: () => ({}),
});