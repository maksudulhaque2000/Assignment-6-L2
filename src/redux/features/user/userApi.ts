import { baseApi } from '../../api/baseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/users/me',
        method: 'PATCH',
        body: profileData,
      }),
      invalidatesTags: ['users'],
    }),
  }),
});

export const { useUpdateProfileMutation } = userApi;