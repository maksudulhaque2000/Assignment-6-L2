import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ridex-server-mauve.vercel.app/api',
  }),
  
  tagTypes: ['users', 'drivers', 'rides'], 
  
  endpoints: () => ({}),
});