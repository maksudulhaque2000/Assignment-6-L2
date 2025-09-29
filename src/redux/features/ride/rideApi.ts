import { baseApi } from '../../api/baseApi';

const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestRide: builder.mutation({
      query: (rideData) => ({
        url: '/rides/request',
        method: 'POST',
        body: rideData,
      }),
    }),
  }),
});

export const { useRequestRideMutation } = rideApi;