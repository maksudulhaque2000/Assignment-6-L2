import { baseApi } from '../../api/baseApi';

type TQueryArgs = {
  searchTerm?: string;
  page?: number;
  limit?: number;
};

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRiders: builder.query({
      query: (args: TQueryArgs = {}) => {
        const params = new URLSearchParams();
        if (args.searchTerm) params.append('searchTerm', args.searchTerm);
        if (args.page) params.append('page', String(args.page));
        if (args.limit) params.append('limit', String(args.limit));
        
        return {
          url: `/admin/users`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['users'],
    }),

    getAllDrivers: builder.query({
      query: (args: TQueryArgs = {}) => {
        const params = new URLSearchParams();
        if (args.searchTerm) params.append('searchTerm', args.searchTerm);
        if (args.page) params.append('page', String(args.page));
        if (args.limit) params.append('limit', String(args.limit));
        
        return {
          url: `/admin/drivers`,
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['drivers'],
    }),

    getDashboardAnalytics: builder.query({
      query: () => ({
        url: '/admin/analytics',
        method: 'GET',
      }),
    }),

    manageUserBlockStatus: builder.mutation({
      query: ({ userId, isBlocked }) => ({
        url: `/admin/users/${userId}/block`,
        method: 'PATCH',
        body: { isBlocked },
      }),
      invalidatesTags: ['users'],
    }),

    manageDriverApproval: builder.mutation({
      query: ({ driverId, status }) => ({
        url: `/admin/drivers/${driverId}/approval`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['drivers'],
    }),
  }),
});

export const {
  useGetAllRidersQuery,
  useGetAllDriversQuery,
  useManageUserBlockStatusMutation,
  useManageDriverApprovalMutation,
  useGetDashboardAnalyticsQuery,
} = adminApi;