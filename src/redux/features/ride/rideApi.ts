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

    getActiveRideAsDriver: builder.query({
      query: () => '/rides/driver/active-ride',
      providesTags: ['rides'],
    }),

    updateRideStatus: builder.mutation({
      query: ({ rideId, status }) => ({
        url: `/rides/${rideId}/status`,
        method: 'PATCH',
        body: { status },
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
  useGetActiveRideAsDriverQuery,
  useUpdateRideStatusMutation,
} = rideApi;