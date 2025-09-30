import { baseApi } from '../../api/baseApi';

const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDriverEarnings: builder.query({
      query: () => ({
        url: '/drivers/me/earnings',
        method: 'GET',
      }),
    }),

    getEarningsAnalytics: builder.query({
      query: () => ({
        url: '/drivers/me/earnings-analytics',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetDriverEarningsQuery, useGetEarningsAnalyticsQuery } = driverApi;