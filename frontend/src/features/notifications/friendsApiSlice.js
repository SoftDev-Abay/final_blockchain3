import { apiSlice } from '../../app/api/appSlice';

export const friendsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVisitors: builder.query({
            query: () => '/visitors',
        }),
    }),
});

export const { useGetVisitorsQuery } = friendsApiSlice;
