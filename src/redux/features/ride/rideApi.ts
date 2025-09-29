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

    getRideHistory: builder.query({
      query: () => ({
        url: '/rides/history/rider',
        method: 'GET',
      }),
      providesTags: ['rides'],
    }),

    getPendingRequests: builder.query({
      query: () => ({
        url: '/rides/requests',
        method: 'GET',
      }),
      providesTags: ['rides'],
    }),

    acceptRide: builder.mutation({
      query: (rideId) => ({
        url: `/rides/${rideId}/accept`,
        method: 'PATCH',
      }),
      invalidatesTags: ['rides'],
    }),

  }),
});

export const {
  useRequestRideMutation,
  useGetRideHistoryQuery,
  useGetPendingRequestsQuery,
  useAcceptRideMutation,
} = rideApi;